import { act, fireEvent, render, screen } from '@testing-library/react'
import ErrorState from '..'

describe('ErrorState', () => {
  const original = window.location

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    })
  })

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: original,
    })
  })

  it('ErrorState should render correctly', () => {
    render(<ErrorState />)
    const errorStateText = screen.getByText(
      'Oops!, something goes wrong. Please reload the page.',
    )
    expect(errorStateText).toBeInTheDocument()
  })

  it('ErrorState reload button clicked and trigger reload', () => {
    render(<ErrorState />)
    const reloadButton = screen.getByText('Reload')
    act(() => {
      fireEvent.click(reloadButton)
    })
    expect(window.location.reload).toHaveBeenCalled()
  })
})
