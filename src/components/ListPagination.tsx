import { graphql, RefetchFnDynamic, useFragment } from "react-relay"
import { Pagination } from "@artsy/palette"
import { ListPagination_pageCursors$key } from "__generated__/ListPagination_pageCursors.graphql"

const REFETCH_PAGE_SIZE = 25

interface PaginationProps {
  pageCursors: ListPagination_pageCursors$key
  pageInfo: { hasNextPage: boolean; endCursor: string | null }
  relayRefetch: RefetchFnDynamic<any, any>
  additionalRefetchArgs?: { [key: string]: any }
}

export const ListPagination: React.FC<PaginationProps> = ({
  pageCursors,
  pageInfo,
  relayRefetch,
  additionalRefetchArgs = {},
}) => {
  const pageCursorsData = useFragment(
    graphql`
      fragment ListPagination_pageCursors on PageCursors {
        around {
          cursor
          page
          isCurrent
        }
        first {
          cursor
          page
          isCurrent
        }
        last {
          cursor
          page
          isCurrent
        }
        previous {
          cursor
          page
        }
      }
    `,
    pageCursors
  )

  if (pageCursorsData.around.length === 1) {
    return null
  }

  const handleNext = () => {
    const { hasNextPage, endCursor } = pageInfo

    if (hasNextPage && endCursor) {
      loadAfter(endCursor)
    }
  }

  const loadAfter = (cursor: string, _page?: number) => {
    relayRefetch(
      {
        first: REFETCH_PAGE_SIZE,
        after: cursor,
        // before: null,
        // last: null,
        ...additionalRefetchArgs,
      },
      {
        onComplete: (error) => {
          if (error) {
            console.error("[ListPagination] Error:", error)
          }
        },
      }
    )
  }

  return (
    <>
      <Pagination
        hasNextPage={pageInfo.hasNextPage}
        onClick={loadAfter}
        onNext={handleNext}
        pageCursors={pageCursorsData as any}
      />
    </>
  )
}
