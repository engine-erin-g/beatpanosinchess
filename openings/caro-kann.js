/**
 * Caro-Kann Defense
 *
 * The Caro-Kann Defense is a solid opening for Black starting with 1...c6.
 * It's known for being solid and reliable, leading to positions where Black has
 * a strong pawn structure and good piece development.
 */

registerOpening({
    id: 'caro-kann',
    name: 'Caro-Kann Defense',

    // Variations (alphabetically ordered)
    variations: {
        'e3-Bd3-c4-cxd5': {
            name: 'e3-Bd3-c4-cxd5',

            sequences: {
                playAsBlack: [
                    { move: null, instruction: "You are black. Let's learn to respond to the e3-Bd3 system. Wait for white's first move." },
                    { move: 'd5', instruction: "White plays e3. Play d5 to control the center!" },
                    { move: 'e5', instruction: "Good! White plays Bd3. Play e5 to grab more space in the center!" },
                    { move: 'Nc6', instruction: "Excellent! White plays c4. Develop your knight to c6!" },
                    { move: 'Qxd5', instruction: "Perfect! White captures cxd5. Recapture with Qxd5, centralizing your queen!" }
                ]
            },

            computerMoves: {
                playAsBlack: ['e3', 'Bd3', 'c4', 'cxd5']
            }
        },

        'e4-Bc4-cxd5-Bd3': {
            name: 'e4-Bc4-cxd5-Bd3',

            sequences: {
                playAsBlack: [
                    { move: null, instruction: "You are black. Let's learn to respond to the Bc4 variation. Wait for white's first move." },
                    { move: 'c6', instruction: "White plays e4. Respond with c6 - the Caro-Kann Defense!" },
                    { move: 'd5', instruction: "Good! White plays Bc4. Play d5 to challenge the center and attack the bishop!" },
                    { move: 'cxd5', instruction: "Excellent! White captures exd5. Recapture with cxd5!" },
                    { move: 'e5', instruction: "Perfect! White retreats Bd3. Develop your bishop to f5 - the classic Caro-Kann bishop!" }
                ]
            },

            computerMoves: {
                playAsBlack: ['e4', 'Bc4', 'exd5', 'Bd3']
            }
        },

        'e4-d4-e5-dxc5-Nf3-Be2-O-O': {
            name: 'e4-d4-e5-dxc5-Nf3-Be2-O-O',

            sequences: {
                playAsBlack: [
                    { move: null, instruction: "You are black. Let's learn the Caro-Kann Advance Variation. Wait for white's first move." },
                    { move: 'c6', instruction: "White plays e4. Respond with c6 - the Caro-Kann Defense!" },
                    { move: 'd5', instruction: "Good! White plays d4. Play d5 to challenge the center!" },
                    { move: 'c5', instruction: "Excellent! White plays e5 (Advance Variation). Strike at the center with c5!" },
                    { move: 'Nc6', instruction: "Perfect! White captures dxc5. Develop your knight to c6!" },
                    { move: 'Bg4', instruction: "Great! White plays Nf3. Develop your bishop to g4, pinning the knight!" },
                    { move: 'e6', instruction: "Well done! White plays Be2. Play e6 to solidify your center!" },
                    { move: 'Bxc5', instruction: "Excellent! White castles. Capture Bxc5 to reclaim your pawn. You have a solid Caro-Kann position!" }
                ]
            },

            computerMoves: {
                playAsBlack: ['e4', 'd4', 'e5', 'dxc5', 'Nf3', 'Be2', 'O-O']
            }
        },

        'e4-Nf3-e5-d4': {
            name: 'e4-Nf3-e5-d4',

            sequences: {
                playAsBlack: [
                    { move: null, instruction: "You are black. Let's learn the Two Knights Variation with e5 advance. Wait for white's first move." },
                    { move: 'c6', instruction: "White plays e4. Respond with c6 - the Caro-Kann Defense!" },
                    { move: 'd5', instruction: "Good! White plays Nf3. Play d5 to challenge the center!" },
                    { move: 'Bg4', instruction: "Excellent! White plays e5 (advancing the pawn). Develop your bishop to g4, pinning the knight!" },
                    { move: 'e6', instruction: "Perfect! White plays d4 to support the center. Play e6 to solidify your position and prepare to develop!" }
                ]
            },

            computerMoves: {
                playAsBlack: ['e4', 'Nf3', 'e5', 'd4']
            }
        },

        'e4-Qh5-Qh4': {
            name: 'e4-Qh5-Qh4-f4-fxe5-Nf3-Qg3-Nc3',

            sequences: {
                playAsBlack: [
                    { move: null, instruction: "You are black. Let's learn how to handle the aggressive early queen attack. Wait for white's first move." },
                    { move: 'c6', instruction: "White plays e4. Respond with c6 - the Caro-Kann Defense!" },
                    { move: 'Nf6', instruction: "White plays Qh5, attacking f7! Defend with Nf6, also developing and attacking the queen." },
                    { move: 'e5', instruction: "Good! White retreats to Qh4. Play e5 to control the center!" },
                    { move: 'd6', instruction: "White plays f4. Solidify your center with d6!" },
                    { move: 'dxe5', instruction: "Excellent! White captures fxe5. Recapture with dxe5!" },
                    { move: 'Be7', instruction: "Perfect! White develops Nf3. Develop your bishop to e7!" },
                    { move: 'O-O', instruction: "Great! White plays Qg3. Castle kingside to bring your rook into play!" },
                    { move: 'b5', instruction: "Well done! White develops Nc3. Play b5 to start your queenside expansion. You've successfully defended against the early queen attack!" }
                ]
            },

            computerMoves: {
                playAsBlack: ['e4', 'Qh5', 'Qh4', 'f4', 'fxe5', 'Nf3', 'Qg3', 'Nc3']
            }
        }
    }
});
