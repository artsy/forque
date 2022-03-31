/**
 * @generated SignedSource<<73ca208cb633feb2c74757d1a176841f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateUserMutationInput = {
  clientMutationId?: string | null;
  dataTransferOptOut?: boolean | null;
  email: string;
  id: string;
  name: string;
  phone?: string | null;
};
export type useUpdateUserMutation$variables = {
  input: UpdateUserMutationInput;
};
export type useUpdateUserMutation$data = {
  readonly updateUser: {
    readonly clientMutationId: string | null;
  } | null;
};
export type useUpdateUserMutation = {
  variables: useUpdateUserMutation$variables;
  response: useUpdateUserMutation$data;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateUserMutationPayload",
    "kind": "LinkedField",
    "name": "updateUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clientMutationId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "be68dc67f9914a3fc9f3547b0fa1db73",
    "id": null,
    "metadata": {},
    "name": "useUpdateUserMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateUserMutation(\n  $input: UpdateUserMutationInput!\n) {\n  updateUser(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "831307e4f68b2954601b3fa8e48ecafb";

export default node;
