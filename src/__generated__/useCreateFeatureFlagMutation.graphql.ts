/**
 * @generated SignedSource<<3e3197f511a3217097261984e52854f7>>
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
export type useCreateFeatureFlagMutation$variables = {
  input: AdminCreateFeatureFlagInput;
};
export type useCreateFeatureFlagMutation$data = {
  readonly adminCreateFeatureFlag: {
    readonly featureFlag: {
      readonly name: string | null;
    } | null;
  } | null;
};
export type useCreateFeatureFlagMutation = {
  variables: useCreateFeatureFlagMutation$variables;
  response: useCreateFeatureFlagMutation$data;
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
    "name": "useCreateFeatureFlagMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCreateFeatureFlagMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7d7fb0d804582a9efeccdc57873337c4",
    "id": null,
    "metadata": {},
    "name": "useCreateFeatureFlagMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateFeatureFlagMutation(\n  $input: AdminCreateFeatureFlagInput!\n) {\n  adminCreateFeatureFlag(input: $input) {\n    featureFlag {\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d9bb7877a06de1ab7ae33d30fd7c710d";

export default node;
