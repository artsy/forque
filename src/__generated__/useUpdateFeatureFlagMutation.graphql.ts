/**
 * @generated SignedSource<<f905f38b716be6bc690a6962ad85ef68>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminUpdateFeatureFlagInput = {
  clientMutationId?: string | null;
  description?: string | null;
  impressionData?: boolean | null;
  name: string;
  type?: string | null;
};
export type useUpdateFeatureFlagMutation$variables = {
  input: AdminUpdateFeatureFlagInput;
};
export type useUpdateFeatureFlagMutation$data = {
  readonly adminUpdateFeatureFlag: {
    readonly featureFlags: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"FeatureFlagsTable">;
    } | null> | null;
  } | null;
};
export type useUpdateFeatureFlagMutation = {
  variables: useUpdateFeatureFlagMutation$variables;
  response: useUpdateFeatureFlagMutation$data;
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
    "name": "useUpdateFeatureFlagMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AdminUpdateFeatureFlagPayload",
        "kind": "LinkedField",
        "name": "adminUpdateFeatureFlag",
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
    "name": "useUpdateFeatureFlagMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AdminUpdateFeatureFlagPayload",
        "kind": "LinkedField",
        "name": "adminUpdateFeatureFlag",
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
    "cacheID": "57d24a6b718b4b9b6e794187e5e04084",
    "id": null,
    "metadata": {},
    "name": "useUpdateFeatureFlagMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateFeatureFlagMutation(\n  $input: AdminUpdateFeatureFlagInput!\n) {\n  adminUpdateFeatureFlag(input: $input) {\n    featureFlags {\n      ...FeatureFlagsTable\n      id\n    }\n  }\n}\n\nfragment FeatureFlagsTable on FeatureFlag {\n  name\n  stale\n  enabled\n  description\n  impressionData\n  type\n  createdAt(format: \"MMM DD, YYYY\")\n  environments {\n    enabled\n    name\n  }\n  variants {\n    name\n    stickiness\n    weight\n    weightType\n  }\n}\n"
  }
};
})();

(node as any).hash = "e9677c54798702f98a476d4de2ac7ca8";

export default node;
