# Chess Opening Trainer

An interactive web application for learning and practicing chess openings.

## Project Structure

```
Chess Website/
├── index.html                    # Main HTML structure
├── styles.css                    # All styling and visual design
├── app.js                        # Game logic and UI interactions
├── openings.js                   # Opening registry (central hub)
├── openings/                     # Individual opening files
│   ├── _template.js              # Template for new openings
│   ├── modern-defense.js         # Modern Defense opening
│   ├── sicilian-defense.js       # Sicilian Defense opening
│   └── [your-opening].js         # Add new openings here
├── README.md                     # Full documentation
└── QUICK_START.md                # Quick start guide

Legacy files (can be deleted):
├── debug.html
├── test.html
└── verify_sequence.html
```

### How It Works

```
┌─────────────────────────────────────────────────────────┐
│                      index.html                         │
│  (Loads scripts in this order)                         │
└────────────────┬────────────────────────────────────────┘
                 │
                 ├─► chess.js (library)
                 │
                 ├─► openings.js (registry)
                 │        │
                 │        ├─ registerOpening() function
                 │        ├─ openings = {}
                 │        └─ computerMoves = {}
                 │
                 ├─► openings/modern-defense.js
                 │        │
                 │        └─► registerOpening({...})
                 │                 │
                 │                 └─► Registers in openings{}
                 │
                 ├─► openings/sicilian-defense.js
                 │        │
                 │        └─► registerOpening({...})
                 │                 │
                 │                 └─► Registers in openings{}
                 │
                 └─► app.js (uses openings{} and computerMoves{})
```

## How to Add a New Opening

Adding a new opening is super easy! Each opening gets its **own file**.

### Step 1: Create a new opening file

Copy the template file and customize it:

```bash
cp openings/_template.js openings/london-system.js
```

Or create a new file in the `openings/` directory (e.g., `openings/london-system.js`):

```javascript
/**
 * London System Opening
 *
 * A solid system for White characterized by d4, Bf4, and e3.
 */

registerOpening({
    id: 'london-system',
    name: 'London System',

    // Training sequences
    sequences: {
        playAsWhite: [
            { move: 'd4', instruction: "You are white. Let's play the London System. Start with d4." },
            { move: 'Bf4', instruction: "Good! Black plays d5. Now develop your bishop to f4 - the key move!" },
            { move: 'e3', instruction: "Black plays Nf6. Play e3 to support the center." },
            { move: 'Nf3', instruction: "Develop your knight to f3." },
            { move: 'Bd3', instruction: "Place your bishop on d3, aiming at the kingside." }
        ]
    },

    // Computer responses
    computerMoves: {
        playAsWhite: ['d5', 'Nf6', 'e6', 'c5']
    }
});
```

### Step 2: Add to the dropdown (index.html)

Add your opening to the dropdown menu in [index.html](index.html):

```html
<select id="opening-select" class="select-input">
    <option value="modern-defense">Modern Defense</option>
    <option value="sicilian-defense">Sicilian Defense</option>
    <option value="london-system">London System</option>  <!-- Add here -->
</select>
```

### Step 3: Load the file (index.html)

Add the script tag to load your new opening file:

```html
<!-- Individual opening definitions (add new opening files here) -->
<script src="openings/modern-defense.js"></script>
<script src="openings/sicilian-defense.js"></script>
<script src="openings/london-system.js"></script>  <!-- Add here -->
```

That's it! Your opening is now available in the app.

## Opening File Structure

### Required Fields

- `id`: Unique identifier (must match the value in the dropdown)
- `name`: Display name shown to users
- `sequences`: Object containing training sequences
- `computerMoves`: Object containing computer's responses

### Available Sequences

You can define up to 4 different training modes:

- `beatAsWhite`: User plays white to beat this opening
- `beatAsBlack`: User plays black to beat this opening
- `playAsWhite`: User plays white to learn this opening
- `playAsBlack`: User plays black to learn this opening

### Move Format

- Use Standard Algebraic Notation (SAN): `e4`, `Nf3`, `Bxf7+`, `Qf3#`, etc.
- Use `null` for instruction-only steps (no move required)
- The instruction text guides the user what to do

### Complete Example

See [openings/modern-defense.js](openings/modern-defense.js) or [openings/sicilian-defense.js](openings/sicilian-defense.js) for complete examples.

## File Descriptions

### index.html
- Contains the HTML structure for both the landing page and training page
- Includes the chess board wrapper and info panel
- Clean, semantic HTML with helpful comments

### styles.css
- Well-organized CSS with clear sections:
  - Global styles
  - Landing page styles
  - Training page layout
  - Chess board styling
  - Info panel components
  - Responsive design
- Uses CSS Grid for the chess board
- Elegant hint system with box-shadows
- Checkmate animation

### app.js
- Main game logic organized into clear sections:
  - Global state management
  - Audio functions (wooden piece sound)
  - Training setup
  - Board rendering
  - User interaction handlers
  - Visual feedback (hints, checkmate highlighting)
  - Move validation and game flow
  - UI updates
- Uses chess.js library for game rules
- Clean, well-commented code

### openings.js
- **The only file you need to edit to add new openings**
- Contains two objects:
  - `openings`: Move sequences and instructions
  - `computerMoves`: Computer's responses
- Modular design prevents changes from affecting other files

## Features

- Interactive chess board with hints
- Step-by-step instructions for each move
- Sound effects for piece movements
- Checkmate highlighting with animation
- Move history display
- Toggle hints on/off
- Multiple openings supported
- Responsive design

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- [chess.js](https://github.com/jhlywa/chess.js) - Chess game logic library
- Web Audio API - Realistic wooden piece sounds

## Browser Compatibility

Works in all modern browsers that support:
- CSS Grid
- ES6 JavaScript
- Web Audio API

## License

This project is open source and available for educational purposes.
