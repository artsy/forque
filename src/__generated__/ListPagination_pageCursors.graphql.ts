/**
 * @generated SignedSource<<ebd239cef135a5fa05bd7df0bfb32124>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListPagination_pageCursors$data = {
  readonly around: ReadonlyArray<{
    readonly cursor: string;
    readonly page: number;
    readonly isCurrent: boolean;
  }>;
  readonly first: {
    readonly cursor: string;
    readonly page: number;
    readonly isCurrent: boolean;
  } | null;
  readonly last: {
    readonly cursor: string;
    readonly page: number;
    readonly isCurrent: boolean;
  } | null;
  readonly previous: {
    readonly cursor: string;
    readonly page: number;
  } | null;
  readonly " $fragmentType": "ListPagination_pageCursors";
};
export type ListPagination_pageCursors$key = {
  readonly " $data"?: ListPagination_pageCursors$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListPagination_pageCursors">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListPagination_pageCursors",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PageCursor",
      "kind": "LinkedField",
      "name": "around",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PageCursor",
      "kind": "LinkedField",
      "name": "first",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PageCursor",
      "kind": "LinkedField",
      "name": "last",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PageCursor",
      "kind": "LinkedField",
      "name": "previous",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "PageCursors",
  "abstractKey": null
};
})();

(node as any).hash = "f86d9160ebe6b6211322355791bb1c20";

export default node;
