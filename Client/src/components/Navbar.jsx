import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('accessToken');

    const logout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">BlogApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create">Create Blog</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/myblogs">My Blogs</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <form className="d-flex" role="search">
                        {isLoggedIn ? (
                            <button onClick={logout} className="btn btn-outline-success">Logout</button>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-success me-2">Login</Link>
                                <Link to="/register" className="btn btn-outline-success">Register</Link>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </nav>
    )
}