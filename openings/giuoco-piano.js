/**
 * Giuoco Piano Opening
 *
 * An Italian opening meaning "Quiet Game" characterized by 1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5,
 * leading to strategic battles for central control.
 */

registerOpening({
    id: 'giuoco-piano',
    name: 'Giuoco Piano',

    variations: {
        'panos': {
            name: 'Panos',

            sequences: {
                beatAsBlack: [
                    { move: null, instruction: "You are black. Let's learn how to beat the Giuoco Piano with the Panos variation. Wait for white's first move." },
                    { move: 'e5', instruction: "White plays e4. Respond with e5 - standard opening!" },
                    { move: 'Nc6', instruction: "Good! White plays Nf3. Play Nc6 to fight for the center." },
                    { move: 'Bc5', instruction: "Excellent! White plays Bc4. Mirror with Bc5, targeting f2!" },
                    { move: 'Nf6', instruction: "Well done! White plays c3. Play Nf6 to attack e4 immediately!" },
                    { move: 'd6', instruction: "Great! White plays d3. Play d6 - this is KEY! It stops d4 from being strong and prepares a perfect structure." },
                    { move: 'O-O', instruction: "Perfect! White castles kingside. Castle kingside for safety!" },
                    { move: 'a6', instruction: "Excellent! White plays Re1. Play a6 to stop Bb5+ and prepare b5!" },
                    { move: 'Ba7', instruction: "Good! White plays a4. Retreat your bishop to a7 - it stays alive and becomes very powerful later!" },
                    { move: 'Be6', instruction: "Well done! White plays Nbd2. Play Be6 to trade off White's best piece (the bishop on c4)!" },
                    { move: 'fxe6', instruction: "Great! White plays Bxe6. Recapture with fxe6! This opens the f-file for your rook and strengthens your center!" }
                ]
            },

            computerMoves: {
                beatAsBlack: ['e4', 'Nf3', 'Bc4', 'c3', 'd3', 'O-O', 'Re1', 'a4', 'Nbd2', 'Bxe6']
            }
        }
    }
});
