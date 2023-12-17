import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormComponent from "./components/FormComponent";
import App from "./App";
import SingleComponent from "./components/SingleComponent";
import EditFormComponent from "./components/EditComponent";

const MyRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/create" element={<FormComponent />} />
                <Route path="/blog/:slug" element={<SingleComponent />} />
                <Route path="/blog/edit/:slug" element={<EditFormComponent />} />
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoute;