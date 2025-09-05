# @jojech/game-core

A TypeScript library providing core game components including cards, decks, and dice for tabletop and digital games.

[![npm version](https://badge.fury.io/js/@jojech%2Fgame-core.svg)](https://badge.fury.io/js/@jojech%2Fgame-core)
[![CI](https://github.com/jojech/game-package/actions/workflows/ci.yml/badge.svg)](https://github.com/jojech/game-package/actions/workflows/ci.yml)
[![Coverage Status](https://img.shields.io/badge/coverage-check_actions-brightgreen)](https://github.com/jojech/game-package/actions)

## Features

- 🎲 **Dice System** - Customizable dice with faces, values, and symbols
- 🃏 **Card Management** - Flexible card system with stats, costs, and traits
- 🎯 **Deck Operations** - Complete deck management with shuffle, draw, and discard
- 📦 **TypeScript First** - Full type safety and IntelliSense support
- 🔄 **Modern ESM/CJS** - Dual package exports for maximum compatibility
- ✅ **Well Tested** - Comprehensive unit test coverage
- 📖 **Fully Documented** - Complete API documentation

## Installation

```bash
npm install @jojech/game-core
```

```bash
yarn add @jojech/game-core
```

```bash
pnpm add @jojech/game-core
```

## Quick Start

### Using Dice

```typescript
import { Die, DicePool } from '@jojech/game-core';

// Create a standard 6-sided die
const d6 = new Die({ sides: 6 });
const result = d6.roll();
console.log(result); // { value: 4 }

// Create a custom die with symbols
const customDie = new Die({
  sides: 4,
  faces: [
    { symbols: ['⚔️'], value: 1 },
    { symbols: ['🛡️'], value: 1 },
    { symbols: ['⚔️', '⚔️'], value: 2 },
    { symbols: ['💥'], value: 3 }
  ]
});

// Use multiple dice
const pool = new DicePool([d6, customDie]);
const poolResult = pool.rollAll();
console.log(poolResult); // Combined results from both dice
```

### Working with Cards

```typescript
import { Card } from '@jojech/game-core';

const fireballCard = new Card({
  title: 'Fireball',
  subtitle: 'Spell',
  cost: [{ resource: 'mana', amount: 3 }],
  primary: [
    { label: 'Damage', value: 6 }
  ],
  flavorText: 'A burst of flame erupts from your fingertips.',
  tags: ['spell', 'fire', 'damage'],
  traits: ['instant']
});

console.log(fireballCard.title); // 'Fireball'
console.log(fireballCard.getCost()); // [{ resource: 'mana', amount: 3 }]
```

### Managing Decks

```typescript
import { Deck, Card } from '@jojech/game-core';

// Create some cards
const cards = [
  new Card({ title: 'Lightning Bolt' }),
  new Card({ title: 'Heal' }),
  new Card({ title: 'Shield' })
];

// Create a deck
const deck = new Deck('My Spell Deck', cards, {
  shuffle: true,
  minSize: 1,
  maxSize: 60
});

// Draw cards
const hand = deck.drawCards(5);
console.log(hand.length); // 3 (all available cards)

// Play a card
if (hand.length > 0) {
  deck.playCard(hand[0].stateId);
}

// Check deck state
console.log(deck.getActiveDeckSize()); // 0
console.log(deck.getInPlaySize()); // 1
```

## API Reference

### Die Class

Create and roll dice with customizable faces and values.

```typescript
interface DieOptions {
  sides: number;
  faces?: DieFace[];
  defaultColor?: string;
  label?: string;
}

interface DieFace {
  descriptor?: string;
  symbols?: string[];
  value?: number;
  color?: string;
}
```

**Methods:**
- `roll(): DieResult` - Roll the die and return the result
- `getFaces(): DieFace[]` - Get all faces of the die
- `getSides(): number` - Get the number of sides

### Card Class

Flexible card system supporting various game mechanics.

```typescript
interface CardOptions {
  title: string;
  subtitle?: string;
  primary?: CardStatOptions[];
  secondary?: CardStatOptions[];
  flavorText?: string;
  imageUrl?: string;
  suits?: string[];
  cost?: CardCost[];
  tags?: string[];
  setIdentifier?: string;
  traits?: string[];
  onReveal?: string;
  onPlay?: string;
  onDiscard?: string;
  onExhaust?: string;
}
```

**Methods:**
- `getCost(): CardCost[]` - Get the card's resource cost
- `getTags(): string[]` - Get the card's tags
- `getTraits(): string[]` - Get the card's traits

### Deck Class

Complete deck management with state tracking.

```typescript
interface DeckOptions {
  shuffle?: boolean;
  minSize?: number;
  maxSize?: number;
}
```

**Methods:**
- `drawCards(count: number): CardState[]` - Draw cards from the deck
- `playCard(stateId: string): CardState | null` - Move a card to play
- `discardCard(stateId: string): CardState | null` - Discard a card
- `shuffleDeck(): void` - Shuffle the active deck
- `getActiveDeckSize(): number` - Get active deck size
- `getDiscardPileSize(): number` - Get discard pile size
- `getInPlaySize(): number` - Get in-play cards count

### DicePool Class

Manage and roll multiple dice together.

**Methods:**
- `rollAll(): DieResult` - Roll all dice in the pool
- `addDie(die: Die): void` - Add a die to the pool
- `removeDie(index: number): Die | null` - Remove a die from the pool
- `getDiceCount(): number` - Get the number of dice in the pool

## Development

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/jojech/game-package.git
cd game-package
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Run tests:
```bash
npm test
```

### Available Scripts

- `npm run build` - Build the library for production
- `npm run build:watch` - Build in watch mode for development
- `npm test` - Run tests in watch mode
- `npm run test:ci` - Run tests once (for CI)
- `npm run test:coverage` - Run tests with coverage report
- `npm run typecheck` - Type check without emitting files
- `npm run lint` - Lint the source code
- `npm run lint:fix` - Lint and fix issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run changeset` - Create a new changeset for release
- `npm run version` - Update version using changesets
- `npm run release` - Build and publish to npm

### Testing

The project uses [Vitest](https://vitest.dev/) for unit testing. Tests are located alongside source files with the `.test.ts` extension.

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:ci

# Run with coverage
npm run test:coverage
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Run linting (`npm run lint:fix`)
7. Create a changeset (`npm run changeset`)
8. Commit your changes (`git commit -m 'Add some amazing feature'`)
9. Push to the branch (`git push origin feature/amazing-feature`)
10. Open a Pull Request

### Versioning

This project uses [Changesets](https://github.com/changesets/changesets) for version management. To release a new version:

1. Create a changeset: `npm run changeset`
2. Commit the changeset file
3. The release workflow will automatically create a PR with version updates
4. Merge the PR to publish to npm

## License

ISC © Jeremy Johnson

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed history of changes.
