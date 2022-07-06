/**
 * @generated SignedSource<<dd1efbda8b2ef1d550ca2d99055f71ab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VerificationsOverrides_identityVerification$data = {
  readonly id: string;
  readonly internalID: string;
  readonly overrides: ReadonlyArray<{
    readonly createdAt: string | null;
    readonly newState: string;
    readonly oldState: string;
    readonly reason: string;
    readonly userID: string | null;
    readonly creator: {
      readonly email: string;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "VerificationsOverrides_identityVerification";
};
export type VerificationsOverrides_identityVerification$key = {
  readonly " $data"?: VerificationsOverrides_identityVerification$data;
  readonly " $fragmentSpreads": FragmentRefs<"VerificationsOverrides_identityVerification">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VerificationsOverrides_identityVerification",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "IdentityVerificationOverride",
      "kind": "LinkedField",
      "name": "overrides",
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
          "name": "newState",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "oldState",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "reason",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "userID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "creator",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "email",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "IdentityVerification",
  "abstractKey": null
};

(node as any).hash = "6e7d65287dfe4d1a576bfd272661dae4";

export default node;
