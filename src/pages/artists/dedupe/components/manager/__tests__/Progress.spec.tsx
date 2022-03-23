import React, { Dispatch } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Progress } from "../Progress"
import { Action, initialState, State, Step } from "../state"

let dispatch: jest.MockedFunction<Dispatch<Action>>
let state: State

beforeEach(() => {
  dispatch = jest.fn()
})

it("renders step 1", () => {
  state = { ...initialState, currentStep: Step.SELECT_GOOD_RECORD }
  render(<Progress state={state} dispatch={dispatch} />)

  const step = screen.getByText(/1. Select good record/)
  expect(step).toHaveAttribute("data-test-is-current-step", "true")
})

it("renders step 2", () => {
  state = { ...initialState, currentStep: Step.SELECT_BAD_RECORD }
  render(<Progress state={state} dispatch={dispatch} />)

  const step = screen.getByText(/2. Select bad records/)
  expect(step).toHaveAttribute("data-test-is-current-step", "true")
})

it("renders step 3", () => {
  state = { ...initialState, currentStep: Step.SELECT_FIELDS }
  render(<Progress state={state} dispatch={dispatch} />)

  const step = screen.getByText(/3. Select data to merge/)
  expect(step).toHaveAttribute("data-test-is-current-step", "true")
})

it("renders controls", () => {
  state = { ...initialState, currentStep: Step.SELECT_GOOD_RECORD }
  render(<Progress state={state} dispatch={dispatch} />)

  screen.getByRole("button", { name: /Reset/ })
  screen.getByRole("button", { name: /Continue/ })
})

it("allows reset", () => {
  state = { ...initialState, currentStep: Step.SELECT_GOOD_RECORD }
  render(<Progress state={state} dispatch={dispatch} />)

  userEvent.click(screen.getByRole("button", { name: /Reset/ }))

  expect(dispatch).toHaveBeenCalledWith({ type: "reset" } as Action)
})
