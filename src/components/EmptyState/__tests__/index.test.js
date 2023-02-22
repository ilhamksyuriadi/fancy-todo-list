import { render, screen } from '@testing-library/react'
import EmptyState from '..'

describe('EmptyState', () => {
  it('EmptyState should render correctly', () => {
    render(<EmptyState />)
    const emptyStateText = screen.getByText(
      'You don not have any Todo yet, let`s add some!',
    )
    expect(emptyStateText).toBeInTheDocument()
  })
})
