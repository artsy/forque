/* eslint-disable @typescript-eslint/no-var-requires */
const paletteTokensV3 = require("@artsy/palette-tokens").THEMES.v3

function getTailwindFontSizes(textVariants) {
  const entries = Object.entries(textVariants)
  const fontSizeMap = entries.reduce((map, variant) => {
    const [sizeKey, cssAttributes] = variant
    const { fontSize, ...otherCssAttributes } = cssAttributes
    map[sizeKey] = [fontSize, otherCssAttributes]
    return map
  }, {})
  return fontSizeMap
}

const tailwindCompatibleTheme = {
  fontFamily: {
    ...paletteTokensV3.fonts,
    mono: "monospace",
  },
  fontSize: {
    ...getTailwindFontSizes(paletteTokensV3.textVariants),
    std: ["20px", { lineHeight: "1.33" }],
  },
  spacing: {
    0: "0px",
    ...paletteTokensV3.space,
  },
  colors: {
    ...paletteTokensV3.colors,
    black50: "#999",
    green5: "hsl(100,50%,97%)",
    red5: "hsl(0,50%,97%)",
  },
}

module.exports = {
  content: ["./src/{pages,components}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    ...tailwindCompatibleTheme,
    extend: {},
  },
  plugins: [],
}
