/**
 * London System Opening
 *
 * A solid, strategic opening system for White characterized by d4, Nf3, and Bf4,
 * aiming for a solid pawn structure and flexible piece development.
 */

registerOpening({
    id: 'london-system',
    name: 'London System',

    variations: {
        'aggressive-kingside-attack': {
            name: 'Aggressive Kingside Attack',

            sequences: {
                playAsWhite: [
                    { move: 'd4', instruction: "You are white. Let's learn the London System Aggressive Kingside Attack. Start with d4." },
                    { move: 'Nf3', instruction: "Good! Black plays d5. Develop your knight to f3." },
                    { move: 'Bf4', instruction: "Excellent! Black plays Nf6. Play Bf4 - the characteristic London System move!" },
                    { move: 'e3', instruction: "Well done! Black plays e6. Play e3 to support the center and prepare Bd3." },
                    { move: 'Bg3', instruction: "Great! Black plays Bd6. Retreat your bishop to g3 after the exchange offer." },
                    { move: 'Nbd2', instruction: "Perfect! Black castles kingside. Develop your knight to d2." },
                    { move: 'c3', instruction: "Excellent! Black plays c5. Play c3 to support your center with the pawn chain." },
                    { move: 'Bd3', instruction: "Good! Black plays Nc6. Develop your bishop to d3, completing your setup." },
                    { move: 'Ne5', instruction: "Well done! Black plays Re8. Jump your knight to e5, the key attacking square!" },
                    { move: 'f4', instruction: "Great! Black plays Qc7. Launch the kingside attack with f4!" },
                    { move: 'Qf3', instruction: "Perfect! Black plays Ne7. Bring your queen to f3, eyeing the kingside!" },
                    { move: 'g4', instruction: "Excellent! Black plays b6. Start the pawn storm with g4!" },
                    { move: 'g5', instruction: "Good! Black plays Bb7. Push g5 to drive away the knight and open lines!" },
                    { move: 'h4', instruction: "Well done! Black plays Nd7. Continue with h4, preparing h5!" },
                    { move: 'h5', instruction: "Great! Black plays Nf5. Push h5 to further advance your attack!" },
                    { move: 'fxe5', instruction: "Perfect! Black plays Bxe5. Capture with fxe5 after the bishop trade!" },
                    { move: 'Qxg3', instruction: "Excellent! Black plays Nxg3. Recapture with the queen, maintaining the attack!" }
                ]
            },

            computerMoves: {
                playAsWhite: ['d5', 'Nf6', 'e6', 'Bd6', 'O-O', 'c5', 'Nc6', 'Re8', 'Qc7', 'Ne7', 'b6', 'Bb7', 'Nd7', 'Nf5', 'Bxe5', 'Nxg3', 'Nf8']
            }
        },

        'positional-squeeze': {
            name: 'Positional Squeeze',

            sequences: {
                playAsWhite: [
                    { move: 'd4', instruction: "You are white. Let's learn the London System Positional Squeeze. Start with d4." },
                    { move: 'Nf3', instruction: "Good! Black plays d5. Develop your knight to f3." },
                    { move: 'Bf4', instruction: "Excellent! Black plays Nf6. Play Bf4 - the London System bishop!" },
                    { move: 'e3', instruction: "Well done! Black plays e6. Play e3 to support the center." },
                    { move: 'c3', instruction: "Great! Black plays c5. Play c3 to build a solid pawn structure." },
                    { move: 'Nbd2', instruction: "Perfect! Black plays Nc6. Develop your knight to d2." },
                    { move: 'Bd3', instruction: "Excellent! Black plays Be7. Develop your bishop to d3, completing your setup." },
                    { move: 'O-O', instruction: "Good! Black castles kingside. Castle kingside for safety." },
                    { move: 'Qe2', instruction: "Well done! Black plays b6. Play Qe2, connecting the rooks and preparing central play." },
                    { move: 'h3', instruction: "Great! Black plays Bb7. Play h3 to prevent pin with Bg4 and give your king luft." },
                    { move: 'Rad1', instruction: "Perfect! Black plays Rc8. Activate your rook on d1, controlling the center!" },
                    { move: 'Rfe1', instruction: "Excellent! Black plays Re8. Double your rooks on central files with Rfe1!" },
                    { move: 'Ne5', instruction: "Good! Black plays h6. Jump your knight to the strong e5 outpost!" },
                    { move: 'Bxe5', instruction: "Well done! Black plays Nxe5. Capture with your bishop after the knight trade!" },
                    { move: 'Bg3', instruction: "Great! Black plays Nd7. Retreat your bishop to g3, maintaining the diagonal." },
                    { move: 'a3', instruction: "Perfect! Black plays Bf8. Play a3 to prepare queenside expansion!" },
                    { move: 'dxe5', instruction: "Excellent! Black plays e5. Capture in the center with dxe5!" },
                    { move: 'Bc2', instruction: "Good! Black plays Nxe5. Reposition your bishop to c2, eyeing h7!" },
                    { move: 'Ba4', instruction: "Well done! Black plays Qe7. Play Ba4 to apply pressure on the queenside!" }
                ]
            },

            computerMoves: {
                playAsWhite: ['d5', 'Nf6', 'e6', 'c5', 'Nc6', 'Be7', 'O-O', 'b6', 'Bb7', 'Rc8', 'Re8', 'h6', 'Nxe5', 'Nd7', 'Bf8', 'e5', 'Nxe5', 'Qe7', 'Red8']
            }
        }
    }
});
