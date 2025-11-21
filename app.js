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

// ============================================================================
// CONSTANTS
// ============================================================================

// Chess piece Unicode characters (using filled symbols for consistent sizing)
const pieces = {
    'wK': '♚', 'wQ': '♛', 'wR': '♜', 'wB': '♝', 'wN': '♞', 'wP': '♟',
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

function playMoveSound() {
    try {
        if (!audioContext) {
            initAudio();
        }

        // Create a realistic wood-on-wood sound using noise and filters
        const bufferSize = audioContext.sampleRate * 0.08; // 80ms of audio
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate white noise with decay for wood impact
        for (let i = 0; i < bufferSize; i++) {
            const decay = Math.exp(-i / (bufferSize * 0.3));
            data[i] = (Math.random() * 2 - 1) * decay * 0.3;
        }

        const noiseSource = audioContext.createBufferSource();
        noiseSource.buffer = buffer;

        // Band-pass filter to make it sound more like wood
        const filter = audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800; // Woody frequency range
        filter.Q.value = 3;

        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
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
document.getElementById('reset-button').addEventListener('click', resetTraining);

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

    // Add new options
    let isFirst = true;
    for (const [variationId, variation] of Object.entries(variations)) {
        const option = document.createElement('option');
        option.value = variationId;
        option.textContent = variation.name;
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
window.addEventListener('DOMContentLoaded', () => {
    initAudio();
    setupHintsToggle();
    updateOpeningDropdown();
    initializeGame();
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

    game = new Chess();
    currentStep = 0;
    selectedSquare = null;

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
        setTimeout(() => makeComputerMove(true), 500);
    }
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
            setTimeout(() => {
                makeComputerMove();
                // Show hint after a brief delay to let the board update
                setTimeout(() => {
                    showHintOnBoard();
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
        document.getElementById('instruction-text').textContent =
            `Not quite! Try ${expectedMove}. ` + openingSequence[currentStep].instruction;
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

function showInstruction() {
    if (currentStep < openingSequence.length) {
        document.getElementById('instruction-text').textContent = openingSequence[currentStep].instruction;
    } else {
        document.getElementById('instruction-text').textContent = "Great job! You've completed this opening tutorial. Click 'Start Over' to practice again.";
    }
}

function updateMoveHistory() {
    const history = game.history();
    const movesList = document.getElementById('moves-list');
    let html = '';

    for (let i = 0; i < history.length; i += 2) {
        const moveNum = Math.floor(i / 2) + 1;
        const whiteMove = history[i];
        const blackMove = history[i + 1] || '';
        html += `${moveNum}. ${whiteMove} ${blackMove}<br>`;
    }

    movesList.innerHTML = html || 'No moves yet';
}

function resetTraining() {
    initializeGame();
}
