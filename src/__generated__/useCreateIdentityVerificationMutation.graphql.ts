/**
 * @generated SignedSource<<a8f3a00a46947a4962d2314be7a2b0bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SendIdentityVerificationEmailMutationInput = {
  clientMutationId?: string | null;
  email?: string | null;
  name?: string | null;
  userID?: string | null;
};
export type useCreateIdentityVerificationMutation$variables = {
  input: SendIdentityVerificationEmailMutationInput;
};
export type useCreateIdentityVerificationMutation$data = {
  readonly sendIdentityVerificationEmail: {
    readonly clientMutationId: string | null;
    readonly confirmationOrError: {
      readonly identityVerification?: {
        readonly pageURL: string | null;
      } | null;
      readonly mutationError?: {
        readonly error: string | null;
        readonly message: string;
      } | null;
    } | null;
  } | null;
};
export type useCreateIdentityVerificationMutation = {
  variables: useCreateIdentityVerificationMutation$variables;
  response: useCreateIdentityVerificationMutation$data;
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
  "name": "clientMutationId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pageURL",
  "storageKey": null
},
v4 = {
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
          "name": "error",
          "storageKey": null
        },
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
  "type": "IdentityVerificationEmailMutationFailureType",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateIdentityVerificationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendIdentityVerificationEmailMutationPayload",
        "kind": "LinkedField",
        "name": "sendIdentityVerificationEmail",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "confirmationOrError",
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "IdentityVerificationEmailMutationSuccessType",
                "abstractKey": null
              },
              (v4/*: any*/)
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
    "name": "useCreateIdentityVerificationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendIdentityVerificationEmailMutationPayload",
        "kind": "LinkedField",
        "name": "sendIdentityVerificationEmail",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "confirmationOrError",
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
                        "name": "id",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "IdentityVerificationEmailMutationSuccessType",
                "abstractKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "49326994ac6a11213f08694bc6c8df0a",
    "id": null,
    "metadata": {},
    "name": "useCreateIdentityVerificationMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateIdentityVerificationMutation(\n  $input: SendIdentityVerificationEmailMutationInput!\n) {\n  sendIdentityVerificationEmail(input: $input) {\n    clientMutationId\n    confirmationOrError {\n      __typename\n      ... on IdentityVerificationEmailMutationSuccessType {\n        identityVerification {\n          pageURL\n          id\n        }\n      }\n      ... on IdentityVerificationEmailMutationFailureType {\n        mutationError {\n          error\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "81e9da009dda16c16a3597ff6c6d1998";

export default node;
