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
                    { move: 'e4' },
                    { move: 'd4' },
                    { move: 'Nc3' },
                    { move: 'Nf3' },
                    { move: 'Bc4' }
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
                    { move: 'e4' },
                    { move: 'Nf3' },
                    { move: 'd4' },
                    { move: 'Nxd4' },
                    { move: 'Nc3' },
                    { move: 'Bc4' },
                    { move: 'O-O' }
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
                    { move: 'e4' },
                    { move: 'Nf3' },
                    { move: 'd4' },
                    { move: 'd5' },
                    { move: 'Nxd4' },
                    { move: 'Qxd4' },
                    { move: 'Bb5+' },
                    { move: 'dxc6' },
                    { move: 'Bxc6+' },
                    { move: 'Bxa8' }
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
                    { move: 'e4' },
                    { move: 'Nf3' },
                    { move: 'Bc4' },
                    { move: 'c3' },
                    { move: 'd4' },
                    { move: 'cxd4' },
                    { move: 'Nc3' }
                ]
            },

            computerMoves: {
                playAsWhite: ['e5', 'Nc6', 'Bc5', 'd6', 'exd4', 'Bb4']
            }
        },

        'e5-Nc6-f5-exd4-d6-cxd6': {
            name: 'e5-Nc6-f5-exd4-d6-cxd6',

            sequences: {
                playAsWhite: [
                    { move: 'e4' },
                    { move: 'Nf3' },
                    { move: 'Bc4' },
                    { move: 'd4' },
                    { move: 'e5' },
                    { move: 'exd6' },
                    { move: 'O-O' }
                ]
            },

            computerMoves: {
                playAsWhite: ['e5', 'Nc6', 'f5', 'exd4', 'd6', 'cxd6']
            }
        },

        'e5-Nc6-Nf6-d5-Nxd5-Nxf7-Ke6': {
            name: 'e5-Nc6-Nf6-d5-Nxd5-Nxf7-Ke6',

            sequences: {
                playAsWhite: [
                    { move: 'e4' },
                    { move: 'Nf3' },
                    { move: 'Bc4' },
                    { move: 'Ng5' },
                    { move: 'exd5' },
                    { move: 'Nxf7' },
                    { move: 'Qf3+' },
                    { move: 'Nc3' }
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
                    { move: 'e4' },
                    { move: 'Nf3' },
                    { move: 'Bc4' },
                    { move: 'Ng5' },
                    { move: 'Bxf7+' },
                    { move: 'Bb3' },
                    { move: 'Nc3' },
                    { move: 'Nxd5+' },
                    { move: 'Nxe3' }
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
                    { move: 'e4' },
                    { move: 'Nf3' },
                    { move: 'Nxe5' },
                    { move: 'Nf3' },
                    { move: 'd4' }
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
                    { move: 'e4' },
                    { move: 'Nf3' },
                    { move: 'Nxe5' },
                    { move: 'Nxc6' },
                    { move: 'Nc3' }
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
                    { move: 'e4' },
                    { move: 'Nf3' },
                    { move: 'Nxe5' },
                    { move: 'Qe2' },
                    { move: 'Qxe4' }
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
                    { move: 'e4' },
                    { move: 'Nf3' },
                    { move: 'Nxe5' },
                    { move: 'd4' },
                    { move: 'Nc3' },
                    { move: 'dxe5' },
                    { move: 'f4' }
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
                    { move: 'e4' },
                    { move: 'd4' },
                    { move: 'Nf3' },
                    { move: 'Bc4' },
                    { move: 'Bxf7+' },
                    { move: 'Ng5+' },
                    { move: 'Ne6' }
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
                    { move: 'e4' },
                    { move: 'e5' },
                    { move: 'd4' },
                    { move: 'c4' },
                    { move: 'f4' },
                    { move: 'fxe5' },
                    { move: 'Nf3' }
                ]
            },

            computerMoves: {
                playAsWhite: ['Nf6', 'Nd5', 'd6', 'Nb6', 'dxe5', 'Bf5']
            }
        }
    }
});
