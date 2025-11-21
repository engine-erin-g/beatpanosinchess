/**
 * Opening Registry
 *
 * This file acts as a central registry for all chess openings.
 * Individual openings are defined in separate files in the openings/ directory.
 *
 * To add a new opening:
 * 1. Create a new file in openings/ (e.g., openings/your-opening.js)
 * 2. Use registerOpening() to register your opening
 * 3. Load the file in index.html
 */

// Global registry storage
const openings = {};
const computerMoves = {};
const openingRegistry = {}; // Stores opening metadata and variations

/**
 * Register a new opening with variations
 * @param {Object} opening - Opening configuration object
 * @param {string} opening.id - Unique identifier (e.g., 'modern-defense')
 * @param {string} opening.name - Display name (e.g., 'Modern Defense')
 * @param {Object} opening.variations - Variations of the opening
 */
function registerOpening(opening) {
    // Validate opening structure
    if (!opening.id || !opening.name) {
        console.error('Opening must have an id and name', opening);
        return;
    }

    if (!opening.variations) {
        console.error('Opening must have variations', opening);
        return;
    }

    // Store opening metadata
    openingRegistry[opening.id] = {
        name: opening.name,
        variations: {}
    };

    // Register each variation
    for (const [variationId, variation] of Object.entries(opening.variations)) {
        const fullId = `${opening.id}:${variationId}`;

        // Store variation metadata
        openingRegistry[opening.id].variations[variationId] = {
            name: variation.name
        };

        // Register sequences
        openings[fullId] = {
            name: opening.name,
            variationName: variation.name,
            ...variation.sequences
        };

        // Register computer moves
        if (variation.computerMoves) {
            computerMoves[fullId] = variation.computerMoves;
        }

        console.log(`✓ Registered: ${opening.name} - ${variation.name}`);
    }
}

/**
 * Get all variations for a specific opening
 * @param {string} openingId - The opening ID
 * @returns {Object} Object with variation IDs as keys and names as values
 */
function getVariationsForOpening(openingId) {
    const opening = openingRegistry[openingId];
    if (!opening) return {};
    return opening.variations;
}
