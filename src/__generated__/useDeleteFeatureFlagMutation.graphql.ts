/**
 * @generated SignedSource<<ea236805146c380ad5e22e3a3998e3db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AdminDeleteFeatureFlagInput = {
  clientMutationId?: string | null;
  name?: string | null;
};
export type useDeleteFeatureFlagMutation$variables = {
  input: AdminDeleteFeatureFlagInput;
};
export type useDeleteFeatureFlagMutation$data = {
  readonly adminDeleteFeatureFlag: {
    readonly success: boolean | null;
  } | null;
};
export type useDeleteFeatureFlagMutation = {
  variables: useDeleteFeatureFlagMutation$variables;
  response: useDeleteFeatureFlagMutation$data;
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
    "concreteType": "AdminDeleteFeatureFlagPayload",
    "kind": "LinkedField",
    "name": "adminDeleteFeatureFlag",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
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
    "name": "useDeleteFeatureFlagMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteFeatureFlagMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c19136d5ff2d5eb5ce519e3f60d8272f",
    "id": null,
    "metadata": {},
    "name": "useDeleteFeatureFlagMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteFeatureFlagMutation(\n  $input: AdminDeleteFeatureFlagInput!\n) {\n  adminDeleteFeatureFlag(input: $input) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "64bfa8ca87b071c9fa3f056073830ed1";

export default node;
