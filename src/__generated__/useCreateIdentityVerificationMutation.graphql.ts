/**
 * @generated SignedSource<<fd2bdbdbda4077d28fd07e45f0728043>>
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
  userID?: string | null;
};
export type useCreateIdentityVerificationMutation$variables = {
  input: SendIdentityVerificationEmailMutationInput;
};
export type useCreateIdentityVerificationMutation$data = {
  readonly sendIdentityVerificationEmail: {
    readonly clientMutationId: string | null;
    readonly confirmationOrError: {
      readonly identityVerificationEmail?: {
        readonly internalID: string;
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
  "name": "internalID",
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
                    "concreteType": "IdentityVerificationEmail",
                    "kind": "LinkedField",
                    "name": "identityVerificationEmail",
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
                    "concreteType": "IdentityVerificationEmail",
                    "kind": "LinkedField",
                    "name": "identityVerificationEmail",
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
    "cacheID": "a9fe482c382663951bb51e6662303af0",
    "id": null,
    "metadata": {},
    "name": "useCreateIdentityVerificationMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateIdentityVerificationMutation(\n  $input: SendIdentityVerificationEmailMutationInput!\n) {\n  sendIdentityVerificationEmail(input: $input) {\n    clientMutationId\n    confirmationOrError {\n      __typename\n      ... on IdentityVerificationEmailMutationSuccessType {\n        identityVerificationEmail {\n          internalID\n          id\n        }\n      }\n      ... on IdentityVerificationEmailMutationFailureType {\n        mutationError {\n          error\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2004e271e6fc4aeb82bf008d04eaacab";

export default node;