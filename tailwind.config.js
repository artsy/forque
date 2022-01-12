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
  },
  fontSize: {
    ...getTailwindFontSizes(paletteTokensV3.textVariants),
  },
  spacing: {
    0: "0px",
    ...paletteTokensV3.space,
  },
  colors: {
    ...paletteTokensV3.colors,
  },
}

module.exports = {
  content: ["./{pages,components}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    ...tailwindCompatibleTheme,
    extend: {},
  },
  plugins: [],
}
