/**
 * @generated SignedSource<<3ebd23523751df71ae875bf6a98cd75a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type featureFlagsQuery$variables = {};
export type featureFlagsQuery$data = {
  readonly admin: {
    readonly featureFlags: ReadonlyArray<{
      readonly name: string | null;
      readonly enabled: boolean | null;
      readonly createdAt: string | null;
    } | null> | null;
  } | null;
};
export type featureFlagsQuery = {
  variables: featureFlagsQuery$variables;
  response: featureFlagsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
        "concreteType": "FeatureFlags",
        "kind": "LinkedField",
        "name": "featureFlags",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "enabled",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "featureFlagsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "featureFlagsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "42514a2e962e83b7780bfed73e7697d2",
    "id": null,
    "metadata": {},
    "name": "featureFlagsQuery",
    "operationKind": "query",
    "text": "query featureFlagsQuery {\n  admin {\n    featureFlags {\n      name\n      enabled\n      createdAt(format: \"MMM DD, YYYY\")\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7c188aa7cd7c39d85499f7b5c349c174";

export default node;
