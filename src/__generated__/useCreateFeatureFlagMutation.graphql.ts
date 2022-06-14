/**
 * @generated SignedSource<<102229d876b0bc988473585d57f9e9d2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
    readonly featureFlags: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"FeatureFlagsTable">;
    } | null> | null;
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
  "name": "enabled",
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
            "name": "featureFlags",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "FeatureFlagsTable"
              }
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
            "name": "featureFlags",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "stale",
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "impressionData",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              {
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
              {
                "alias": null,
                "args": null,
                "concreteType": "FeatureFlagEnvironments",
                "kind": "LinkedField",
                "name": "environments",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
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
              },
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
    "cacheID": "3fbad163030cb99611e02eb3415ad415",
    "id": null,
    "metadata": {},
    "name": "useCreateFeatureFlagMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateFeatureFlagMutation(\n  $input: AdminCreateFeatureFlagInput!\n) {\n  adminCreateFeatureFlag(input: $input) {\n    featureFlags {\n      ...FeatureFlagsTable\n      id\n    }\n  }\n}\n\nfragment FeatureFlagsTable on FeatureFlag {\n  name\n  stale\n  enabled\n  description\n  impressionData\n  type\n  createdAt(format: \"MMM DD, YYYY\")\n  environments {\n    enabled\n    name\n  }\n  variants {\n    name\n    stickiness\n    weight\n    weightType\n  }\n}\n"
  }
};
})();

(node as any).hash = "5691e9d574668542b71e6eaacc18d0dc";

export default node;
