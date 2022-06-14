/**
 * @generated SignedSource<<d6a357b87f3e56e2cb99b9e50e506e3f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminToggleFeatureFlagEnvironment = "DEVELOPMENT" | "PRODUCTION" | "%future added value";
export type AdminToggleFeatureFlagInput = {
  clientMutationId?: string | null;
  enabled: boolean;
  environment: AdminToggleFeatureFlagEnvironment;
  name: string;
};
export type useToggleFeatureFlagMutation$variables = {
  input: AdminToggleFeatureFlagInput;
};
export type useToggleFeatureFlagMutation$data = {
  readonly adminToggleFeatureFlag: {
    readonly featureFlags: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"FeatureFlagsTable">;
    } | null> | null;
  } | null;
};
export type useToggleFeatureFlagMutation = {
  variables: useToggleFeatureFlagMutation$variables;
  response: useToggleFeatureFlagMutation$data;
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
    "name": "useToggleFeatureFlagMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AdminToggleFeatureFlagPayload",
        "kind": "LinkedField",
        "name": "adminToggleFeatureFlag",
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
    "name": "useToggleFeatureFlagMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AdminToggleFeatureFlagPayload",
        "kind": "LinkedField",
        "name": "adminToggleFeatureFlag",
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
    "cacheID": "09e707c3558e42f356104c36b8b2b3f2",
    "id": null,
    "metadata": {},
    "name": "useToggleFeatureFlagMutation",
    "operationKind": "mutation",
    "text": "mutation useToggleFeatureFlagMutation(\n  $input: AdminToggleFeatureFlagInput!\n) {\n  adminToggleFeatureFlag(input: $input) {\n    featureFlags {\n      ...FeatureFlagsTable\n      id\n    }\n  }\n}\n\nfragment FeatureFlagsTable on FeatureFlag {\n  name\n  stale\n  enabled\n  description\n  impressionData\n  type\n  createdAt(format: \"MMM DD, YYYY\")\n  environments {\n    enabled\n    name\n  }\n  variants {\n    name\n    stickiness\n    weight\n    weightType\n  }\n}\n"
  }
};
})();

(node as any).hash = "ce55e5c0febcf285e64935243644dc1c";

export default node;
