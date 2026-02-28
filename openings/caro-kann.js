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
                    { move: null },
                    { move: 'c6' },
                    { move: 'd5' },
                    { move: 'd4' },
                    { move: 'e5' }
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
                    { move: null },
                    { move: 'd5' },
                    { move: 'e5' },
                    { move: 'Nc6' },
                    { move: 'Qxd5' }
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
                    { move: null },
                    { move: 'c6' },
                    { move: 'd5' },
                    { move: 'cxd5' },
                    { move: 'e5' }
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
                    { move: null },
                    { move: 'c6' },
                    { move: 'd5' },
                    { move: 'c5' },
                    { move: 'Nc6' },
                    { move: 'Bg4' },
                    { move: 'e6' },
                    { move: 'Bxc5' }
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
                    { move: null },
                    { move: 'c6' },
                    { move: 'd5' },
                    { move: 'c5' },
                    { move: 'Nc6' },
                    { move: 'e6' },
                    { move: 'Bxc5' },
                    { move: 'Qb6' },
                    { move: 'Bxf2+' },
                    { move: 'Qxb5' }
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
                    { move: null },
                    { move: 'c6' },
                    { move: 'd5' },
                    { move: 'Bg4' },
                    { move: 'e6' }
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
                    { move: null },
                    { move: 'c6' },
                    { move: 'Nf6' },
                    { move: 'e5' },
                    { move: 'd6' },
                    { move: 'dxe5' },
                    { move: 'Be7' },
                    { move: 'O-O' },
                    { move: 'b5' }
                ]
            },

            computerMoves: {
                playAsBlack: ['e4', 'Qh5', 'Qh4', 'f4', 'fxe5', 'Nf3', 'Qg3', 'Nc3']
            }
        },

        'e4-d4-Nc3-Nxe4': {
            name: 'e4-d4-Nc3-Nxe4',

            sequences: {
                playAsBlack: [
                    { move: null },
                    { move: 'c6' },
                    { move: 'd5' },
                    { move: 'dxe4' },
                    { move: 'Bf5' }
                ]
            },

            computerMoves: {
                playAsBlack: ['e4', 'd4', 'Nc3', 'Nxe4']
            }
        },

        'e4-e5-exd6': {
            name: 'e4-e5-exd6',

            sequences: {
                playAsBlack: [
                    { move: null },
                    { move: 'c6' },
                    { move: 'd6' },
                    { move: 'exd6' }
                ]
            },

            computerMoves: {
                playAsBlack: ['e4', 'e5', 'exd6']
            }
        },

        'e4-f4-e5-d4-Nc3': {
            name: 'e4-f4-e5-d4-Nc3',

            sequences: {
                playAsBlack: [
                    { move: null },
                    { move: 'c6' },
                    { move: 'd5' },
                    { move: 'Bf5' },
                    { move: 'e6' },
                    { move: 'c5' }
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
                    { move: null },
                    { move: 'c6' },
                    { move: 'Nf6' },
                    { move: 'e5' },
                    { move: 'd5' },
                    { move: 'cxd5' },
                    { move: 'Nc6' },
                    { move: 'Bc5' },
                    { move: 'O-O' }
                ]
            },

            computerMoves: {
                playAsBlack: ['e4', 'Qh5', 'Qf3', 'Bc4', 'exd5', 'Bb3', 'd3', 'Qe1']
            }
        }
    }
});
