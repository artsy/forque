/**
 * @generated SignedSource<<f6b76318ec3f104005968f22efce1c38>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateIdentityVerificationOverrideMutationInput = {
  clientMutationId?: string | null;
  identityVerificationID: string;
  reason: string;
  state: string;
};
export type useCreateIdentityVerificationOverrideMutation$variables = {
  input: CreateIdentityVerificationOverrideMutationInput;
};
export type useCreateIdentityVerificationOverrideMutation$data = {
  readonly createIdentityVerificationOverride: {
    readonly createIdentityVerificationOverrideResponseOrError: {
      readonly identityVerificationOverride?: {
        readonly userID: string | null;
        readonly reason: string;
        readonly newState: string;
        readonly oldState: string;
        readonly createdAt: string | null;
      } | null;
      readonly mutationError?: {
        readonly message: string;
      } | null;
    } | null;
  } | null;
};
export type useCreateIdentityVerificationOverrideMutation = {
  variables: useCreateIdentityVerificationOverrideMutation$variables;
  response: useCreateIdentityVerificationOverrideMutation$data;
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
  "name": "userID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reason",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "newState",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "oldState",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v7 = {
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
  "type": "IdentityVerificationOverrideMutationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateIdentityVerificationOverrideMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateIdentityVerificationOverrideMutationPayload",
        "kind": "LinkedField",
        "name": "createIdentityVerificationOverride",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "createIdentityVerificationOverrideResponseOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "IdentityVerificationOverride",
                    "kind": "LinkedField",
                    "name": "identityVerificationOverride",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "IdentityVerificationOverrideMutationSuccess",
                "abstractKey": null
              },
              (v7/*: any*/)
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
    "name": "useCreateIdentityVerificationOverrideMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateIdentityVerificationOverrideMutationPayload",
        "kind": "LinkedField",
        "name": "createIdentityVerificationOverride",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "createIdentityVerificationOverrideResponseOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "IdentityVerificationOverride",
                    "kind": "LinkedField",
                    "name": "identityVerificationOverride",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
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
                "type": "IdentityVerificationOverrideMutationSuccess",
                "abstractKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4f7a86b751bd7a261c4051965910f609",
    "id": null,
    "metadata": {},
    "name": "useCreateIdentityVerificationOverrideMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateIdentityVerificationOverrideMutation(\n  $input: CreateIdentityVerificationOverrideMutationInput!\n) {\n  createIdentityVerificationOverride(input: $input) {\n    createIdentityVerificationOverrideResponseOrError {\n      __typename\n      ... on IdentityVerificationOverrideMutationSuccess {\n        identityVerificationOverride {\n          userID\n          reason\n          newState\n          oldState\n          createdAt\n          id\n        }\n      }\n      ... on IdentityVerificationOverrideMutationFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f8f1601d52061cb2f36182129a7993de";

export default node;
