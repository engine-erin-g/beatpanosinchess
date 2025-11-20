/**
 * [Opening Name] Opening
 *
 * Brief description of the opening and its characteristics.
 */

registerOpening({
    // Unique ID (use lowercase with dashes, e.g., 'queens-gambit')
    id: 'your-opening-id',

    // Display name shown to users
    name: 'Your Opening Name',

    // Training sequences
    sequences: {
        // User plays WHITE and wants to BEAT this opening
        beatAsWhite: [
            { move: 'e4', instruction: "You are white. Let's learn how to beat [Opening Name]. Start with e4." },
            { move: 'd4', instruction: "Good! Black plays [move]. Now play d4..." },
            // Add more moves...
        ],

        // User plays BLACK and wants to BEAT this opening
        // beatAsBlack: [
        //     { move: null, instruction: "You are black. Wait for white's first move." },
        //     { move: 'e5', instruction: "White plays e4. Respond with e5..." },
        //     // Add more moves...
        // ],

        // User plays WHITE and wants to PLAY this opening
        // playAsWhite: [
        //     { move: 'd4', instruction: "You are white. Let's play [Opening Name]. Start with d4." },
        //     { move: 'c4', instruction: "Black plays d5. Continue with c4..." },
        //     // Add more moves...
        // ],

        // User plays BLACK and wants to PLAY this opening
        playAsBlack: [
            { move: null, instruction: "You are black. Let's learn to play [Opening Name]. Wait for white's first move." },
            { move: 'e5', instruction: "White plays e4. Respond with e5..." },
            // Add more moves...
        ]
    },

    // Computer responses (what the computer plays in response to user moves)
    computerMoves: {
        // Computer's moves when user is beating as white
        beatAsWhite: ['e5', 'Nc6', 'Nf6', /* ... */],

        // Computer's moves when user is beating as black
        // beatAsBlack: ['e4', 'd4', 'Nf3', /* ... */],

        // Computer's moves when user is playing as white
        // playAsWhite: ['d5', 'Nf6', 'e6', /* ... */],

        // Computer's moves when user is playing as black
        playAsBlack: ['e4', 'd4', 'Nf3', /* ... */]
    }
});

/*
USAGE INSTRUCTIONS:

1. Copy this template to create a new opening file
2. Replace placeholder text with your opening details
3. Define at least one sequence (beatAsWhite, beatAsBlack, playAsWhite, or playAsBlack)
4. Add corresponding computer moves
5. Add the opening to index.html dropdown
6. Load the script in index.html

MOVE FORMAT:
- Use Standard Algebraic Notation: e4, Nf3, Bxf7+, O-O, Qf3#
- Use null for instruction-only steps
- Instructions should be clear and educational

EXAMPLE:
See openings/modern-defense.js or openings/sicilian-defense.js
*/
