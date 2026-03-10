/**
 * Chess Opening Trainer - Main Application
 *
 * This file contains the main game logic and UI interactions.
 * Opening definitions are in openings.js
 */

// ============================================================================
// GLOBAL STATE
// ============================================================================

let game = null;
let userColor = 'white';
let userGoal = 'play';
let selectedOpening = 'modern-defense';
let currentStep = 0;
let openingSequence = [];
let selectedSquare = null;
let hintsEnabled = true;
let audioContext = null;
let lastMove = null; // Track last move for highlighting
let undoneStack = []; // SAN strings of moves undone via back button (for redo)
let pendingTimeout = null; // Timeout ID for pending computer move

// ============================================================================
// CONSTANTS
// ============================================================================

// Chess piece Unicode characters (outlined for white, filled for black)
const pieces = {
    'wK': '♔', 'wQ': '♕', 'wR': '♖', 'wB': '♗', 'wN': '♘', 'wP': '♙',
    'bK': '♚', 'bQ': '♛', 'bR': '♜', 'bB': '♝', 'bN': '♞', 'bP': '♟'
};

const SQUARE_SIZE = 700 / 8; // 87.5px
const COMPUTER_MOVE_DELAY = 800; // ms
const HINT_DELAY = 100; // ms

// ============================================================================
// AUDIO FUNCTIONS
// ============================================================================
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

async function playMoveSound() {
    try {
        if (!audioContext) {
            initAudio();
        }

        // Resume audio context if suspended (required by modern browsers)
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        // Create a realistic wood-on-wood sound using noise and filters
        const bufferSize = audioContext.sampleRate * 0.08; // 80ms of audio
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate white noise with decay for wood impact
        for (let i = 0; i < bufferSize; i++) {
            const decay = Math.exp(-i / (bufferSize * 0.3));
            data[i] = (Math.random() * 2 - 1) * decay * 0.6;
        }

        const noiseSource = audioContext.createBufferSource();
        noiseSource.buffer = buffer;

        // Band-pass filter to make it sound more like wood
        const filter = audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800; // Woody frequency range
        filter.Q.value = 3;

        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.7, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);

        noiseSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        noiseSource.start(audioContext.currentTime);
        noiseSource.stop(audioContext.currentTime + 0.08);
    } catch (e) {
        console.log('Audio playback failed:', e);
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Listen for changes in selectors
document.getElementById('color-select').addEventListener('change', handleSelectorChange);
document.getElementById('opening-select').addEventListener('change', handleOpeningChange);
document.getElementById('variation-select').addEventListener('change', initializeGame);

function setupHintsToggle() {
    const hintsToggle = document.getElementById('hints-toggle');
    hintsToggle.addEventListener('change', function() {
        hintsEnabled = this.checked;
        showHintOnBoard();
    });
}

// ============================================================================
// TRAINING SETUP
// ============================================================================

function handleOpeningChange() {
    // Update variation dropdown when opening changes
    updateVariationDropdown();
    initializeGame();
}

function updateOpeningDropdown() {
    const color = document.getElementById('color-select').value;
    const openingSelect = document.getElementById('opening-select');
    const currentValue = openingSelect.value;

    // Clear existing options
    openingSelect.innerHTML = '';

    // Define available openings for each color
    const openingsForColor = {
        white: [
            { value: 'italian-game', text: 'Italian Game' }
        ],
        black: [
            { value: 'caro-kann', text: 'Caro-Kann Defense' }
        ]
    };

    // Add options for the selected color
    const availableOpenings = openingsForColor[color];
    availableOpenings.forEach((opening, index) => {
        const option = document.createElement('option');
        option.value = opening.value;
        option.textContent = opening.text;
        // Select first option by default, or preserve current if still available
        if ((currentValue === opening.value) || (index === 0 && !availableOpenings.find(o => o.value === currentValue))) {
            option.selected = true;
        }
        openingSelect.appendChild(option);
    });

    // Update variations for the new opening
    updateVariationDropdown();
}

function handleSelectorChange() {
    // Update opening dropdown based on color selection
    updateOpeningDropdown();
    initializeGame();
}

function updateVariationDropdown() {
    const openingId = document.getElementById('opening-select').value;
    const variationSelect = document.getElementById('variation-select');

    // Get variations for this opening
    const variations = getVariationsForOpening(openingId);

    // Clear existing options
    variationSelect.innerHTML = '';

    // Sort variations alphabetically by name
    const sortedVariations = Object.entries(variations).sort((a, b) => {
        const nameA = a[1].name.toLowerCase();
        const nameB = b[1].name.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    // Add new options
    let isFirst = true;
    for (const [variationId, variation] of sortedVariations) {
        const option = document.createElement('option');
        option.value = variationId;
        option.textContent = variation.nickname
            ? `${variation.nickname} (${variationId})`
            : variationId;
        if (isFirst) {
            option.selected = true;
            isFirst = false;
        }
        variationSelect.appendChild(option);
    }
}

function startTraining() {
    // Initialize audio context on user interaction
    initAudio();

    // Initialize game
    initializeGame();

    // Setup hints toggle
    setupHintsToggle();
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', async () => {
    initAudio();
    setupHintsToggle();
    initCombinationModal();
    document.getElementById('back-btn').addEventListener('click', goBack);
    document.getElementById('forward-btn').addEventListener('click', goForward);
    document.getElementById('reset-btn').addEventListener('click', resetTraining);
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === 'ArrowLeft') goBack();
        else if (e.key === 'ArrowRight') goForward();
    });
    await seedBuiltinVariations(); // Seed built-ins to Firestore if not already there
    await loadCustomVariations(); // Load all variations from Firestore
    updateOpeningDropdown();
    initializeGame();
    document.getElementById('loading-overlay').classList.add('hidden');

    // Check if we should open the create modal (from manage page)
    if (window.location.hash === '#create') {
        openModal();
        // Clear the hash
        history.replaceState(null, null, ' ');
    }
});

