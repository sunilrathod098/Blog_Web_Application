import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import LoginPage from "./services/pages/Auth/LoginPage";
import RegisterPage from "./services/pages/Auth/RegisterPage";
import BlogCreatePage from "./services/pages/Blog/BlogCreatePage";
import BlogDetailPage from "./services/pages/Blog/BlogDetailPage";
import BlogEditPage from "./services/pages/Blog/BlogEditPage";
import BlogListPage from "./services/pages/Blog/BlogListPage";
import HomePage from "./services/pages/HomePage";

const App = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/blogs" element={<BlogListPage />} />
                        <Route path="/blog/:id" element={<BlogDetailPage />} />

                        {/* Protected routes */}
                        <Route element={<PrivateRoute />}>
                            <Route path="/blog/create" element={<BlogCreatePage />} />
                            <Route path="/blog/edit/:id" element={<BlogEditPage />} />
                        </Route>
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
