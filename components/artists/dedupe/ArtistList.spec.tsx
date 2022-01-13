import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { ArtistList } from "./ArtistList"

it("renders artists, links and info", () => {
  const artists = [
    {
      slug: "tom-dowling",
      name: "Tom Dowling",
      createdAt: "2022-01-07T03:03:48+00:00",
      counts: {
        duplicates: 1,
      },
    },
    {
      slug: "ludo-leideritz",
      name: "Ludo Leideritz",
      createdAt: "2022-01-07T03:03:35+00:00",
      counts: {
        duplicates: 2,
      },
    },
  ]

  render(<ArtistList artists={artists} />)

  const link1 = screen.getByRole("link", { name: /Tom Dowling/ })
  expect(link1).toHaveTextContent(/ago/)
  expect(link1).not.toHaveTextContent(/Cluster/)
  expect(link1).toHaveAttribute("href", "/artists/dedupe/tom-dowling")

  const link2 = screen.getByRole("link", { name: /Ludo Leideritz/ })
  expect(link1).toHaveTextContent(/ago/)
  expect(link2).toHaveTextContent(/Cluster of 2/)
  expect(link2).toHaveAttribute("href", "/artists/dedupe/ludo-leideritz")
})
