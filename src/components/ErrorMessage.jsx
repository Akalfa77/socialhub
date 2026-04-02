export default function ErrorMessage({ message, onRetry, title }) {
    return (
        <div className="error-container">
            <div className="error-icon">&#10060;</div>
            <h2 className="error-title">
                {title || "Something went wrong!"}
            </h2>
            {message && (
                <p className="error-message">{message}</p>
            )}

            {onRetry && (
                <button className="btn btn-primary" onClick={onRetry}>
                    &#8635; Try Again
                </button>
            )}
        </div>
    );
}
