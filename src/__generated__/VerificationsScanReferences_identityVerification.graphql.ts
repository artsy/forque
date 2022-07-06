/**
 * @generated SignedSource<<f00cde4d61ea13edb16b418f33deba78>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VerificationsScanReferences_identityVerification$data = {
  readonly id: string;
  readonly internalID: string;
  readonly scanReferences: ReadonlyArray<{
    readonly createdAt: string | null;
    readonly extractedFirstName: string | null;
    readonly extractedLastName: string | null;
    readonly extractedIdFailReason: string | null;
    readonly extractedSimilarityFailReason: string | null;
    readonly finishedAt: string | null;
    readonly id: string;
    readonly internalID: string;
    readonly jumioID: string;
    readonly result: string | null;
  } | null> | null;
  readonly " $fragmentType": "VerificationsScanReferences_identityVerification";
};
export type VerificationsScanReferences_identityVerification$key = {
  readonly " $data"?: VerificationsScanReferences_identityVerification$data;
  readonly " $fragmentSpreads": FragmentRefs<"VerificationsScanReferences_identityVerification">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VerificationsScanReferences_identityVerification",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "IdentityVerificationScanReference",
      "kind": "LinkedField",
      "name": "scanReferences",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "createdAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "extractedFirstName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "extractedLastName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "extractedIdFailReason",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "extractedSimilarityFailReason",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "finishedAt",
          "storageKey": null
        },
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "jumioID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "result",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "IdentityVerification",
  "abstractKey": null
};
})();

(node as any).hash = "3bd386f7241edd2969e2bc6e23019276";

export default node;
