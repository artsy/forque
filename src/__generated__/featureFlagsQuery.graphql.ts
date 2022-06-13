/**
 * @generated SignedSource<<ebc59de9520aa6a575bc3499a30561ea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type featureFlagsQuery$variables = {};
export type featureFlagsQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"FeatureFlagsTable_featureFlag">;
  } | null;
};
export type featureFlagsQuery = {
  variables: featureFlagsQuery$variables;
  response: featureFlagsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "enabled",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "featureFlagsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FeatureFlagsTable_featureFlag"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "featureFlagsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Admin",
            "kind": "LinkedField",
            "name": "admin",
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
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "stale",
                    "storageKey": null
                  },
                  (v1/*: any*/),
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
                      (v1/*: any*/),
                      (v0/*: any*/)
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
                      (v0/*: any*/),
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
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6ce3743d556e00eb4167f6a1c22be2ae",
    "id": null,
    "metadata": {},
    "name": "featureFlagsQuery",
    "operationKind": "query",
    "text": "query featureFlagsQuery {\n  viewer {\n    ...FeatureFlagsTable_featureFlag\n  }\n}\n\nfragment FeatureFlagsTable_featureFlag on Viewer {\n  admin {\n    featureFlags {\n      name\n      stale\n      enabled\n      description\n      impressionData\n      type\n      createdAt(format: \"MMM DD, YYYY\")\n      environments {\n        enabled\n        name\n      }\n      variants {\n        name\n        stickiness\n        weight\n        weightType\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "876c472a6ee4972c292afdc5e4855648";

export default node;
