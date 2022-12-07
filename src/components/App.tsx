import React, { useState } from "react";
import Table from "./Table";
import ErrorMessage from "./ErrorMessage";
import { GRID_SIZE } from "../constants";
import { Direction, Coords, Error } from "../global-types";

export type TurnType = Command.Right | Command.Left;

export enum Command {
  Place = "PLACE",
  Move = "MOVE",
  Right = "RIGHT",
  Left = "LEFT",
  Report = "REPORT",
}

const orderedDirs = Object.values(Direction);

export const tryMove = (
  coords: Coords,
  direction: Direction
): [number, number] => {
  const [x, y] = coords;
  const max = GRID_SIZE - 1;
  if (direction === Direction.North && y < max) {
    return [x, y + 1];
  }
  if (direction === Direction.East && x < max) {
    return [x + 1, y];
  }
  if (direction === Direction.South && y > 0) {
    return [x, y - 1];
  }
  if (direction === Direction.West && x > 0) {
    return [x - 1, y];
  }

  return [x, y];
};

export const turn = (direction: Direction, turn: TurnType) => {
  const currentIndex = orderedDirs.indexOf(direction);
  const nextOrPrevIndex =
    turn === Command.Right ? currentIndex + 1 : currentIndex - 1;
  return nextOrPrevIndex < 0
    ? orderedDirs[orderedDirs.length - 1]
    : orderedDirs[nextOrPrevIndex % orderedDirs.length];
};

export const validatePlaceArgs = (placeArgs: string[]): boolean =>
  placeArgs.length === 3 &&
  [placeArgs[0], placeArgs[1]].every((val) => !isNaN(Number(val))) &&
  [placeArgs[0], placeArgs[1]].every((val) => Number(val) < GRID_SIZE) &&
  Object.values(Direction).includes(placeArgs[2] as Direction);

function App() {
  const [commandInput, setCommandInput] = useState<string>("");
  const [coords, setCoords] = useState<Coords | undefined>();
  const [direction, setDirection] = useState<Direction | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [showReport, setShowReport] = useState<boolean>(false);

  const submit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);
    const parts = commandInput.toUpperCase().trim().split(/[ ,]+/);
    const [command, ...commandArgs] = parts;
    if (!Object.values(Command).includes(command as Command)) {
      setError(Error.CommandNotFound);
      return;
    }

    if (command !== Command.Place && coords === undefined) {
      setError(Error.RobotNotPlaced);
    } else {
      setShowReport(false);

      switch (command) {
        case Command.Place:
          if (!validatePlaceArgs(commandArgs)) {
            setError(Error.InvalidPlaceArguments);
          } else {
            const [x, y, direction] = commandArgs;
            const newCoords = [x, y].map((val) => Number(val));
            setCoords(newCoords as Coords);
            setDirection(direction as Direction);
          }
          break;
        case Command.Move:
          const newCoords = tryMove(coords as Coords, direction as Direction);
          setCoords(newCoords);
          break;
        case Command.Left:
        case Command.Right:
          const newDirection = turn(
            direction as Direction,
            command as TurnType
          );
          setDirection(newDirection);
          break;
        case Command.Report:
          setShowReport(true);
          break;
        default:
      }
    }
  };

  return (
    <div className="App">
      <h1>Robot Challenge</h1>
      <div className="App-inner">
        <Table coords={coords} direction={direction} />
        <form onSubmit={submit}>
          <input
            className="input"
            aria-label="Type command"
            name="command"
            type="text"
            placeholder="Type command"
            value={commandInput}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCommandInput(event.target.value);
            }}
          />
          <button type="submit">Enter</button>
        </form>
        <div className="report">
          {showReport &&
            coords &&
            `Robot is at [${coords[0]}, ${coords[1]}] & facing ${direction}`}
        </div>
      </div>
      <ErrorMessage error={error} />
      <div className="sample">
        Try commands: <br />
        PLACE 0,0,NORTH <br />
        MOVE <br />
        REPORT <br />
      </div>
    </div>
  );
}

export default App;
