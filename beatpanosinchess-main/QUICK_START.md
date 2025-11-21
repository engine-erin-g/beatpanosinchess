# Quick Start Guide: Adding a New Opening

## 3 Simple Steps

### 1. Create Your Opening File

Copy the template:
```bash
cd "Chess Website"
cp openings/_template.js openings/YOUR-OPENING-NAME.js
```

Edit the file and fill in:
- `id`: Unique identifier (e.g., `'london-system'`)
- `name`: Display name (e.g., `'London System'`)
- `sequences`: Your move sequences
- `computerMoves`: Computer's responses

### 2. Add to Dropdown

In `index.html`, add your opening to the select menu (around line 27):

```html
<option value="YOUR-OPENING-NAME">Your Opening Display Name</option>
```

### 3. Load the Script

In `index.html`, add the script tag (around line 88):

```html
<script src="openings/YOUR-OPENING-NAME.js"></script>
```

## That's It!

Refresh the page and your opening will be available.

## Example

Let's add the London System:

**1. Create file:** `openings/london-system.js`

```javascript
registerOpening({
    id: 'london-system',
    name: 'London System',
    sequences: {
        playAsWhite: [
            { move: 'd4', instruction: "Start with d4." },
            { move: 'Bf4', instruction: "Develop bishop to f4." }
        ]
    },
    computerMoves: {
        playAsWhite: ['d5', 'Nf6']
    }
});
```

**2. Add to dropdown:**
```html
<option value="london-system">London System</option>
```

**3. Load script:**
```html
<script src="openings/london-system.js"></script>
```

Done! 🎉

## Need Help?

- See `openings/_template.js` for a full template with comments
- See `openings/modern-defense.js` for a complete example
- See `README.md` for detailed documentation
