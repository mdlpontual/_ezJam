import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <>
            <h1>404 Page not Found</h1>
            <Link to='/'>Home</Link>
        </>
    );
}

export default NotFoundPage;