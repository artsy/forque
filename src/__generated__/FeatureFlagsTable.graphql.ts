/**
 * @generated SignedSource<<0156fcb5d6e8c2dac06e0eb8ac3db3c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeatureFlagsTable$data = {
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
  readonly " $fragmentType": "FeatureFlagsTable";
};
export type FeatureFlagsTable$key = {
  readonly " $data"?: FeatureFlagsTable$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureFlagsTable">;
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
  "metadata": null,
  "name": "FeatureFlagsTable",
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
  "type": "FeatureFlag",
  "abstractKey": null
};
})();

(node as any).hash = "3980313535043914a12d23eecadb98df";

export default node;
