/**
 * @generated SignedSource<<4002c97ce70d562122c9214e7eee4e01>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
      readonly identityVerification?: {
        readonly " $fragmentSpreads": FragmentRefs<"VerificationsOverrides_identityVerification">;
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
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
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
                    "concreteType": "IdentityVerification",
                    "kind": "LinkedField",
                    "name": "identityVerification",
                    "plural": false,
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "VerificationsOverrides_identityVerification"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "IdentityVerificationOverrideMutationSuccess",
                "abstractKey": null
              },
              (v2/*: any*/)
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
                    "concreteType": "IdentityVerification",
                    "kind": "LinkedField",
                    "name": "identityVerification",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "IdentityVerificationOverride",
                        "kind": "LinkedField",
                        "name": "overrides",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "createdAt",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "newState",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "oldState",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "reason",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "userID",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "creator",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "email",
                                "storageKey": null
                              },
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "IdentityVerificationOverrideMutationSuccess",
                "abstractKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "093d790c6af0602f77656550002ee6ab",
    "id": null,
    "metadata": {},
    "name": "useCreateIdentityVerificationOverrideMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateIdentityVerificationOverrideMutation(\n  $input: CreateIdentityVerificationOverrideMutationInput!\n) {\n  createIdentityVerificationOverride(input: $input) {\n    createIdentityVerificationOverrideResponseOrError {\n      __typename\n      ... on IdentityVerificationOverrideMutationSuccess {\n        identityVerification {\n          ...VerificationsOverrides_identityVerification\n          id\n        }\n      }\n      ... on IdentityVerificationOverrideMutationFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n\nfragment VerificationsOverrides_identityVerification on IdentityVerification {\n  id\n  internalID\n  overrides {\n    createdAt\n    newState\n    oldState\n    reason\n    userID\n    creator {\n      email\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "92146dfc8aba2a337880b72cd46ffbd0";

export default node;
