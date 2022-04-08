/**
 * @generated SignedSource<<18b9bedfd6570a0b5dc78e30338bf692>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useFetchUserByEmailQuery$variables = {
  email: string;
};
export type useFetchUserByEmailQuery$data = {
  readonly user: {
    readonly internalID: string;
    readonly name: string;
    readonly userAlreadyExists: boolean | null;
  } | null;
};
export type useFetchUserByEmailQuery = {
  variables: useFetchUserByEmailQuery$variables;
  response: useFetchUserByEmailQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "email",
    "variableName": "email"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "userAlreadyExists",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useFetchUserByEmailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useFetchUserByEmailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "aa8c7202d7c5830182e00599f8ed14ef",
    "id": null,
    "metadata": {},
    "name": "useFetchUserByEmailQuery",
    "operationKind": "query",
    "text": "query useFetchUserByEmailQuery(\n  $email: String!\n) {\n  user(email: $email) {\n    internalID\n    name\n    userAlreadyExists\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "ed24a9aa4cf2112e292a48ffd07cb365";

export default node;
