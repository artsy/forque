/**
 * @generated SignedSource<<718b06289f75decd26b648043957093b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type FeatureFlagsType = "EXPERIMENT" | "RELEASE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type FeatureFlagsTable_featureFlag$data = {
  readonly admin: {
    readonly featureFlags: ReadonlyArray<{
      readonly name: string | null;
      readonly stale: boolean | null;
      readonly enabled: boolean | null;
      readonly description: string | null;
      readonly impressionData: boolean | null;
      readonly type: FeatureFlagsType | null;
      readonly createdAt: string | null;
      readonly environments: ReadonlyArray<{
        readonly enabled: boolean | null;
        readonly name: string | null;
      } | null> | null;
      readonly variants: ReadonlyArray<{
        readonly name: string | null;
        readonly stickiness: string | null;
        readonly weight: number | null;
        readonly weightType: string | null;
      } | null> | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "FeatureFlagsTable_featureFlag";
};
export type FeatureFlagsTable_featureFlag$key = {
  readonly " $data"?: FeatureFlagsTable_featureFlag$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureFlagsTable_featureFlag">;
};

const node: ReaderFragment = (function(){
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
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "viewer"
      ],
      "operation": require('./FeatureFlagsTableQuery.graphql')
    }
  },
  "name": "FeatureFlagsTable_featureFlag",
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
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "6b0ac17d41cfe0593f45522c1fab0132";

export default node;
