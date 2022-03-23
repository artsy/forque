import React from "react"
import { State } from "./state"

export interface Props {
  state: State
}

/**
 * Prose summary of the state of the artist merger, as we build it up.
 */
export const Feedback: React.FC<Props> = ({ state }) => {
  const goodRecord = state.dupes.find(
    (dupe) => state.goodId === dupe.internalID
  )
  const badRecords =
    state.dupes.filter((dupe) => state.badIds.includes(dupe.internalID)) || []
  const dupeCount = state.dupes.length
  const overrides = Object.values(state.overrides).filter((x) => x)

  return (
    <div className="mb-4 text-black60">
      {!goodRecord && !badRecords.length && dupeCount > 1 && (
        <span>The following cluster of {dupeCount} dupes was found.</span>
      )}

      {goodRecord && (
        <span>
          Keeping <strong className="text-green100">{goodRecord?.slug}</strong>.
        </span>
      )}

      {badRecords.length > 0 && (
        <span className="ml-0.5">
          Discarding{" "}
          <span>
            {badRecords.map((loser) => (
              <strong
                key={loser.internalID}
                className="text-red100 after:content-[',_'] last:after:content-none"
              >
                {loser?.slug}
              </strong>
            ))}
            .
          </span>
        </span>
      )}

      {overrides.length > 0 && (
        <span className="ml-0.5">Overriding {overrides.length} fields.</span>
      )}
    </div>
  )
}
