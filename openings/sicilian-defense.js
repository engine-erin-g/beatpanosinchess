/**
 * Sicilian Defense Opening
 *
 * The most popular response to 1.e4, characterized by 1...c5.
 * Black fights for the center with pawns and prepares counterplay on the queenside.
 */

registerOpening({
    id: 'sicilian-defense',
    name: 'Sicilian Defense',

    variations: {
        'open-sicilian': {
            name: 'Open Sicilian',

            sequences: {
                beatAsWhite: [
                    { move: 'e4', instruction: "You are white. Let's beat the Sicilian Defense. Start with e4." },
                    { move: 'Nf3', instruction: "Black plays c5 (Sicilian Defense). Play Nf3 to prepare d4." },
                    { move: 'd4', instruction: "Black takes cxd4. Now capture with Nxd4." },
                    { move: 'Nxd4', instruction: "Good! Black plays Nf6. Develop with Nc3." },
                    { move: 'Nc3', instruction: "Excellent! You have a strong center and better development." }
                ],

                playAsBlack: [
                    { move: null, instruction: "You are black. Let's play the Sicilian Defense. Wait for white." },
                    { move: 'c5', instruction: "White plays e4. Respond with c5 - the Sicilian Defense!" },
                    { move: 'd6', instruction: "White plays Nf3. Play d6 for a solid Najdorf setup." },
                    { move: 'cxd4', instruction: "White plays d4. Capture with cxd4." },
                    { move: 'Nf6', instruction: "White recaptures Nxd4. Develop with Nf6." }
                ]
            },

            computerMoves: {
                beatAsWhite: ['c5', 'cxd4', 'Nf6', 'd6'],
                playAsBlack: ['e4', 'Nf3', 'd4', 'Nxd4']
            }
        }
    }
});
