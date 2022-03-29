/**
 * @generated SignedSource<<5fba2650691256d9359b80825a52e0fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArtistSlugQuery$variables = {
  artistSlug: string
}
export type ArtistSlugQuery$data = {
  readonly artist: {
    readonly bio: string | null
    readonly " $fragmentSpreads": FragmentRefs<"ArtistName_artist">
  } | null
}
export type ArtistSlugQuery = {
  variables: ArtistSlugQuery$variables
  response: ArtistSlugQuery$data
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "artistSlug",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "id",
        variableName: "artistSlug",
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "bio",
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "ArtistSlugQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Artist",
          kind: "LinkedField",
          name: "artist",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "ArtistName_artist",
            },
            v2 /*: any*/,
          ],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "ArtistSlugQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Artist",
          kind: "LinkedField",
          name: "artist",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "name",
              storageKey: null,
            },
            v2 /*: any*/,
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "40878bea346f36be2c9665ac818963d5",
      id: null,
      metadata: {},
      name: "ArtistSlugQuery",
      operationKind: "query",
      text: "query ArtistSlugQuery(\n  $artistSlug: String!\n) {\n  artist(id: $artistSlug) {\n    ...ArtistName_artist\n    bio\n    id\n  }\n}\n\nfragment ArtistName_artist on Artist {\n  name\n}\n",
    },
  }
})()

;(node as any).hash = "d74b95b9674b0fd09ef5ef4350eccde2"

export default node
