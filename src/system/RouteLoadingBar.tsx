import { THEME_V3 } from "@artsy/palette"
import NextNProgress from "nextjs-progressbar"

export const RouteLoadingBar: React.FC = () => {
  return (
    <NextNProgress
      color={THEME_V3.colors.white100}
      startPosition={Math.random() * 1}
      height={1}
      options={{
        easing: "ease-in-out",
        speed: 700,
        minimum: 0.5,
        showSpinner: false,
      }}
    />
  )
}
