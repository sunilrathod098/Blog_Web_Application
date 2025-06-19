    import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import BlogCreatePage from "./pages/Blog/BlogCreatePage";
import BlogDetailPage from "./pages/Blog/BlogDetailPage";
import BlogEditPage from "./pages/Blog/BlogEditPage";
import BlogListPage from "./pages/Blog/BlogListPage";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <BlogProvider>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />

                            {/* Protected Routes */}
                            <Route element={<PrivateRoute />}>
                                <Route path="/blog" element={<BlogListPage />} />
                                <Route path="/blog/create" element={<BlogCreatePage />} />
                                <Route path="/blog/:id" element={<BlogDetailPage />} />
                                <Route path="/blog/edit/:id" element={<BlogEditPage />} />
                            </Route>
                        </Routes>
                    </Layout>
                </BlogProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
