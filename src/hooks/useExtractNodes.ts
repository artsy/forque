export function useExtractNodes<Node extends object, T = Node>(
  connection:
    | {
        readonly edges?: ReadonlyArray<{
          readonly node?: Node | null
        } | null> | null
      }
    | undefined
    | null,
  mapper?: (node: Node) => T
): T[] {
  return (
    connection?.edges?.map((edge) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      mapper ? (mapper(edge?.node!) as any) : edge?.node
    ) ?? []
  )
}