// Recalculate coordinate positions on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateCoordinatePositions();
    }, 100);
});

function initializeGame() {
    userColor = document.getElementById('color-select').value;
    userGoal = 'play'; // Always use 'play' mode
    const openingId = document.getElementById('opening-select').value;
    const variationId = document.getElementById('variation-select').value;

    // Build the full opening ID
    selectedOpening = `${openingId}:${variationId}`;

    clearTimeout(pendingTimeout);
    pendingTimeout = null;
    undoneStack = [];
    game = new Chess();
    currentStep = 0;
    selectedSquare = null;
    lastMove = null; // Reset last move highlighting

    // Get the appropriate opening sequence
    const sequenceKey = userGoal + 'As' + userColor.charAt(0).toUpperCase() + userColor.slice(1);
    const opening = openings[selectedOpening];

    if (!opening) {
        console.error('Opening not found:', selectedOpening);
        return;
    }

    openingSequence = opening[sequenceKey];

    if (!openingSequence) {
        console.error('Sequence not found:', sequenceKey, 'for opening:', selectedOpening);
        return;
    }

    // Create board
    createBoard();

    // Show first instruction
    showInstruction();

    // Show hint on board
    showHintOnBoard();

    // If user is black, make computer's first move
    if (userColor === 'black') {
        pendingTimeout = setTimeout(() => makeComputerMove(true), 500);
    }
    updateNavButtons();
}

// ============================================================================
// BOARD RENDERING
// ============================================================================

function updateCoordinatePositions() {
    const boardElement = document.getElementById('board');
    const wrapperElement = boardElement.parentElement;

    // Get actual board size dynamically
    const actualBoardWidth = boardElement.offsetWidth;
    const actualSquareSize = actualBoardWidth / 8;
    const wrapperPadding = parseInt(getComputedStyle(wrapperElement).padding) || 25;

    // Update rank coordinates (CSS transform handles centering)
    const rankCoords = wrapperElement.querySelectorAll('.rank-coord');
    rankCoords.forEach((rankLabel, index) => {
        rankLabel.style.top = (wrapperPadding + index * actualSquareSize + actualSquareSize / 2) + 'px';
    });

    // Update file coordinates (CSS transform handles centering)
    const fileCoords = wrapperElement.querySelectorAll('.file-coord');
    fileCoords.forEach((fileLabel, index) => {
        fileLabel.style.left = (wrapperPadding + index * actualSquareSize + actualSquareSize / 2) + 'px';
    });
}

