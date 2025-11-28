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
        'c4-Nc3-e4-Nce2': {
            name: 'c4-Nc3-e4-Nce2',

            sequences: {
                playAsBlack: [
                    { move: null, instruction: "You are black. Let's learn how to handle the English Opening approach to Caro-Kann structures. Wait for white's first move." },
                    { move: 'c6', instruction: "White plays c4 (English Opening). Respond with c6, preparing d5!" },
                    { move: 'd5', instruction: "Good! White plays Nc3. Play d5 to challenge the center!" },
                    { move: 'd4', instruction: "Excellent! White plays e4, transposing to a Caro-Kann structure. Play d4! This advances your pawn and gains space!" },
                    { move: 'e5', instruction: "Perfect! White plays Nce2. Play e5 to establish a strong pawn center and control key squares!" }
                ]
            },

            computerMoves: {
                playAsBlack: ['c4', 'Nc3', 'e4', 'Nce2']
            }
        },

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

        'e4-d4-e5-Nf3-dxc5-Bb5-Bg5-Qe2-Qxf2': {
            name: 'e4-d4-e5-Nf3-dxc5-Bb5-Bg5-Qe2-Qxf2',

            sequences: {
                playAsBlack: [
                    { move: null, instruction: "You are black. Let's learn a tactical Advance Variation line. Wait for white's first move." },
                    { move: 'c6', instruction: "White plays e4. Respond with c6 - the Caro-Kann Defense!" },
                    { move: 'd5', instruction: "Good! White plays d4. Play d5 to challenge the center!" },
                    { move: 'c5', instruction: "Excellent! White plays e5 (Advance Variation). Strike at the center with c5!" },
                    { move: 'Nc6', instruction: "Perfect! White plays Nf3. Develop your knight to c6!" },
                    { move: 'e6', instruction: "Great! White captures dxc5. Play e6 to prepare your bishop development!" },
                    { move: 'Bxc5', instruction: "Well done! White plays Bd5. Capture Bxc5 to reclaim your pawn!" },
                    { move: 'Qb6', instruction: "Excellent! White plays Bg5. Develop your queen to b6, attacking b2 and putting pressure on white!" },
                    { move: 'Bxf2+', instruction: "Perfect! White plays Qe2. Now sacrifice your bishop with Bxf2+! This gives you a strong initiative!" },
                    { move: 'Qxb5', instruction: "Brilliant! White recaptures Qxf2. Capture the b2 pawn with check: Qxb2! You've gained material and disrupted white's position!" }
                ]
            },

            computerMoves: {
                playAsBlack: ['e4', 'd4', 'e5', 'Nf3', 'dxc5', 'Bb5', 'Bg5', 'Qe2', 'Qxf2']
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
        },

        'e4-d4-Nc3-Nxe4-Nxf6-c3': {
            name: 'e4-d4-Nc3-Nxe4-Nxf6-c3',

            sequences: {
                playAsBlack: [
                    { move: null, instruction: "You are black. Let's learn the Classical Variation of the Caro-Kann. Wait for white's first move." },
                    { move: 'c6', instruction: "White plays e4. Respond with c6 - the Caro-Kann Defense!" },
                    { move: 'd5', instruction: "Good! White plays d4. Play d5 to challenge the center!" },
                    { move: 'dxe4', instruction: "Excellent! White plays Nc3. Capture dxe4 to trade in the center!" },
                    { move: 'Nf6', instruction: "Perfect! White plays Nxe4. Develop your knight to f6, attacking the knight!" },
                    { move: 'exf6', instruction: "Well done! White plays Nxf6+ giving check. Recapture exf6!" },
                    { move: 'Bd6', instruction: "Great! White plays c3. Develop your bishop to d6. You have a solid Caro-Kann position!" }
                ]
            },

            computerMoves: {
                playAsBlack: ['e4', 'd4', 'Nc3', 'Nxe4', 'Nxf6+', 'c3']
            }
        },

        'e4-f4-e5-d4-Nc3': {
            name: 'e4-f4-e5-d4-Nc3',

            sequences: {
                playAsBlack: [
                    { move: null, instruction: "You are black. Let's learn to respond to the King's Gambit approach to the Caro-Kann. Wait for white's first move." },
                    { move: 'c6', instruction: "White plays e4. Respond with c6 - the Caro-Kann Defense!" },
                    { move: 'd5', instruction: "Good! White plays f4 (aggressive King's Gambit style). Play d5 to challenge the center!" },
                    { move: 'Bf5', instruction: "Excellent! White plays e5, gaining space. Develop your bishop to f5 - the classic Caro-Kann bishop!" },
                    { move: 'e6', instruction: "Perfect! White plays d4, establishing a strong center. Play e6 to solidify your position!" },
                    { move: 'c5', instruction: "Great! White develops Nc3. Strike at the center with c5! You're counterattacking white's pawn chain!" }
                ]
            },

            computerMoves: {
                playAsBlack: ['e4', 'f4', 'e5', 'd4', 'Nc3']
            }
        },

        'e4-Qh5-Qf3-Bc4': {
            name: 'e4-Qh5-Qf3-Bc4-exd5-Bb3-d3-Qe1',

            sequences: {
                playAsBlack: [
                    { move: null, instruction: "You are black. Let's learn how to handle the Qh5-Qf3 early queen attack. Wait for white's first move." },
                    { move: 'c6', instruction: "White plays e4. Respond with c6 - the Caro-Kann Defense!" },
                    { move: 'Nf6', instruction: "White plays Qh5, attacking f7! Defend with Nf6, also developing and attacking the queen." },
                    { move: 'e5', instruction: "Good! White plays Qf3, still attacking f7. Play e5 to control the center!" },
                    { move: 'd5', instruction: "White plays Bc4, increasing pressure on f7. Play d5 to challenge the center!" },
                    { move: 'cxd5', instruction: "Excellent! White captures exd5. Recapture with cxd5!" },
                    { move: 'Nc6', instruction: "Perfect! White retreats Bb3. Develop your knight to c6!" },
                    { move: 'Bc5', instruction: "Great! White plays d3. Develop your bishop to c5, targeting f2!" },
                    { move: 'O-O', instruction: "Well done! White retreats Qe1. Castle kingside to safety. You've successfully neutralized white's early aggression!" }
                ]
            },

            computerMoves: {
                playAsBlack: ['e4', 'Qh5', 'Qf3', 'Bc4', 'exd5', 'Bb3', 'd3', 'Qe1']
            }
        }
    }
});
