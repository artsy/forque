import { ArtistWithDupes } from "../../types"

const artistWithDupes: ArtistWithDupes = {
  internalID: "61d6b75c67697a000b16ce43",
  slug: "warren-king-2",
  name: "Warren King",
  gender: "", // was actually null in the MP response
  nationality: "British",
  birthday: "",
  deathday: "",
  hometown: "",
  location: "",
  counts: {
    artworks: 17,
    follows: 3,
  },
  duplicates: [
    {
      internalID: "61d6b75c67697a000b16ce43",
      slug: "warren-king-2",
      name: "Warren King",
      gender: "", // was actually null in the MP response
      nationality: "British",
      birthday: "",
      deathday: "",
      hometown: "",
      location: "",
      counts: {
        artworks: 17,
        follows: 3,
      },
    },
    {
      internalID: "5c33c6856196a57e5255e29e",
      slug: "warren-king",
      name: "Warren King",
      gender: "male",
      nationality: "American",
      birthday: "1916",
      deathday: "1978",
      hometown: "Long Island, New York, USA",
      location: "",
      counts: {
        artworks: 42,
        follows: 420,
      },
    },
    {
      internalID: "5cae0291e398462d85c1387f",
      slug: "warren-king-1",
      name: "Warren King",
      gender: "male",
      nationality: "American",
      birthday: "1970",
      deathday: "",
      hometown: "Madison, WI, USA",
      location: "New York, NY, USA",
      counts: {
        artworks: 12,
        follows: 10,
      },
    },
  ],
}

export default artistWithDupes
