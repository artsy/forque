/**
 * @generated SignedSource<<82a2f039ac7b1537cf9d0be240e151a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistName_artist$data = {
  readonly name: string | null;
  readonly " $fragmentType": "ArtistName_artist";
};
export type ArtistName_artist$key = {
  readonly " $data"?: ArtistName_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistName_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistName_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "f9438582a740047df29c923c4bc09578";

export default node;
