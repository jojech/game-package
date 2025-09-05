# @jojech/game-core

Package containing core game assets like decks and dice.

[![CI](https://github.com/jojech/game-package/actions/workflows/ci.yml/badge.svg)](https://github.com/jojech/game-package/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/%40jojech%2Fgame-core.svg)](https://badge.fury.io/js/%40jojech%2Fgame-core)

## Installation

```bash
npm install @jojech/game-core
```

## Usage

```typescript
import { createGame, GameCore, type GameConfig } from '@jojech/game-core'

// Create a game configuration
const config: GameConfig = {
  name: 'My Awesome Game',
  players: 4,
  duration: 60 // optional
}

// Create a game instance
const game = createGame(config)
// or
const game = new GameCore(config)

// Use the game
console.log(game.getName()) // 'My Awesome Game'
console.log(game.getPlayers()) // 4
console.log(game.getDuration()) // 60
```

## API

### `GameConfig`

```typescript
interface GameConfig {
  name: string
  players: number
  duration?: number
}
```

### `GameCore`

The main game class that holds configuration and provides game methods.

#### Constructor

- `new GameCore(config: GameConfig)` - Create a new game instance

#### Methods

- `getName(): string` - Get the game name
- `getPlayers(): number` - Get the number of players
- `getDuration(): number | undefined` - Get the game duration (if set)
- `getConfig(): GameConfig` - Get a copy of the game configuration

### `createGame(config: GameConfig): GameCore`

Factory function to create a new game instance.

## Development

### Setup

```bash
npm install
```

### Available Scripts

- `npm run build` - Build the package
- `npm run build:watch` - Build in watch mode
- `npm test` - Run tests in watch mode
- `npm run test:ci` - Run tests once
- `npm run test:coverage` - Run tests with coverage
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run clean` - Clean build artifacts

### Release Process

This package uses [Changesets](https://github.com/changesets/changesets) for version management and automated releases.

1. Make your changes
2. Run `npm run changeset` to create a changeset
3. Commit your changes and the changeset
4. Push to main branch
5. A release PR will be automatically created
6. Merge the release PR to publish to npm

## License

ISC
