import React from "react"
import { render, screen } from "@testing-library/react"

import { ArtistCardHeader } from "../ArtistCardHeader"
import { RecordStatus } from "../state"
import artist from "../__fixtures__/artist-with-dupes"

it("displays the name and slug", () => {
  render(<ArtistCardHeader artist={artist.duplicates[1]} />)

  expect(screen.getByText("Warren King")).toBeInTheDocument()
  expect(screen.getByText("warren-king")).toBeInTheDocument()
})

it("reflects the 'good' status of the record", () => {
  render(
    <ArtistCardHeader
      artist={artist.duplicates[1]}
      recordStatus={RecordStatus.GOOD}
    />
  )
  expect(screen.getByTestId("header")).toHaveClass("bg-green100")
})

it("reflects the 'bad' status of the record", () => {
  render(
    <ArtistCardHeader
      artist={artist.duplicates[1]}
      recordStatus={RecordStatus.BAD}
    />
  )
  expect(screen.getByTestId("header")).toHaveClass("bg-red100")
})
