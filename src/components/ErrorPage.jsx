import { Link } from "react-router"

export default function ErrorPage() {
    return (
        <div>
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Go back to Home</Link>
        </div>
    )
}