function createBoard() {
    const boardElement = document.getElementById('board');
    const wrapperElement = boardElement.parentElement;
    boardElement.innerHTML = '';

    // Remove old coordinates if they exist
    const oldCoords = wrapperElement.querySelectorAll('.coordinates');
    oldCoords.forEach(coord => coord.remove());

    const files = userColor === 'white' ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] : ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
    const ranks = userColor === 'white' ? ['8', '7', '6', '5', '4', '3', '2', '1'] : ['1', '2', '3', '4', '5', '6', '7', '8'];

    // Get actual board size dynamically
    const actualBoardWidth = boardElement.offsetWidth;
    const actualSquareSize = actualBoardWidth / 8;
    const wrapperPadding = parseInt(getComputedStyle(wrapperElement).padding) || 25;

    // Add rank coordinates (numbers)
    ranks.forEach((rank, index) => {
        const rankLabel = document.createElement('div');
        rankLabel.className = 'coordinates rank-coord';
        rankLabel.textContent = rank;
        wrapperElement.appendChild(rankLabel);
        // CSS transform handles centering
        rankLabel.style.top = (wrapperPadding + index * actualSquareSize + actualSquareSize / 2) + 'px';
    });

    // Add file coordinates (letters)
    files.forEach((file, index) => {
        const fileLabel = document.createElement('div');
        fileLabel.className = 'coordinates file-coord';
        fileLabel.textContent = file;
        wrapperElement.appendChild(fileLabel);
        // CSS transform handles centering
        fileLabel.style.left = (wrapperPadding + index * actualSquareSize + actualSquareSize / 2) + 'px';
    });

    ranks.forEach((rank, rankIndex) => {
        files.forEach((file, fileIndex) => {
            const square = document.createElement('div');
            const squareId = file + rank;
            square.id = squareId;
            square.className = 'square ' + ((rankIndex + fileIndex) % 2 === 0 ? 'light' : 'dark');
            square.addEventListener('click', () => handleSquareClick(squareId));

            boardElement.appendChild(square);
        });
    });

    updateBoard();
}

function updateBoard() {
    const board = game.board();
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    // Clear last move highlighting first
    document.querySelectorAll('.square').forEach(sq => {
        sq.classList.remove('last-move-from', 'last-move-to');
    });

    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const piece = board[rank][file];
            const squareId = files[file] + (8 - rank);
            const squareElement = document.getElementById(squareId);

            if (piece) {
                const color = piece.color === 'w' ? 'w' : 'b';
                const type = piece.type.toUpperCase();
                squareElement.textContent = pieces[color + type];
                squareElement.classList.remove('white-piece', 'black-piece');
                squareElement.classList.add(color === 'w' ? 'white-piece' : 'black-piece');
            } else {
                squareElement.textContent = '';
                squareElement.classList.remove('white-piece', 'black-piece');
            }
        }
    }

    // Highlight last move
    if (lastMove) {
        const fromSquare = document.getElementById(lastMove.from);
        const toSquare = document.getElementById(lastMove.to);
        if (fromSquare) fromSquare.classList.add('last-move-from');
        if (toSquare) toSquare.classList.add('last-move-to');
    }
}

// ============================================================================
// USER INTERACTION HANDLERS
// ============================================================================

function handleSquareClick(squareId) {
    if (game.game_over()) return;

    // Check if it's the user's turn
    const isUserTurn = (game.turn() === 'w' && userColor === 'white') ||
                       (game.turn() === 'b' && userColor === 'black');

    if (!isUserTurn) return;

    if (!selectedSquare) {
        // Select piece
        const piece = game.get(squareId);
        if (piece && ((piece.color === 'w' && userColor === 'white') ||
                     (piece.color === 'b' && userColor === 'black'))) {
            selectedSquare = squareId;
            document.getElementById(squareId).classList.add('selected');
            highlightMoves(squareId);
        }
    } else {
        // Try to move
        const move = game.move({
            from: selectedSquare,
            to: squareId,
            promotion: 'q'
        });

        // Clear highlights
        clearHighlights();

        if (move) {
            // Play sound for all moves
            playMoveSound();

            // Track last move for highlighting
            lastMove = { from: move.from, to: move.to };

            updateBoard();
            checkUserMove(move.san);
        } else if (squareId === selectedSquare) {
            // Clicked same square, deselect
            selectedSquare = null;
        } else {
            // Try selecting different piece
            selectedSquare = null;
            handleSquareClick(squareId);
            return;
        }

        selectedSquare = null;
    }
}

