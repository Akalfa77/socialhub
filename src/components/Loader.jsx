export default function Loader({ message }) {

    return (
        <div className="loader-container">
            <div className="loader-spinner"></div>
            <p className="loader-text">
                {message || "Loading..."}
            </p>
        </div>
    );
}