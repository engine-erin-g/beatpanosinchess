# Changelog

## Version 2.0 - Modular Architecture (2024-11-17)

### Major Changes

✨ **Each opening now has its own file!**

Instead of one large `openings.js` file, openings are now modular:
- Each opening lives in `openings/[opening-name].js`
- Easy to add, remove, or modify openings without affecting others
- Cleaner, more maintainable code structure

### New Files

- `openings.js` - Now a registry system with `registerOpening()` function
- `openings/_template.js` - Template for creating new openings
- `openings/modern-defense.js` - Modern Defense opening (migrated)
- `openings/sicilian-defense.js` - Sicilian Defense opening (migrated)
- `QUICK_START.md` - Quick guide for adding new openings
- `CHANGELOG.md` - This file

### File Structure Changes

**Before:**
```
Chess Website/
├── index.html
├── styles.css
├── app.js
├── openings.js (all openings in one file)
└── README.md
```

**After:**
```
Chess Website/
├── index.html
├── styles.css
├── app.js
├── openings.js (registry)
├── openings/
│   ├── _template.js
│   ├── modern-defense.js
│   └── sicilian-defense.js
├── README.md
├── QUICK_START.md
└── CHANGELOG.md
```

### Code Improvements

**app.js:**
- Added clear section headers for better organization
- Renamed `playPawnMoveSound()` to `playMoveSound()`
- Extracted magic numbers into constants
- Added JSDoc comments

**styles.css:**
- Added section comments for better organization
- Grouped related styles together

**index.html:**
- Added comments for script loading order
- Added section headers for HTML structure

### How to Migrate Existing Openings

If you had custom openings in the old `openings.js`, migrate them like this:

**Old format:**
```javascript
'my-opening': {
    name: 'My Opening',
    beatAsWhite: [...],
    playAsBlack: [...]
}
```

**New format (in `openings/my-opening.js`):**
```javascript
registerOpening({
    id: 'my-opening',
    name: 'My Opening',
    sequences: {
        beatAsWhite: [...],
        playAsBlack: [...]
    },
    computerMoves: {
        beatAsWhite: [...],
        playAsBlack: [...]
    }
});
```

### Benefits

1. **Easier to manage** - Each opening is isolated
2. **Better for collaboration** - No merge conflicts
3. **Cleaner code** - Smaller, focused files
4. **Easy to add/remove** - Just add/remove a file
5. **Better organization** - Clear structure

### Backward Compatibility

⚠️ This is a breaking change. The old `openings.js` format is no longer supported. You must migrate to the new modular system.

---

## Version 1.0 - Initial Release

### Features

- Interactive chess board with hints
- Step-by-step opening training
- Sound effects for moves
- Checkmate highlighting
- Multiple opening support
- Modern Defense sequence
- Sicilian Defense sequence
