import React from "react"
import { render, screen } from "@testing-library/react"

import { ArtistDupesManager } from "../ArtistDupesManager"
import artist from "../__fixtures__/artist-with-dupes"

it("displays the found clusters", () => {
  render(<ArtistDupesManager artist={artist} />)

  expect(
    screen.getByText(/The following cluster of\s+3\s+dupes was found/)
  ).toBeInTheDocument()

  expect(screen.getByText("warren-king-2")).toBeInTheDocument()
  expect(screen.getByText("warren-king")).toBeInTheDocument()
  expect(screen.getByText("warren-king-1")).toBeInTheDocument()
})
