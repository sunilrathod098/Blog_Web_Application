import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BlogCreate from "./pages/BlogCreate";
import BlogDetail from "./pages/BlogDetail";
import BlogList from "./pages/BlogList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BlogEdit from './pages/BlogEdit'; // Uncomment if implemented

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container mx-auto px-4">
                <Routes>
                    <Route path="/" element={<BlogList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/blogs/:id" element={<BlogDetail />} />
                    <Route path="/create" element={<BlogCreate />} />
                    <Route path="/blogs/edit/:id" element={<BlogEdit />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
