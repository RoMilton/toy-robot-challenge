export type Coords = [number, number];

export enum Direction {
  North = "NORTH",
  East = "EAST",
  South = "SOUTH",
  West = "WEST",
}

export enum Error {
  CommandNotFound = "COMMAND_NOT_FOUND",
  InvalidPlaceArguments = "INVALID_PLACE_ARGUMENTS",
  RobotNotPlaced = "ROBOT_NOT_PLACED",
}
