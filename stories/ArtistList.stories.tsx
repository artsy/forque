import React from "react"

import { ArtistList, Skeleton } from "../components/artists/dedupe/list/ArtistList"

export default {
  component: ArtistList,
}

export const SkeletonPlacholder = () => <Skeleton length={artists.length} />
export const WithArtists = () => <ArtistList artists={artists} />

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
      duplicates: 1,
    },
  },
  {
    slug: "heather-zusman",
    name: "Heather Zusman",
    createdAt: "2022-01-07T03:02:46+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "pat-sparkuhl",
    name: "Pat Sparkuhl",
    createdAt: "2022-01-07T03:02:35+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "joanna-sarapata",
    name: "Joanna Sarapata",
    createdAt: "2022-01-07T03:02:03+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "da-aie-park",
    name: "Da Aie Park",
    createdAt: "2022-01-07T03:01:51+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "brad-neal",
    name: "Brad Neal",
    createdAt: "2022-01-07T03:01:14+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "fitz-maurice-1",
    name: "Fitz Maurice",
    createdAt: "2022-01-07T03:00:55+00:00",
    counts: {
      duplicates: 2,
    },
  },
  {
    slug: "fitz-maurice",
    name: "Fitz Maurice",
    createdAt: "2022-01-07T02:59:54+00:00",
    counts: {
      duplicates: 2,
    },
  },
  {
    slug: "carl-lozada",
    name: "Carl Lozada",
    createdAt: "2022-01-07T02:59:41+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "barbara-leideritz",
    name: "Barbara Leideritz",
    createdAt: "2022-01-07T02:59:12+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "carolyn-johnson",
    name: "Carolyn Johnson",
    createdAt: "2022-01-07T02:59:00+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "robert-a-hansen",
    name: "Robert A. Hansen",
    createdAt: "2022-01-07T02:58:48+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "karen-feuer-schwager",
    name: "Karen Feuer-Schwager",
    createdAt: "2022-01-07T02:58:03+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "claire-price-1",
    name: "Claire Price",
    createdAt: "2022-01-07T02:03:07+00:00",
    counts: {
      duplicates: 2,
    },
  },
  {
    slug: "erika-alonso",
    name: "Erika Alonso",
    createdAt: "2022-01-07T01:19:33+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "marianne-strengell",
    name: "Marianne Strengell",
    createdAt: "2022-01-07T01:15:18+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "uri-tzaig",
    name: "Uri Tzaig",
    createdAt: "2022-01-07T01:12:29+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "thomas-edwin-mostyn",
    name: "Thomas Edwin Mostyn",
    createdAt: "2022-01-07T00:14:08+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "ann-oren",
    name: "Ann Oren",
    createdAt: "2022-01-06T22:34:04+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "jack-of-the-dust",
    name: "Jack Of The Dust",
    createdAt: "2022-01-06T22:30:45+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "jack-of-dust",
    name: "Jack of Dust",
    createdAt: "2022-01-06T22:29:39+00:00",
    counts: {
      duplicates: 2,
    },
  },
  {
    slug: "sergey-dyomin",
    name: "SERGEY DYOMIN",
    createdAt: "2022-01-06T22:19:59+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "jourdan-tchoffo",
    name: "Jourdan Tchoffo",
    createdAt: "2022-01-06T22:15:53+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "adrienne-trent",
    name: "Adrienne Trent",
    createdAt: "2022-01-06T22:13:30+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "christian-nesvadba",
    name: "Christian Nesvadba",
    createdAt: "2022-01-06T20:24:05+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "trish-coonrod",
    name: "Trish Coonrod",
    createdAt: "2022-01-06T20:17:13+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "zander-stefani",
    name: "Zander Stefani",
    createdAt: "2022-01-06T20:13:04+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "joseph-9",
    name: "Joseph",
    createdAt: "2022-01-06T19:43:29+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "beneson",
    name: "Beneson",
    createdAt: "2022-01-06T19:20:14+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "stephanie-henderson",
    name: "Stephanie Henderson",
    createdAt: "2022-01-06T18:12:23+00:00",
    counts: {
      duplicates: 2,
    },
  },
  {
    slug: "daniel-arthur-mendoza",
    name: "Daniel Arthur Mendoza",
    createdAt: "2022-01-06T18:00:18+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "frank-guzzone",
    name: "Frank Guzzone",
    createdAt: "2022-01-06T17:13:54+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "rez-williams",
    name: "Rez Williams",
    createdAt: "2022-01-06T17:10:16+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "jeff-gilette",
    name: "Jeff Gilette",
    createdAt: "2022-01-06T16:59:17+00:00",
    counts: {
      duplicates: 1,
    },
  },
  {
    slug: "alex-jones",
    name: "Alex Jones",
    createdAt: "2022-01-06T16:50:37+00:00",
    counts: {
      duplicates: 1,
    },
  },
]
