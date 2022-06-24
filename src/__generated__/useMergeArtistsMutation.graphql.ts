/**
 * @generated SignedSource<<bd9e5c38aea42c4ff35de65dc3ffd02d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MergeArtistsMutationInput = {
  badIds: ReadonlyArray<string>;
  clientMutationId?: string | null;
  goodId: string;
};
export type useMergeArtistsMutation$variables = {
  input: MergeArtistsMutationInput;
};
export type useMergeArtistsMutation$data = {
  readonly mergeArtists: {
    readonly mergeArtistsResponseOrError: {
      readonly __typename: "MergeArtistsSuccess";
      readonly artist: {
        readonly internalID: string;
        readonly slug: string;
        readonly name: string | null;
      } | null;
    } | {
      readonly __typename: "MergeArtistsFailure";
      readonly mutationError: {
        readonly message: string;
      } | null;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
  } | null;
};
export type useMergeArtistsMutation = {
  variables: useMergeArtistsMutation$variables;
  response: useMergeArtistsMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MergeArtistsFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useMergeArtistsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MergeArtistsMutationPayload",
        "kind": "LinkedField",
        "name": "mergeArtists",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "mergeArtistsResponseOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artist",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "MergeArtistsSuccess",
                "abstractKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useMergeArtistsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MergeArtistsMutationPayload",
        "kind": "LinkedField",
        "name": "mergeArtists",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "mergeArtistsResponseOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artist",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "id",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "MergeArtistsSuccess",
                "abstractKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "985e5de84c55a2d35dcadf26969fe4da",
    "id": null,
    "metadata": {},
    "name": "useMergeArtistsMutation",
    "operationKind": "mutation",
    "text": "mutation useMergeArtistsMutation(\n  $input: MergeArtistsMutationInput!\n) {\n  mergeArtists(input: $input) {\n    mergeArtistsResponseOrError {\n      __typename\n      ... on MergeArtistsSuccess {\n        artist {\n          internalID\n          slug\n          name\n          id\n        }\n      }\n      ... on MergeArtistsFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "68ed4d05c62e45b11bd053ebbeaade81";

export default node;
