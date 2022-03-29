/**
 * @generated SignedSource<<138bee324ebdf2230a49e5731bf6dc16>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSlugQuery$variables = {
  artistSlug: string;
};
export type ArtistSlugQuery$data = {
  readonly me: {
    readonly name: string | null;
  } | null;
  readonly artist: {
    readonly bio: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"ArtistName_artist">;
  } | null;
};
export type ArtistSlugQuery = {
  variables: ArtistSlugQuery$variables;
  response: ArtistSlugQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistSlug"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistSlug"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bio",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistSlugQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistName_artist"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtistSlugQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d9e65a4a0a5092aa7bd1123b9a5bd3ef",
    "id": null,
    "metadata": {},
    "name": "ArtistSlugQuery",
    "operationKind": "query",
    "text": "query ArtistSlugQuery(\n  $artistSlug: String!\n) {\n  me {\n    name\n    id\n  }\n  artist(id: $artistSlug) {\n    ...ArtistName_artist\n    bio\n    id\n  }\n}\n\nfragment ArtistName_artist on Artist {\n  name\n}\n"
  }
};
})();

(node as any).hash = "67ef23eb8e16001c5852c6861ab133ae";

export default node;