function highlightMoves(square) {
    if (!hintsEnabled) return;

    const moves = game.moves({ square: square, verbose: true });
    moves.forEach(move => {
        document.getElementById(move.to).classList.add('highlight');
    });
}

function clearHighlights() {
    document.querySelectorAll('.square').forEach(sq => {
        sq.classList.remove('highlight', 'selected', 'hint-from', 'hint-to');
    });
}

// ============================================================================
// VISUAL FEEDBACK
// ============================================================================

function highlightCheckmate() {
    // Find the checkmated king's position
    const board = game.board();
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const piece = board[rank][file];
            // The checkmated king is the one whose turn it is (they're in checkmate on their turn)
            if (piece && piece.type === 'k' && piece.color === game.turn()) {
                // This is the checkmated king
                const squareId = files[file] + (8 - rank);
                const squareElement = document.getElementById(squareId);
                if (squareElement) {
                    squareElement.classList.add('checkmate');
                }
                return;
            }
        }
    }
}

function highlightTrappedQueen() {
    // Find the trapped queen's position
    const board = game.board();
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const piece = board[rank][file];
            // Look for black's queen
            if (piece && piece.type === 'q' && piece.color === 'b') {
                const squareId = files[file] + (8 - rank);
                const squareElement = document.getElementById(squareId);
                if (squareElement) {
                    squareElement.classList.add('trapped-queen');
                }
                return;
            }
        }
    }
}

function showHintOnBoard() {
    // Clear any existing hints first
    document.querySelectorAll('.square').forEach(sq => {
        sq.classList.remove('hint-from', 'hint-to');
    });

    if (!hintsEnabled || currentStep >= openingSequence.length) {
        return;
    }

    const expectedMove = openingSequence[currentStep].move;

    if (!expectedMove) {
        return;
    }

    // Check if it's the user's turn
    const isUserTurn = (game.turn() === 'w' && userColor === 'white') ||
                       (game.turn() === 'b' && userColor === 'black');

    if (!isUserTurn) return;

    // Try to find the piece that should move and highlight it
    const legalMoves = game.moves({ verbose: true });
    const expectedMoveObj = legalMoves.find(move => move.san === expectedMove);

    console.log('showHintOnBoard:', { expectedMove, isUserTurn, legalMoves: legalMoves.map(m => m.san), found: !!expectedMoveObj });

    if (expectedMoveObj) {
        const fromSquare = document.getElementById(expectedMoveObj.from);
        const toSquare = document.getElementById(expectedMoveObj.to);

        if (fromSquare) {
            fromSquare.classList.add('hint-from');
        }
        if (toSquare) {
            toSquare.classList.add('hint-to');
        }
    }
}

// ============================================================================
// MOVE VALIDATION AND GAME FLOW
// ============================================================================

function checkUserMove(moveSan) {
    if (currentStep >= openingSequence.length) {
        return;
    }

    const expectedMove = openingSequence[currentStep].move;

    // If this step has no expected move (instruction only), advance
    if (expectedMove === null) {
        currentStep++;
        showInstruction();
        setTimeout(makeComputerMove, 500);
        return;
    }

    // Check if move matches expected
    if (moveSan === expectedMove || isEquivalentMove(moveSan, expectedMove)) {
        undoneStack = []; // Clear redo history on a new correct move
        currentStep++;
        updateMoveHistory();
        showInstruction();

        // Check for checkmate
        if (game.in_checkmate()) {
            highlightCheckmate();
        }

        // Check if this is the end of the sequence and highlight trapped queen if it's the queen trap variation
        if (currentStep >= openingSequence.length && selectedOpening.includes('queen-trap')) {
            highlightTrappedQueen();
        }

        // Make computer response if needed
        if (currentStep < openingSequence.length) {
            pendingTimeout = setTimeout(() => {
                makeComputerMove();
                // Show hint after a brief delay to let the board update
                setTimeout(() => {
                    showHintOnBoard();
                    updateNavButtons();
                }, HINT_DELAY);
            }, COMPUTER_MOVE_DELAY);
        } else {
            // No more moves, show hint if there are more steps
            showHintOnBoard();
        }
    } else {
        // Undo the move if it's not the expected one
        game.undo();
        updateBoard();
        // instruction-text removed from UI
        showHintOnBoard();
    }
}

