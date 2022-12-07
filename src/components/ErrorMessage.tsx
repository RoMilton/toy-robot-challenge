import React from "react";
import { Error } from "../global-types";
import { GRID_SIZE } from '../constants';

interface Props {
  error?: Error;
}

const getErrorText = (error: Error) => {
  switch (error) {
    case Error.CommandNotFound:
      return "Command Not Found, must be PLACE, MOVE, LEFT, RIGHT, REPORT";
    case Error.InvalidPlaceArguments:
      return `Invalid arguments, use "PLACE X,Y,F". X and Y must ${GRID_SIZE - 1} or less. For example: "PLACE 0,0,NORTH"`;
    case Error.RobotNotPlaced:
      return "Robot is not placed, please enter PLACE command";
    default:
      return "";
  }
};

const ErrorMessage: React.FC<Props> = ({ error }) => (
  <>{!error ? null : <div className="error">{getErrorText(error)}</div>}</>
);

export default ErrorMessage;
