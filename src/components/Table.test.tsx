import React from "react";
import { render } from "@testing-library/react";
import Table from "./Table";
import { Direction } from "../global-types";

describe("Table", () => {
  test("renders with no robot placement", () => {
    const { asFragment } = render(<Table />);
    expect(asFragment()).toMatchSnapshot();
  });

  Object.values(Direction).forEach((dir) => {
    test(`renders Table with robot facing ${dir}`, () => {
      const { asFragment } = render(
        <Table coords={[1, 1]} direction={dir as Direction} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
