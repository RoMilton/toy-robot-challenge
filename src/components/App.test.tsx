import React from "react";
import { render, screen } from "@testing-library/react";
import App, {
  Command,
  TurnType,
  tryMove,
  turn,
  validatePlaceArgs,
} from "./App";
import { Direction } from "../global-types";

type moveTestTuple = [number, number, Direction, number, number];

const moveCases: moveTestTuple[] = [
  [0, 0, Direction.North, 0, 1],
  [2, 4, Direction.South, 2, 3],
  [2, 0, Direction.South, 2, 0],
  [4, 4, Direction.East, 4, 4],
  [2, 1, Direction.East, 3, 1],
  [2, 3, Direction.West, 1, 3],
  [3, 4, Direction.East, 4, 4],
];

describe("tryMove", () => {
  test.each<moveTestTuple>(moveCases)(
    "given position %i %i and facing %s, should return %i %i",
    (x, y, Direction, newX, newY) => {
      expect(tryMove([x, y], Direction)).toEqual([newX, newY]);
    }
  );
});

type turnTestTuple = [Direction, TurnType, Direction];

const turnCases: turnTestTuple[] = [
  [Direction.North, Command.Right, Direction.East],
  [Direction.South, Command.Right, Direction.West],
  [Direction.West, Command.Right, Direction.North],
  [Direction.North, Command.Left, Direction.West],
  [Direction.South, Command.Left, Direction.East],
  [Direction.East, Command.Left, Direction.North],
];

describe("turn", () => {
  test.each<turnTestTuple>(turnCases)(
    "given %s and turning %s, should return %s",
    (direction, turnType, expected) => {
      expect(turn(direction, turnType)).toEqual(expected);
    }
  );
});

type placeArgsTestTuple = [string, string?, Direction?, boolean?];

const placeArgsCases: placeArgsTestTuple[] = [
  ["0", "10", Direction.North, false],
  ["1", "4", Direction.North, true],
];

describe("validatePlaceArgs", () => {
  test.each<placeArgsTestTuple>(placeArgsCases)(
    "given args %s %s %s should return %s",
    (...vals) => {
      const args = vals.slice(0, -1);
      expect(validatePlaceArgs(args as string[])).toEqual(
        vals[vals.length - 1]
      );
    }
  );
});

test("renders App", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
