import { Link } from "react-router-dom";

function HomePage() {
    return (
        <>
            <h1>Home Page</h1>
            <Link to='/loginpage'>to Login Page</Link>
        </>
    );
}

export default HomePage;