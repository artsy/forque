/**
 * @generated SignedSource<<653a3e5dc4fb4f68c39c8678f2dc8170>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VerificationsList_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"VerificationsTable_viewer">;
  readonly " $fragmentType": "VerificationsList_viewer";
};
export type VerificationsList_viewer$key = {
  readonly " $data"?: VerificationsList_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"VerificationsList_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VerificationsList_viewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Literal",
          "name": "email",
          "value": "foo@bar.com"
        }
      ],
      "kind": "FragmentSpread",
      "name": "VerificationsTable_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "4b042561dc62be80984ecb7cc14efaa2";

export default node;
