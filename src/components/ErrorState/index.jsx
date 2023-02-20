import './index.css'

const ErrorState = () => {
  const handleClickReload = () => {
    window.location.reload()
  }

  return (
    <div className="error-state--container">
      <div className="error-state--content-container">
        <p className="error-state--ascii-logo">&#127784;</p>
        <p>Oops!, something goes wrong. Please reload the page.</p>
        <button
          onClick={handleClickReload}
          type="button"
          className="error-state--button-reload"
        >
          Reload
        </button>
      </div>
    </div>
  )
}

export default ErrorState
