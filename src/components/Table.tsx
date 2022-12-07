import React from "react";
import { GRID_SIZE } from "../constants";
import { Coords, Direction } from "../global-types";
import arrow from "../arrow.png";

const cellCount = GRID_SIZE ** 2;
const cellFlexBasis = `${100 / GRID_SIZE}%`;

interface Props {
  coords?: Coords;
  direction?: Direction;
}

const getHighlightCellIndex = (coords?: Coords) =>
  coords === undefined ? undefined : coords[1] * GRID_SIZE + coords[0];

const getRotation = (direction: Direction) => {
  switch (direction) {
    case Direction.North:
      return 0;
    case Direction.East:
      return 90;
    case Direction.South:
      return 180;
    case Direction.West:
      return 270;
    default:
      return 0;
  }
};

const Table: React.FC<Props> = ({ coords, direction }) => {
  const highlightedIndex = getHighlightCellIndex(coords);
  return (
    <div className="table">
      {Array.from({ length: cellCount }).map((val, index) => (
        <div
          key={index}
          className="table-cell"
          style={{ flexBasis: cellFlexBasis }}
        >
          {coords && direction && highlightedIndex === index && (
            <img
              src={arrow}
              className="table-robot"
              alt="robot"
              style={{
                transform: `rotate(${getRotation(direction)}deg)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Table;
