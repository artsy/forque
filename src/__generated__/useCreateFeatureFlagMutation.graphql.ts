/**
 * @generated SignedSource<<19225b95d3b13d24e0a18cdba7c1ea15>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FeatureFlagStrategyType = "DEFAULT" | "FLEXIBLE_ROLLOUT" | "%future added value";
export type FeatureFlagToggleType = "EXPERIMENT" | "RELEASE" | "%future added value";
export type FeatureFlagVariantWeightType = "VARIABLE" | "%future added value";
export type AdminCreateFeatureFlagInput = {
  clientMutationId?: string | null;
  description?: string | null;
  impressionData?: boolean | null;
  name?: string | null;
  strategy: FeatureFlagStrategyInput;
  type: FeatureFlagToggleType;
  variants?: ReadonlyArray<FeatureFlagVariantInputName | null> | null;
};
export type FeatureFlagStrategyInput = {
  rollOut?: number | null;
  strategyType?: FeatureFlagStrategyType | null;
};
export type FeatureFlagVariantInputName = {
  name: string;
  stickiness?: string | null;
  weight: number;
  weightType?: FeatureFlagVariantWeightType | null;
};
export type useCreateFeatureFlagMutation$variables = {
  input: AdminCreateFeatureFlagInput;
};
export type useCreateFeatureFlagMutation$data = {
  readonly adminCreateFeatureFlag: {
    readonly featureFlag: {
      readonly name: string;
      readonly stale: boolean;
      readonly enabled: boolean;
      readonly description: string | null;
      readonly impressionData: boolean;
      readonly type: string;
      readonly createdAt: string | null;
      readonly environments: ReadonlyArray<{
        readonly enabled: boolean;
        readonly name: string;
      } | null> | null;
      readonly variants: ReadonlyArray<{
        readonly name: string;
        readonly stickiness: string | null;
        readonly weight: number;
        readonly weightType: string | null;
      }>;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stale",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "enabled",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "impressionData",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "format",
      "value": "MMM DD, YYYY"
    }
  ],
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": "createdAt(format:\"MMM DD, YYYY\")"
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "FeatureFlagEnvironments",
  "kind": "LinkedField",
  "name": "environments",
  "plural": true,
  "selections": [
    (v4/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "FeatureFlagVariantType",
  "kind": "LinkedField",
  "name": "variants",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "stickiness",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "weight",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "weightType",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateFeatureFlagMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AdminCreateFeatureFlagPayload",
        "kind": "LinkedField",
        "name": "adminCreateFeatureFlag",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FeatureFlag",
            "kind": "LinkedField",
            "name": "featureFlag",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/)
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
    "name": "useCreateFeatureFlagMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AdminCreateFeatureFlagPayload",
        "kind": "LinkedField",
        "name": "adminCreateFeatureFlag",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FeatureFlag",
            "kind": "LinkedField",
            "name": "featureFlag",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "371d3c27bf2efa9cb9e0bd207a0e4ee9",
    "id": null,
    "metadata": {},
    "name": "useCreateFeatureFlagMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateFeatureFlagMutation(\n  $input: AdminCreateFeatureFlagInput!\n) {\n  adminCreateFeatureFlag(input: $input) {\n    featureFlag {\n      name\n      stale\n      enabled\n      description\n      impressionData\n      type\n      createdAt(format: \"MMM DD, YYYY\")\n      environments {\n        enabled\n        name\n      }\n      variants {\n        name\n        stickiness\n        weight\n        weightType\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b513e0aca5e9bed65ab74ca5bea43798";

export default node;
