/**
 * @generated SignedSource<<51f80c63c3130686ce94121a56fd996e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateUserSaleProfileMutationInput = {
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  clientMutationId?: string | null;
  country?: string | null;
  id: string;
  state?: string | null;
  zip?: string | null;
};
export type useUpdateUserSaleProfileMutation$variables = {
  input: UpdateUserSaleProfileMutationInput;
};
export type useUpdateUserSaleProfileMutation$data = {
  readonly updateUserSaleProfile: {
    readonly clientMutationId: string | null;
  } | null;
};
export type useUpdateUserSaleProfileMutation = {
  variables: useUpdateUserSaleProfileMutation$variables;
  response: useUpdateUserSaleProfileMutation$data;
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
    "concreteType": "UpdateUserSaleProfileMutationPayload",
    "kind": "LinkedField",
    "name": "updateUserSaleProfile",
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
    "name": "useUpdateUserSaleProfileMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateUserSaleProfileMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "82541175bdd23677fe1661393c7f486c",
    "id": null,
    "metadata": {},
    "name": "useUpdateUserSaleProfileMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateUserSaleProfileMutation(\n  $input: UpdateUserSaleProfileMutationInput!\n) {\n  updateUserSaleProfile(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "3a1a9870ca0b1b442909bf7cc0afaa59";

export default node;
