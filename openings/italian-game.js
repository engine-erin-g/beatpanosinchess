/**
 * Italian Game Opening
 *
 * One of the oldest recorded chess openings, the Italian Game begins with 1.e4 e5 2.Nf3 Nc6 3.Bc4.
 * White develops quickly and aims to control the center while preparing to castle.
 */

registerOpening({
    id: 'italian-game',
    name: 'Italian Game',

    // Variations (alphabetically ordered A→Z)
    variations: {
        'd6-Nf6-e5-Nbd7': {
            name: 'd6-Nf6-e5-Nbd7',

            sequences: {
                playAsWhite: [
                    { move: 'e4', instruction: "Classic Italian" },
                    { move: 'd4', instruction: "Control center" },
                    { move: 'Nc3', instruction: "Protect while developing Knights" },
                    { move: 'Nf3', instruction: "Protect while developing Knights" },
                    { move: 'Bc4', instruction: "Middle game principles: (1)Control the center (2)Develop all pieces quickly (3)Castle (4)Connect rooks (5)Rooks on open files (6)Avoid same piece twice (7)Improve your worst-placed piece (8)Restrict opponents best pieces." }
                ]
            },

            computerMoves: {
                playAsWhite: ['d6', 'Nf6', 'e5', 'Nbd7']
            }
        },

        'e5-d6-exd4-Nf6-Be7-O-O': {
            name: 'e5-d6-exd4-Nf6-Be7-O-O',

            sequences: {
                playAsWhite: [
                    { move: 'e4', instruction: "You are white. Let's learn the Italian Game. Start with e4, controlling the center." },
                    { move: 'Nf3', instruction: "Good! Black plays e5. Develop your knight to f3, attacking the black pawn." },
                    { move: 'd4', instruction: "Excellent! Black plays d6. Play d4 to create a double attack on the e5 pawn!" },
                    { move: 'Nxd4', instruction: "Well done! Black captures exd4. Recapture with your knight Nxd4." },
                    { move: 'Nc3', instruction: "Great! Black plays Nf6. Defend your e4 pawn with Nc3!" },
                    { move: 'Bc4', instruction: "Perfect! Black plays Be7. Develop your bishop to c4, aiming at f7!" },
                    { move: 'O-O', instruction: "Excellent! Black castles. Castle kingside. White has a much better position!" }
                ]
            },

            computerMoves: {
                playAsWhite: ['e5', 'd6', 'exd4', 'Nf6', 'Be7', 'O-O']
            }
        },

        'e5-d6-Nc6-Nd4-exd4-Nf6-c6-bxc6-Bd7': {
            name: 'e5-d6-Nc6-Nd4-exd4-Nf6-c6-bxc6-Bd7',

            sequences: {
                playAsWhite: [
                    { move: 'e4', instruction: "Classic Italian" },
                    { move: 'Nf3', instruction: "Still classic italian" },
                    { move: 'd4', instruction: "Still classic italian" },
                    { move: 'd5', instruction: "Attack the black knight" },
                    { move: 'Nxd4', instruction: "Get that Knight" },
                    { move: 'Qxd4', instruction: "Get the pawn" },
                    { move: 'Bb5+', instruction: "Pin the knight and pressure the queenside!" },
                    { move: 'dxc6', instruction: "Ready for the fork - check the king!" },
                    { move: 'Bxc6+', instruction: "Capture the knight with the pawn" },
                    { move: 'Bxa8', instruction: "Take the rook! Now develop the Knight and the Bishop" }
                ]
            },

            computerMoves: {
                playAsWhite: ['e5', 'd6', 'Nc6', 'Nd4', 'exd4', 'Nf6', 'c6', 'bxc6', 'Bd7']
            }
        },

        'e5-Nc6-Bc5-exd4-Bb4': {
            name: 'e5-Nc6-Bc5-exd4-Bb4',

            sequences: {
                playAsWhite: [
                    { move: 'e4', instruction: "Classic Italian" },
                    { move: 'Nf3', instruction: "Still classic italian" },
                    { move: 'Bc4', instruction: "Bishop c4 to pressure the king e7" },
                    { move: 'c3', instruction: "Perfect! Black plays Bc5. Play c3 to prepare for the center push!" },
                    { move: 'd4', instruction: "Great! Black plays d6. Push d4 to open up the center!" },
                    { move: 'cxd4', instruction: "Well done! Black captures exd4. Recapture with your c-pawn cxd4!" },
                    { move: 'Nc3', instruction: "Excellent! Black plays Bb4. Develop your knight to c3. White has a fair advantage!" }
                ]
            },

            computerMoves: {
                playAsWhite: ['e5', 'Nc6', 'Bc5', 'd6', 'exd4', 'Bb4']
            }
        },

        'e5-Nc6-Nf6-d5-Nxd5-Nxf7-Ke6': {
            name: 'e5-Nc6-Nf6-d5-Nxd5-Nxf7-Ke6',

            sequences: {
                playAsWhite: [
                    { move: 'e4', instruction: "You are white. Let's learn the Italian Game. Start with e4, controlling the center." },
                    { move: 'Nf3', instruction: "Good! Black plays e5. Develop your knight to f3." },
                    { move: 'Bc4', instruction: "Excellent! Black plays Nc6. Develop your bishop to c4, targeting f7!" },
                    { move: 'Ng5', instruction: "Perfect! Black plays Nf6. Attack f7 with Ng5!" },
                    { move: 'exd5', instruction: "Great! Black plays d5. Capture exd5!" },
                    { move: 'Nxf7', instruction: "Well done! Black captures Nxd5. Sacrifice your knight with Nxf7!" },
                    { move: 'Qf3+', instruction: "Excellent! Black's king takes Kxf7. Play Qf3+ to give check!" },
                    { move: 'Nc3', instruction: "Perfect! Black retreats Ke6. Develop your knight to c3 with a strong attack!" }
                ]
            },

            computerMoves: {
                playAsWhite: ['e5', 'Nc6', 'Nf6', 'd5', 'Nxd5', 'Kxf7', 'Ke6']
            }
        },

        'e5-Nc6-Nf6-b5-Ke7-d5-Nd4-Ke8-Nxb3': {
            name: 'e5-Nc6-Nf6-b5-Ke7-d5-Nd4-Ke8-Nxb3',

            sequences: {
                playAsWhite: [
                    { move: 'e4', instruction: "You are white. Let's learn the Fried Liver Attack! Start with e4." },
                    { move: 'Nf3', instruction: "Good! Black plays e5. Develop your knight to f3." },
                    { move: 'Bc4', instruction: "Excellent! Black plays Nc6. Develop your bishop to c4, targeting f7!" },
                    { move: 'Ng5', instruction: "Perfect! Black plays Nf6. Attack f7 with Ng5, threatening the weak square!" },
                    { move: 'Bxf7+', instruction: "Great! Black plays b5 (or anything except d5). Sacrifice the bishop with Bxf7+!" },
                    { move: 'Bb3', instruction: "Well done! Black plays Ke7. Retreat the bishop to b3, maintaining pressure!" },
                    { move: 'Nc3', instruction: "Excellent! Black plays d5. Develop your knight to c3, supporting the center!" },
                    { move: 'Nxd5+', instruction: "Perfect! Black plays Nd4. Capture with Nxd5+, giving check!" },
                    { move: 'Nxe3', instruction: "Great! Black plays Ke8. Capture the knight with Nxe3! White has won material!" }
                ]
            },

            computerMoves: {
                playAsWhite: ['e5', 'Nc6', 'Nf6', 'b5', 'Ke7', 'd5', 'Nd4', 'Ke8', 'Nxb3']
            }
        },

        'e5-Nf6-d6-Nxe4': {
            name: 'e5-Nf6-d6-Nxe4',

            sequences: {
                playAsWhite: [
                    { move: 'e4', instruction: "You are white. Let's learn the Petrov Defense variation. Start with e4." },
                    { move: 'Nf3', instruction: "Good! Black plays e5. Develop your knight to f3." },
                    { move: 'Nxe5', instruction: "Excellent! Black plays Nf6. Capture the pawn with Nxe5!" },
                    { move: 'Nf3', instruction: "Perfect! Black plays d6, attacking your knight. Retreat to Nf3!" },
                    { move: 'd4', instruction: "Great! Black plays Nxe4. Play d4 to control the center and develop!" }
                ]
            },

            computerMoves: {
                playAsWhite: ['e5', 'Nf6', 'd6', 'Nxe4']
            }
        },

        'e5-Nf6-Nc6-bxc6': {
            name: 'e5-Nf6-Nc6-bxc6',

            sequences: {
                playAsWhite: [
                    { move: 'e4', instruction: "You are white. Let's learn the Petrov Defense response. Start with e4." },
                    { move: 'Nf3', instruction: "Good! Black plays e5. Develop your knight to f3." },
                    { move: 'Nxe5', instruction: "Excellent! Black plays Nf6 (Petrov Defense). Capture the pawn with Nxe5!" },
                    { move: 'Nxc6', instruction: "Perfect! Black plays Nc6, attacking your knight. Capture with Nxc6!" },
                    { move: 'Nc3', instruction: "Great! Black recaptures dxc6. Develop your knight to c3. You've won a pawn!" }
                ]
            },

            computerMoves: {
                playAsWhite: ['e5', 'Nf6', 'Nc6', 'bxc6']
            }
        },

        'e5-Nf6-Nxe4-Qe7': {
            name: 'e5-Nf6-Nxe4-Qe7',

            sequences: {
                playAsWhite: [
                    { move: 'e4', instruction: "You are white. Let's learn the Petrov Defense. Start with e4." },
                    { move: 'Nf3', instruction: "Good! Black plays e5. Develop your knight to f3." },
                    { move: 'Nxe5', instruction: "Excellent! Black plays Nf6 (Petrov Defense). Capture the pawn with Nxe5!" },
                    { move: 'Qe2', instruction: "Perfect! Black plays Nxe4, attacking your knight. Play Qe2 to pin the knight!" },
                    { move: 'Qxe4', instruction: "Great! Black plays Qe7. Capture the knight with Qxe4! You've won the knight!" }
                ]
            },

            computerMoves: {
                playAsWhite: ['e5', 'Nf6', 'Nxe4', 'Qe7']
            }
        },

        'e5-Nf6-Qe7-Nc6-Nxe5-Qxe5': {
            name: 'e5-Nf6-Qe7-Nc6-Nxe5-Qxe5',

            sequences: {
                playAsWhite: [
                    { move: 'e4', instruction: "You are white. Let's learn the Petrov Defense. Start with e4." },
                    { move: 'Nf3', instruction: "Good! Black plays e5. Develop your knight to f3." },
                    { move: 'Nxe5', instruction: "Excellent! Black plays Nf6. Capture the pawn with Nxe5!" },
                    { move: 'd4', instruction: "Perfect! Black plays Qe7, pinning your knight. Play d4 to support your knight and control the center!" },
                    { move: 'Nc3', instruction: "Great! Black plays Nc6. Develop your knight to c3!" },
                    { move: 'dxe5', instruction: "Well done! Black captures Nxe5. Recapture with dxe5!" },
                    { move: 'f4', instruction: "Excellent! Black plays Qxe5. Attack the queen with f4! White has a strong center!" }
                ]
            },

            computerMoves: {
                playAsWhite: ['e5', 'Nf6', 'Qe7', 'Nc6', 'Nxe5', 'Qxe5']
            }
        },

        'g6-Bg7-d6-Kd7-Kxf7-Kf8': {
            name: 'g6-Bg7-d6-Nd7-Kxf7-Kf8',

            sequences: {
                playAsWhite: [
                    { move: 'e4', instruction: "Italian game!" },
                    { move: 'd4', instruction: "He played g6? --> Modern defense!" },
                    { move: 'Nf3', instruction: "Excellent! Black plays Bg7. Develop your knight to f3!" },
                    { move: 'Bc4', instruction: "Perfect! Black plays d6. Develop your bishop to c4, targeting f7!" },
                    { move: 'Bxf7+', instruction: "Sacrifice your bishop with And ruin their plan" },
                    { move: 'Ng5+', instruction: "Well done! Black captures Kxf7. Play Ng5+ to give check!" },
                    { move: 'Ne6', instruction: "Excellent! Black retreats Kf8. Fork the queen with Ne6! White wins the queen!" }
                ]
            },

            computerMoves: {
                playAsWhite: ['g6', 'Bg7', 'd6', 'Nd7', 'Kxf7', 'Kf8']
            }
        },

        'Nf6-Nd5-d6-Nb6': {
            name: 'Nf6-Nd5-d6-Nb6-dxe5-Bf5',

            sequences: {
                playAsWhite: [
                    { move: 'e4', instruction: "You are white. Start with e4 in this Italian Game variation." },
                    { move: 'e5', instruction: "Good! Black plays Nf6. Push e5 to attack the knight!" },
                    { move: 'd4', instruction: "Perfect! Black retreats Nd5. Play d4 to control the center!" },
                    { move: 'c4', instruction: "Excellent! Black plays d6. Play c4 to attack the knight on d5!" },
                    { move: 'f4', instruction: "Well done! Black retreats Nb6. Push f4 to strengthen the center!" },
                    { move: 'fxe5', instruction: "Great! Black captures dxe5. Recapture with fxe5!" },
                    { move: 'Nf3', instruction: "Excellent! Black plays Bf5. Develop your knight to f3. White has a strong central position!" }
                ]
            },

            computerMoves: {
                playAsWhite: ['Nf6', 'Nd5', 'd6', 'Nb6', 'dxe5', 'Bf5']
            }
        }
    }
});
