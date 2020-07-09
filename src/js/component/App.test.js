import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders app section", () => {
  const { getByTestId } = render(<App />);
  const section = getByTestId("app");
  expect(section).toBeInTheDocument();
});
