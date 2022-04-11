/**
 * @generated SignedSource<<d5c68f3853dede33e5cda433c82494f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TransferMyCollectionInput = {
  clientMutationId?: string | null;
  emailFrom: string;
  emailTo: string;
};
export type useTransferMyCollectionMutation$variables = {
  input: TransferMyCollectionInput;
};
export type useTransferMyCollectionMutation$data = {
  readonly transferMyCollection: {
    readonly artworkCountOrError: {
      readonly errors?: ReadonlyArray<{
        readonly message: string;
        readonly path: ReadonlyArray<string> | null;
        readonly data: any | null;
        readonly code: string;
      }>;
      readonly count?: number;
    };
  } | null;
};
export type useTransferMyCollectionMutation = {
  variables: useTransferMyCollectionMutation$variables;
  response: useTransferMyCollectionMutation$data;
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
      "concreteType": "Error",
      "kind": "LinkedField",
      "name": "errors",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "path",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "data",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Errors",
  "abstractKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "count",
      "storageKey": null
    }
  ],
  "type": "TransferMyCollectionSuccess",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useTransferMyCollectionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TransferMyCollectionPayload",
        "kind": "LinkedField",
        "name": "transferMyCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "artworkCountOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
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
    "name": "useTransferMyCollectionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TransferMyCollectionPayload",
        "kind": "LinkedField",
        "name": "transferMyCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "artworkCountOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "74ec2e49f8393d316e4341a7f6ff456e",
    "id": null,
    "metadata": {},
    "name": "useTransferMyCollectionMutation",
    "operationKind": "mutation",
    "text": "mutation useTransferMyCollectionMutation(\n  $input: TransferMyCollectionInput!\n) {\n  transferMyCollection(input: $input) {\n    artworkCountOrError {\n      __typename\n      ... on Errors {\n        errors {\n          message\n          path\n          data\n          code\n        }\n      }\n      ... on TransferMyCollectionSuccess {\n        count\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "eadc43c5c1919c740f2ac7a9c230d524";

export default node;
