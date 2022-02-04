import React from "react"
import { render, screen } from "@testing-library/react"

import { ArtistCard } from "../ArtistCard"
import artist from "../__fixtures__/artist-with-dupes"

it("displays the name and slug", () => {
  render(<ArtistCard artist={artist.duplicates[1]} mode="select records" />)

  expect(screen.getByText("Warren King")).toBeInTheDocument()
  expect(screen.getByText("warren-king")).toBeInTheDocument()
})

it("displays labels and values", () => {
  render(<ArtistCard artist={artist.duplicates[1]} mode="select records" />)

  expect(screen.getByText("gender")).toBeInTheDocument()
  expect(screen.getByText("male")).toBeInTheDocument()

  expect(screen.getByText("nationality")).toBeInTheDocument()
  expect(screen.getByText("American")).toBeInTheDocument()

  expect(screen.getByText("birthday")).toBeInTheDocument()
  expect(screen.getByText("1916")).toBeInTheDocument()

  expect(screen.getByText("deathday")).toBeInTheDocument()
  expect(screen.getByText("1978")).toBeInTheDocument()

  expect(screen.getByText("artworks")).toBeInTheDocument()
  expect(screen.getByText("42")).toBeInTheDocument()

  expect(screen.getByText("follows")).toBeInTheDocument()
  expect(screen.getByText("420")).toBeInTheDocument()
})

it("displays label even when value is not present", () => {
  render(<ArtistCard artist={artist.duplicates[1]} mode="select records" />)

  expect(screen.getByText("location")).toBeInTheDocument()
})
