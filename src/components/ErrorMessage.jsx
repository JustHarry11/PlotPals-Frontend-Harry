export default function ErrorMessage({ message }) {
    if (!message) return ''

    return (
        <div className="error">
            <p>{message}</p>
        </div>
    )
}