function isEquivalentMove(move1, move2) {
    // Remove check/checkmate symbols for comparison
    const clean1 = move1.replace(/[+#]/g, '');
    const clean2 = move2.replace(/[+#]/g, '');
    return clean1 === clean2;
}

function makeComputerMove(isInitialMove = false) {
    if (currentStep >= openingSequence.length) return;

    // Get computer moves for this opening
    const sequenceKey = userGoal + 'As' + userColor.charAt(0).toUpperCase() + userColor.slice(1);
    const moves = computerMoves[selectedOpening]?.[sequenceKey];

    if (!moves) {
        console.error('No computer moves found for:', sequenceKey);
        return;
    }

    // Calculate which computer move to make based on current step
    // When user plays as Black, computer goes first (currentStep = 0, moveIndex = 0)
    // After user's move, currentStep has been incremented, so we subtract 1
    let moveIndex;
    if (currentStep === 0 && openingSequence[0].move === null) {
        // Computer is making the very first move (user is Black)
        moveIndex = 0;
    } else {
        // Normal case: currentStep has been incremented after user's move
        moveIndex = currentStep - 1;
    }

    if (moveIndex < 0 || moveIndex >= moves.length) {
        return;
    }

    const moveSan = moves[moveIndex];

    try {
        const move = game.move(moveSan);
        if (move) {
            playMoveSound();

            // Track last move for highlighting
            lastMove = { from: move.from, to: move.to };

            updateBoard();
            updateMoveHistory();

            // Only increment currentStep for initial move (when user plays Black)
            // For response moves, checkUserMove already incremented it
            if (isInitialMove) {
                currentStep++;
                showInstruction();
                showHintOnBoard();
            }
        } else {
            console.error('Computer move failed:', moveSan);
        }
    } catch (e) {
        console.error('Computer move error:', e, 'tried to play:', moveSan);
    }
}

// ============================================================================
// UI UPDATES
// ============================================================================

// ============================================================================
// MOVE NAVIGATION (back / forward)
// ============================================================================

// Returns the next SAN move in the full sequence (user or computer) based on current game position
function getNextPreviewMove() {
    const len = game.history().length;
    const sequenceKey = userGoal + 'As' + userColor.charAt(0).toUpperCase() + userColor.slice(1);
    const compMoves = computerMoves[selectedOpening]?.[sequenceKey] || [];

    if (userColor === 'white') {
        // Alternates: user[0], comp[0], user[1], comp[1], ...
        if (len % 2 === 0) {
            const idx = len / 2;
            return (idx < openingSequence.length && openingSequence[idx].move) ? openingSequence[idx].move : null;
        } else {
            const idx = Math.floor(len / 2);
            return idx < compMoves.length ? compMoves[idx] : null;
        }
    } else {
        // Black: comp[0], user[1], comp[1], user[2], ...
        if (len % 2 === 0) {
            const idx = len / 2;
            return idx < compMoves.length ? compMoves[idx] : null;
        } else {
            const idx = (len + 1) / 2;
            return (idx < openingSequence.length && openingSequence[idx].move) ? openingSequence[idx].move : null;
        }
    }
}

function updateNavButtons() {
    const histLen = game.history().length;
    const minLength = userColor === 'black' ? 1 : 0;
    document.getElementById('back-btn').disabled = histLen <= minLength;
    document.getElementById('forward-btn').disabled = undoneStack.length === 0 && getNextPreviewMove() === null;
}

function goBack() {
    clearTimeout(pendingTimeout);
    pendingTimeout = null;

    const verboseHistory = game.history({ verbose: true });
    const minLength = userColor === 'black' ? 1 : 0;
    if (verboseHistory.length <= minLength) return;

    const lastMoveSan = verboseHistory[verboseHistory.length - 1].san;
    game.undo();
    undoneStack.push(lastMoveSan);

    // Restore last-move highlight for the new top of history
    const newVerbose = game.history({ verbose: true });
    lastMove = newVerbose.length > 0
        ? { from: newVerbose[newVerbose.length - 1].from, to: newVerbose[newVerbose.length - 1].to }
        : null;

    // Recalculate currentStep from game history length
    const len = newVerbose.length;
    currentStep = userColor === 'white'
        ? Math.ceil(len / 2)
        : Math.ceil((len + 1) / 2);

    updateBoard();
    showHintOnBoard();
    updateNavButtons();
}

function goForward() {
    let san;
    if (undoneStack.length > 0) {
        san = undoneStack.pop();
    } else {
        san = getNextPreviewMove();
        if (!san) return;
    }

    const move = game.move(san);
    if (!move) { undoneStack.push(san); return; }

    lastMove = { from: move.from, to: move.to };

    const len = game.history().length;
    currentStep = userColor === 'white'
        ? Math.ceil(len / 2)
        : Math.ceil((len + 1) / 2);

    updateBoard();
    showHintOnBoard();
    updateNavButtons();
}

function showInstruction() {
    // instruction-text element removed from UI; no-op
}

function updateMoveHistory() {
    // moves-list element removed from UI; no-op
}

function resetTraining() {
    initializeGame();
}

// ============================================================================
// CREATE COMBINATION FEATURE
// ============================================================================

let recordingGame = null;
let recordingColor = 'white';
let recordingOpening = 'italian-game';
let recordedMoves = []; // { move: 'e4' }
let recordingSelectedSquare = null;

// Initialize modal event listeners
function initCombinationModal() {
    const modal = document.getElementById('combination-modal');
    const closeBtn = document.getElementById('modal-close');
    const startRecordingBtn = document.getElementById('start-recording-btn');
    const undoMoveBtn = document.getElementById('undo-move-btn');
    const finishRecordingBtn = document.getElementById('finish-recording-btn');
    const colorSelect = document.getElementById('combo-color');

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    startRecordingBtn.addEventListener('click', startRecording);
    undoMoveBtn.addEventListener('click', undoRecordingMove);
    finishRecordingBtn.addEventListener('click', finishRecording);
    colorSelect.addEventListener('change', updateOpeningForColor);
}

// Update opening dropdown based on color selection
function updateOpeningForColor() {
    const color = document.getElementById('combo-color').value;
    const openingSelect = document.getElementById('combo-opening');

    if (color === 'white') {
        openingSelect.innerHTML = '<option value="italian-game">Italian Game</option>';
    } else {
        openingSelect.innerHTML = '<option value="caro-kann">Caro-Kann Defense</option>';
    }
}

function openModal() {
    const modal = document.getElementById('combination-modal');
    modal.classList.add('active');
    // Reset to step 1
    document.getElementById('modal-step-1').classList.remove('hidden');
    document.getElementById('modal-step-2').classList.add('hidden');
    // Reset color to white and update opening dropdown
    document.getElementById('combo-color').value = 'white';
    updateOpeningForColor();
}

function closeModal() {
    const modal = document.getElementById('combination-modal');
    modal.classList.remove('active');
    // Reset state
    recordingGame = null;
    recordedMoves = [];
    recordingSelectedSquare = null;
    const nicknameInput = document.getElementById('combo-nickname');
    if (nicknameInput) nicknameInput.value = '';
}

function startRecording() {
    // Use the opening selected in the modal
    recordingOpening = document.getElementById('combo-opening').value;
    recordingColor = document.getElementById('combo-color').value;

    // Initialize recording game
    recordingGame = new Chess();
    recordedMoves = [];
    recordingSelectedSquare = null;

    // Add initial null move for black (waiting for white's first move)
    if (recordingColor === 'black') {
        recordedMoves.push({ move: null });
    }

    // Switch to step 2
    document.getElementById('modal-step-1').classList.add('hidden');
    document.getElementById('modal-step-2').classList.remove('hidden');

    // Create recording board
    createRecordingBoard();
    updateRecordedMovesList();
}

function createRecordingBoard() {
    const boardElement = document.getElementById('recording-board');
    boardElement.innerHTML = '';

    const files = recordingColor === 'white' ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] : ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
    const ranks = recordingColor === 'white' ? ['8', '7', '6', '5', '4', '3', '2', '1'] : ['1', '2', '3', '4', '5', '6', '7', '8'];

    ranks.forEach((rank, rankIndex) => {
        files.forEach((file, fileIndex) => {
            const square = document.createElement('div');
            const squareId = file + rank;
            square.id = 'rec-' + squareId;
            square.className = 'square ' + ((rankIndex + fileIndex) % 2 === 0 ? 'light' : 'dark');
            square.addEventListener('click', () => handleRecordingSquareClick(squareId));
            boardElement.appendChild(square);
        });
    });

    updateRecordingBoard();
}

function updateRecordingBoard() {
    const board = recordingGame.board();
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const piece = board[rank][file];
            const squareId = files[file] + (8 - rank);
            const squareElement = document.getElementById('rec-' + squareId);

            if (squareElement) {
                if (piece) {
                    const color = piece.color === 'w' ? 'w' : 'b';
                    const type = piece.type.toUpperCase();
                    squareElement.textContent = pieces[color + type];
                    squareElement.classList.remove('white-piece', 'black-piece');
                    squareElement.classList.add(color === 'w' ? 'white-piece' : 'black-piece');
                } else {
                    squareElement.textContent = '';
                    squareElement.classList.remove('white-piece', 'black-piece');
                }
            }
        }
    }
}

function handleRecordingSquareClick(squareId) {
    if (recordingGame.game_over()) return;

    if (!recordingSelectedSquare) {
        // Select piece
        const piece = recordingGame.get(squareId);
        if (piece) {
            recordingSelectedSquare = squareId;
            document.getElementById('rec-' + squareId).classList.add('selected');
        }
    } else {
        // Try to move
        const move = recordingGame.move({
            from: recordingSelectedSquare,
            to: squareId,
            promotion: 'q'
        });

        // Clear selection
        document.getElementById('rec-' + recordingSelectedSquare).classList.remove('selected');

        if (move) {
            playMoveSound();

            // Determine if this is a user move or computer move
            const isUserMove = (move.color === 'w' && recordingColor === 'white') ||
                               (move.color === 'b' && recordingColor === 'black');

            if (isUserMove) {
                recordedMoves.push({ move: move.san });
            } else {
                recordedMoves.push({ move: move.san, isComputerMove: true });
            }

            updateRecordingBoard();
            updateRecordedMovesList();
        } else if (squareId !== recordingSelectedSquare) {
            // Try selecting different piece
            const piece = recordingGame.get(squareId);
            if (piece) {
                recordingSelectedSquare = squareId;
                document.getElementById('rec-' + squareId).classList.add('selected');
                return;
            }
        }

        recordingSelectedSquare = null;
    }
}

function undoRecordingMove() {
    if (recordedMoves.length === 0) return;

    // Check if last recorded move was a null move (initial instruction for black)
    const lastMove = recordedMoves[recordedMoves.length - 1];
    if (lastMove.move === null) {
        recordedMoves.pop();
    } else {
        recordingGame.undo();
        recordedMoves.pop();
    }

    updateRecordingBoard();
    updateRecordedMovesList();
}

function updateRecordedMovesList() {
    const movesList = document.getElementById('recorded-moves-list');

    if (recordedMoves.length === 0) {
        movesList.innerHTML = 'No moves yet';
        return;
    }

    let html = '';

    for (let i = 0; i < recordedMoves.length; i++) {
        const recorded = recordedMoves[i];
        if (recorded.move === null) {
            html += `<div style="color: #666; font-style: italic;">Start position</div>`;
        } else {
            const icon = recorded.isComputerMove ? '🖥️ ' : '';
            html += `<span>${icon}${recorded.move}</span> `;
        }
    }

    movesList.innerHTML = html || 'No moves yet';
}

function finishRecording() {
    if (recordedMoves.filter(m => m.move !== null).length === 0) {
        alert('Please record at least one move');
        return;
    }

    // Build the variation data
    const sequenceKey = 'playAs' + recordingColor.charAt(0).toUpperCase() + recordingColor.slice(1);

    // Build user sequences and computer move list
    const userSequences = [];
    const computerMovesList = [];

    for (const recorded of recordedMoves) {
        if (recorded.move === null) {
            userSequences.push({ move: null });
        } else if (recorded.isComputerMove) {
            computerMovesList.push(recorded.move);
        } else {
            userSequences.push({ move: recorded.move });
        }
    }

    // Auto-generate variation name from computer moves (opponent's responses)
    const variationName = computerMovesList.join('-');

    if (!variationName) {
        alert('Please record at least one opponent move');
        return;
    }

    // Check for duplicates (in both registered openings and localStorage)
    const fullId = `${recordingOpening}:${variationName}`;
    if (openings[fullId]) {
        alert(`A variation "${variationName}" already exists for this opening.`);
        return;
    }

    const nickname = document.getElementById('combo-nickname').value.trim();

    const variation = {
        name: variationName,
        nickname: nickname || null,
        openingId: recordingOpening,
        isCustom: true,
        sequences: {
            [sequenceKey]: userSequences
        },
        computerMoves: {
            [sequenceKey]: computerMovesList
        }
    };

    // Save to Firestore
    saveCustomVariation(recordingOpening, variationName, variation).catch(err => {
        console.error('Failed to save to Firestore:', err);
    });

    // Register the variation
    registerCustomVariation(recordingOpening, variationName, variation);

    // Update the variation dropdown and select the new variation
    const currentOpening = document.getElementById('opening-select').value;
    if (currentOpening === recordingOpening) {
        updateVariationDropdown();
        // Select the newly created variation
        document.getElementById('variation-select').value = variationName;
    }

    alert(`Combination "${variationName}" saved successfully!`);
    closeModal();
}

// Firestore functions
async function seedBuiltinVariations() {
    for (const [openingId, opening] of Object.entries(openingRegistry)) {
        const docRef = db.collection('customVariations').doc(openingId);
        const doc = await docRef.get();
        const existing = doc.exists ? doc.data() : {};

        const toWrite = {};
        for (const [variationId] of Object.entries(opening.variations)) {
            // Skip custom variations — only overwrite built-ins
            if (existing[variationId] && existing[variationId].isCustom) continue;
            // Skip variations the admin has explicitly deleted
            if (existing[variationId] && existing[variationId].deleted) continue;

            const fullId = `${openingId}:${variationId}`;
            const variationData = openings[fullId];
            if (variationData) {
                const seqKey = variationData.playAsWhite ? 'playAsWhite' : 'playAsBlack';
                toWrite[variationId] = {
                    name: variationId,
                    openingId: openingId,
                    isCustom: false,
                    sequences: { [seqKey]: variationData[seqKey] },
                    computerMoves: computerMoves[fullId] ? { [seqKey]: computerMoves[fullId][seqKey] } : {}
                };
            }
        }

        if (Object.keys(toWrite).length > 0) {
            await docRef.set(toWrite, { merge: true });
        }
    }
}

async function saveCustomVariation(openingId, variationId, variation) {
    await db.collection('customVariations').doc(openingId).set(
        { [variationId]: variation },
        { merge: true }
    );
}

async function loadCustomVariations() {
    const snapshot = await db.collection('customVariations').get();
    snapshot.forEach(doc => {
        const openingId = doc.id;
        const variations = doc.data();
        for (const [variationId, variation] of Object.entries(variations)) {
            if (!variation) continue;
            if (variation.deleted) {
                // Unregister built-ins that were deleted via admin
                const fullId = `${openingId}:${variationId}`;
                delete openings[fullId];
                delete computerMoves[fullId];
                if (openingRegistry[openingId]) {
                    delete openingRegistry[openingId].variations[variationId];
                }
            } else {
                registerCustomVariation(openingId, variationId, variation);
            }
        }
    });
}

function registerCustomVariation(openingId, variationId, variation) {
    const fullId = `${openingId}:${variationId}`;

    // Register in openingRegistry
    if (!openingRegistry[openingId]) {
        openingRegistry[openingId] = { name: openingId, variations: {} };
    }
    openingRegistry[openingId].variations[variationId] = {
        name: variation.name,
        nickname: variation.nickname || null,
        isCustom: true
    };

    // Register sequences
    openings[fullId] = {
        name: variation.name,
        isCustom: true,
        ...variation.sequences
    };

    // Register computer moves
    if (variation.computerMoves) {
        computerMoves[fullId] = variation.computerMoves;
    }

    console.log(`✓ Registered custom: ${openingId} - ${variation.name}`);
}

