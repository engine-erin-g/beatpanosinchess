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

    // Variations
    variations: {
        'e4-d4-e5': {
            name: 'e4-d4-e5',

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

        'e3-Bd3': {
            name: 'e3-Bd3',

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
        }
    }
});
