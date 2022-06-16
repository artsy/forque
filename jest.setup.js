import * as jest from "jest"
import "regenerator-runtime" // relay network requirement
import "@testing-library/jest-dom"

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {},
}))
