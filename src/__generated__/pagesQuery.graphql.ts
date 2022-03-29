/**
 * @generated SignedSource<<24c93626625ac3d4145b22f4441ec5b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime"
export type pagesQuery$variables = {}
export type pagesQuery$data = {
  readonly me: {
    readonly email: string | null
  } | null
}
export type pagesQuery = {
  variables: pagesQuery$variables
  response: pagesQuery$data
}

const node: ConcreteRequest = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "email",
    storageKey: null,
  }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "pagesQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Me",
          kind: "LinkedField",
          name: "me",
          plural: false,
          selections: [v0 /*: any*/],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "pagesQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Me",
          kind: "LinkedField",
          name: "me",
          plural: false,
          selections: [
            v0 /*: any*/,
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
      cacheID: "03f7a93662129ae36544ab16d68b9203",
      id: null,
      metadata: {},
      name: "pagesQuery",
      operationKind: "query",
      text: "query pagesQuery {\n  me {\n    email\n    id\n  }\n}\n",
    },
  }
})()

;(node as any).hash = "f098d255d1f983862182b649944b4a94"

export default node
