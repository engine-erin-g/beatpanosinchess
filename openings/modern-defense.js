/**
 * Modern Defense Opening
 *
 * A hypermodern chess opening where Black allows White to build a strong pawn center,
 * then undermines it with moves like ...g6, ...Bg7, and ...d6.
 */

registerOpening({
    id: 'modern-defense',
    name: 'Modern Defense',

    // Variations
    variations: {
        'nd7-checkmate': {
            name: 'Nd7 Fastest Checkmate',

            sequences: {
                beatAsWhite: [
                    { move: 'e4', instruction: "You are white. Let's learn how to beat the Modern Defense. Start with e4." },
                    { move: 'd4', instruction: "Good! Black plays g6. Now play d4 to control the center." },
                    { move: 'Nf3', instruction: "Excellent! Black plays Bg7. Develop your knight to f3." },
                    { move: 'Bc4', instruction: "Well done! Black plays d6. Develop your bishop to c4, targeting f7!" },
                    { move: 'Bxf7+', instruction: "Great! Black plays Nd7. Sacrifice your bishop on f7 with check!" },
                    { move: 'Ng5+', instruction: "Excellent! Black takes with the king Kxf7. Follow up with knight to g5, giving check!" },
                    { move: 'Qf3#', instruction: "Perfect! Black king moves to f6. Deliver checkmate with Qf3!" }
                ],

                playAsBlack: [
                    { move: null, instruction: "You are black. Let's learn to play the Modern Defense. Wait for white's first move." },
                    { move: 'g6', instruction: "White plays e4. Respond with g6 - this is the starting move of the Modern Defense!" },
                    { move: 'Bg7', instruction: "Good! White plays d4. Now play Bg7 to fianchetto your bishop." },
                    { move: 'd6', instruction: "Excellent! Your bishop is on the long diagonal. White plays Nc3. Develop with d6." },
                    { move: 'Nf6', instruction: "Well done! This flexible setup lets you choose your plan. White plays f4. Develop your knight with Nf6." },
                    { move: 'O-O', instruction: "Great! You're attacking the e4 pawn. Castle kingside for safety." }
                ]
            },

            computerMoves: {
                beatAsWhite: ['g6', 'Bg7', 'd6', 'Nd7', 'Kxf7', 'Kf6'],
                playAsBlack: ['e4', 'd4', 'Nc3', 'f4']
            }
        },

        'nd7-queen-trap': {
            name: 'Nd7 Queen Trap',

            sequences: {
                beatAsWhite: [
                    { move: 'e4', instruction: "You are white. Let's learn the Queen Trap against the Modern Defense. Start with e4." },
                    { move: 'd4', instruction: "Good! Black plays g6. Now play d4 to control the center." },
                    { move: 'Nf3', instruction: "Excellent! Black plays Bg7. Develop your knight to f3." },
                    { move: 'Bc4', instruction: "Well done! Black plays d6. Develop your bishop to c4, targeting f7!" },
                    { move: 'Bxf7+', instruction: "Great! Black plays Nd7. Sacrifice your bishop on f7 with check!" },
                    { move: 'Ng5+', instruction: "Perfect! Black's king takes Kxf7. Play Ng5+ to give check!" },
                    { move: 'Ne6', instruction: "Excellent! Black retreats Ke8. Now trap the queen with Ne6!" }
                ]
            },

            computerMoves: {
                beatAsWhite: ['g6', 'Bg7', 'd6', 'Nd7', 'Kxf7', 'Ke8']
            }
        },

        '150-attack': {
            name: '150 Attack',

            sequences: {
                playAsWhite: [
                    { move: 'd4', instruction: "You are white. Let's learn the 150 Attack, an aggressive system against the Modern Defense. Start with d4." },
                    { move: 'Nc3', instruction: "Good! Black plays g6. Develop your knight to c3." },
                    { move: 'e4', instruction: "Excellent! Black plays Bg7. Now play e4 to establish a strong pawn center." },
                    { move: 'Be3', instruction: "Well done! Black plays d6. Develop your bishop to e3, preparing to castle queenside." },
                    { move: 'Qd2', instruction: "Great! Black plays Nf6. Play Qd2, connecting the rooks and preparing O-O-O." },
                    { move: 'f3', instruction: "Perfect! Black castles kingside. Play f3 to support your center and prepare the pawn storm!" },
                    { move: 'g4', instruction: "Excellent! Black plays c6. Launch the kingside pawn storm with g4!" },
                    { move: 'h4', instruction: "Good! Black plays b5. Continue the attack with h4!" },
                    { move: 'g5', instruction: "Well done! Black plays h5 trying to close the kingside. Push g5 to drive away the knight!" },
                    { move: 'O-O-O', instruction: "Great! Black plays Nfd7. Castle queenside to safety while attacking on the kingside!" }
                ],

                beatAsBlack: [
                    { move: null, instruction: "You are black. Let's learn how to beat the 150 Attack. Wait for white's first move." },
                    { move: 'g6', instruction: "White plays d4. Respond with g6 - the Modern Defense!" },
                    { move: 'Bg7', instruction: "Good! White plays Nc3. Fianchetto your bishop with Bg7." },
                    { move: 'd6', instruction: "Excellent! White plays e4. Play d6 to complete your setup." },
                    { move: 'Nf6', instruction: "Well done! White plays Be3. Develop your knight with Nf6." },
                    { move: 'O-O', instruction: "Great! White plays Qd2. Castle kingside for safety." },
                    { move: 'c6', instruction: "Perfect! White plays f3. Play c6 to prepare queenside counterattack with b5!" },
                    { move: 'b5', instruction: "Excellent! White plays g4. Launch your queenside attack with b5!" },
                    { move: 'h5', instruction: "Good! White plays h4. Play h5 to close the kingside and stop white's attack!" },
                    { move: 'Nfd7', instruction: "Well done! White plays g5. Retreat your knight to d7 to reroute it." },
                    { move: 'a5', instruction: "Great! White castles queenside. Continue with a5, attacking white's king!" },
                    { move: 'b4', instruction: "Perfect! White plays Nge2. Play b4 to drive away the knight and open lines!" },
                    { move: 'a4', instruction: "Excellent! White retreats Na2. Push a4 to continue the attack!" },
                    { move: 'Qa5', instruction: "Good! White plays Kb1. Activate your queen with Qa5, targeting a2!" },
                    { move: 'Nc5', instruction: "Well done! White plays Nc1. Bring your knight to c5 to join the attack!" }
                ],

                playAsBlack: [
                    { move: null, instruction: "You are black. Let's learn how to play against the 150 Attack. Wait for white's first move." },
                    { move: 'g6', instruction: "White plays d4. Respond with g6 - the Modern Defense!" },
                    { move: 'Bg7', instruction: "Good! White plays Nc3. Fianchetto your bishop with Bg7." },
                    { move: 'd6', instruction: "Excellent! White plays e4. Play d6 to complete your setup." },
                    { move: 'Nf6', instruction: "Well done! White plays Be3. Develop your knight with Nf6." },
                    { move: 'O-O', instruction: "Great! White plays Qd2. Castle kingside for safety." },
                    { move: 'c6', instruction: "Perfect! White plays f3. Play c6 to prepare queenside expansion with b5." },
                    { move: 'b5', instruction: "Excellent! White plays g4. Start your queenside counterplay with b5!" },
                    { move: 'h5', instruction: "Good! White plays h4. Play h5 to close the kingside and slow white's attack!" },
                    { move: 'Nfd7', instruction: "Well done! White plays g5. Retreat your knight to d7, preparing to reroute it." },
                    { move: 'a5', instruction: "Great! White castles queenside. Continue your queenside attack with a5!" }
                ],

                beatAsWhite: [
                    { move: 'd4', instruction: "You are white. Let's learn how to beat the Modern Defense with the 150 Attack. Start with d4." },
                    { move: 'Nc3', instruction: "Good! Black plays g6. Develop your knight to c3." },
                    { move: 'e4', instruction: "Excellent! Black plays Bg7. Now play e4 to establish a strong pawn center." },
                    { move: 'Be3', instruction: "Well done! Black plays d6. Develop your bishop to e3, preparing to castle queenside." },
                    { move: 'Qd2', instruction: "Great! Black plays Nf6. Play Qd2, connecting the rooks and preparing O-O-O." },
                    { move: 'f3', instruction: "Perfect! Black castles kingside. Play f3 to support your center and prepare the pawn storm!" },
                    { move: 'g4', instruction: "Excellent! Black plays c6. Launch the kingside pawn storm with g4!" },
                    { move: 'h4', instruction: "Good! Black plays b5. Continue the attack with h4!" },
                    { move: 'g5', instruction: "Well done! Black plays h5 trying to close the kingside. Push g5 to drive away the knight!" },
                    { move: 'O-O-O', instruction: "Great! Black plays Nfd7. Castle queenside to safety while attacking on the kingside!" }
                ]
            },

            computerMoves: {
                playAsWhite: ['g6', 'Bg7', 'd6', 'Nf6', 'O-O', 'c6', 'b5', 'h5', 'Nfd7', 'a5'],
                beatAsBlack: ['d4', 'Nc3', 'e4', 'Be3', 'Qd2', 'f3', 'g4', 'h4', 'g5', 'O-O-O', 'Nge2', 'Na2', 'Kb1', 'Nc1'],
                playAsBlack: ['d4', 'Nc3', 'e4', 'Be3', 'Qd2', 'f3', 'g4', 'h4', 'g5', 'O-O-O'],
                beatAsWhite: ['g6', 'Bg7', 'd6', 'Nf6', 'O-O', 'c6', 'b5', 'h5', 'Nfd7', 'a5']
            }
        }
    }
});
