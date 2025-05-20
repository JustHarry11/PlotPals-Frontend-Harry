export default function ErrorMessage({ message }) {
    if (!message) return ''

    return (
        <div className="error-message">
            <p>{message}</p>
        </div>
    )
}