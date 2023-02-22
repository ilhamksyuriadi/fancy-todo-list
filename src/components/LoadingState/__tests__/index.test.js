import { render, screen } from '@testing-library/react'
import LoadingState from '..'

describe('LoadingState', () => {
  it('LoadingState should render correctly', () => {
    render(<LoadingState />)
    const loadingStateText = screen.getByText('Please wait...')
    expect(loadingStateText).toBeInTheDocument()
  })
})
