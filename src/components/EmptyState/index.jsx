import './index.css'

const EmptyState = () => {
  return (
    <div className="empty-state--container">
      <p className="empty-state--ascii-logo">&#9785;</p>
      <p>You don not have any Todo yet, let`s add some!</p>
    </div>
  )
}

export default EmptyState
