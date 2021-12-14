# Visual Solver for Decision Games

## Usage
Go to the [GitHub Page](https://meitinger.github.io/GameSolver) and pick the
game you want to solve. (Currently *Tic-Tac-Toe* and *Custom Game* are
available, see the next [section](#extending) on how to implement your
own game.)

Specify the game setup (JSON format, validated by an annotated schema) and hit
the play button to draw the decision graph and calculate the player(s) with a
winning strategy.
For games that supporting a board or an arena, you can also hover over nodes
and see a visual representation of the game in that state.

## Extending
In order to implement your game you need to subclass `TypedGame` which takes
two generic type parameters: The type of the game's setup (which must be JSON
serializable) and the type of the internal state representation.
The game must support it's own (de)serialization of states to a string by
implementing `encodeState` and `decodeState` respectively.

In order to verify the setup, a game must provide a JSON `schema`, which is an
object of type `JSONSchemaType` from the [ajv](https://ajv.js.org/) validator.
You can use `getSetup` in all functions to safely retrieve the loaded setup.
A sample setup, together with other game meta data, has to registered in the
`Games` object defined in `src/setup.ts`.

The game has to provide the name and color of players through `getPlayers`, as
well as the initial state (`getInitialState`), transitions between states
(`getNextStates`) and if a player is winning in a certain state
(`getWinningPlayersFromState`).
In contrast to tradition decision games, getting stuck does not automatically
count as a win for other players, so the game needs to return these wins
explicitly if so desired.

Lastly, a game can draw a state by implementing `renderState`. If the browser
supports [`OffscreenCanvas`](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
this function is called in a worker thread. Otherwise it will be called in the
UI thread, so the function should finish rather quickly.

For an example to get you started see `src/tictactoe.ts`, pull requests of new
games are very welcome.
