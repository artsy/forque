import tailwind from "../tailwind.config"

export default function Palette() {
  return (
    <div className="container mx-auto my-4 w-1/2">
      <h1 className="text-xxl text-black30">Palette tokens for Tailwind</h1>
      <Typography />
      <Spacing />
      <Color />
    </div>
  )
}

/* components */

const Section: React.FC = ({ children }) => (
  <div className="mt-4 first:mt-0">{children}</div>
)

const Heading: React.FC = ({ children }) => (
  <h2 className="text-xl text-black30 border-b-[1px] my-2 py-2">{children}</h2>
)

/* sections */

const Typography = () => (
  <Section>
    <Heading>Typography</Heading>

    <div className="mt-2 text-md text-black60">text-xs</div>
    <div className="text-xs">Pack my box with five dozen liquor jugs</div>

    <div className="mt-2 text-md text-black60">text-sm</div>
    <div className="text-sm">Pack my box with five dozen liquor jugs</div>

    <div className="mt-2 text-md text-black60">text-md</div>
    <div className="text-md">Pack my box with five dozen liquor jugs</div>

    <div className="mt-2 text-md text-black60">text-lg</div>
    <div className="text-lg">Pack my box with five dozen liquor jugs</div>

    <div className="mt-2 text-md text-black60">text-xl</div>
    <div className="text-xl">Pack my box with five dozen liquor jugs</div>

    <div className="mt-2 text-md text-black60">text-xxl</div>
    <div className="text-xxl">Pack my box with five dozen liquor jugs</div>
  </Section>
)

const Spacing = () => (
  <Section>
    <Heading>Spacing</Heading>

    <table className="border-separate [border-spacing:1em]">
      <thead>
        <tr>
          <th className="text-left">Name</th>
          <th className="text-left">Size</th>
          <th className="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="font-bold">0.5</td>
          <td className="text-black60">5px</td>
          <td>
            <div className="h-[1em] bg-brand w-0.5"></div>
          </td>
        </tr>

        <tr>
          <td className="font-bold">1</td>
          <td className="text-black60">10px</td>
          <td>
            <div className="h-[1em] bg-brand w-1"></div>
          </td>
        </tr>

        <tr>
          <td className="font-bold">2</td>
          <td className="text-black60">20px</td>
          <td>
            <div className="h-[1em] bg-brand w-2"></div>
          </td>
        </tr>

        <tr>
          <td className="font-bold">4</td>
          <td className="text-black60">40px</td>
          <td>
            <div className="h-[1em] bg-brand w-4"></div>
          </td>
        </tr>

        <tr>
          <td className="font-bold">6</td>
          <td className="text-black60">60px</td>
          <td>
            <div className="h-[1em] bg-brand w-6"></div>
          </td>
        </tr>

        <tr>
          <td className="font-bold">12</td>
          <td className="text-black60">120p</td>
          <td>
            <div className="h-[1em] bg-brand w-12"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </Section>
)

const Color = () => (
  <Section>
    <Heading>Color</Heading>

    <div className="flex mt-4 mb-1">
      <Chip bgColor="bg-white100" outline />
      <Chip bgColor="bg-black5" />
      <Chip bgColor="bg-black10" />
      <Chip bgColor="bg-black15" />
      <Chip bgColor="bg-black30" />
      <Chip bgColor="bg-black60" />
      <Chip bgColor="bg-black100" />
    </div>

    <div className="flex mb-1">
      <Chip bgColor="bg-blue10" />
      <Chip bgColor="bg-blue100" />
      <Chip bgColor="bg-brand" />
    </div>

    <div className="flex mb-1">
      <Chip bgColor="bg-copper10" />
      <Chip bgColor="bg-copper100" />
    </div>

    <div className="flex mb-1">
      <Chip bgColor="bg-green10" />
      <Chip bgColor="bg-green100" />
    </div>

    <div className="flex mb-1">
      <Chip bgColor="bg-red10" />
      <Chip bgColor="bg-red100" />
    </div>
  </Section>
)

const Chip: React.FC<{
  bgColor: string
  outline?: boolean
}> = ({ bgColor, outline, ...rest }) => {
  const colorName = bgColor.substring(3)
  return (
    <div className="mr-2 mb-2">
      <div
        {...rest}
        className={`
        w-[6rem]
        h-[6rem]
        p-2
        ${bgColor}
        ${outline ? "border-black10 border-2" : ""}
    `}
      ></div>
      <div className="text-black60 font-bold">{colorName}</div>
      <div className="text-black30">{tailwind.theme.colors[colorName]}</div>
    </div>
  )
}
