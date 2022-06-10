/**
 * @generated SignedSource<<259681a158d7cf13e7c4fea9580db5d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AdminCreateFeatureFlagInput = {
  clientMutationId?: string | null;
  description?: string | null;
  impressionData?: boolean | null;
  name?: string | null;
  type?: string | null;
};
export type useDeleteFeatureFlagMutation$variables = {
  input: AdminCreateFeatureFlagInput;
};
export type useDeleteFeatureFlagMutation$data = {
  readonly adminCreateFeatureFlag: {
    readonly featureFlag: {
      readonly name: string | null;
    } | null;
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
    "concreteType": "AdminCreateFeatureFlagPayload",
    "kind": "LinkedField",
    "name": "adminCreateFeatureFlag",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "FeatureFlags",
        "kind": "LinkedField",
        "name": "featureFlag",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
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
    "cacheID": "de0278d07c60716d5b4288075be7059f",
    "id": null,
    "metadata": {},
    "name": "useDeleteFeatureFlagMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteFeatureFlagMutation(\n  $input: AdminCreateFeatureFlagInput!\n) {\n  adminCreateFeatureFlag(input: $input) {\n    featureFlag {\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d8d2723d76d745d1e7952ac6580cce5d";

export default node;
