import { BrowserRouter, Route, Routes } from "react-router-dom"; // Fixed import

import CreateHistory from "../pages/CreateHistory";
import Chat from "../pages/Chat";
import Home from "../pages/Home";
import FlipbookPage from "../pages/FlipbookPage";
import HistoryView from "../pages/HistoryView";
import StoriesPage from "../pages/StoriesPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainTemplate from "../templates/MainTemplate";
import { AuthProvider } from "../context/AuthProvider";
import PrivateRoute from "../components/PrivateRoute";

export default function MainRouter(){
    return(
        <BrowserRouter>
            <AuthProvider>
                <MainTemplate>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        
                        {/* Protected Routes */}
                        <Route path="/create-history" element={<PrivateRoute><CreateHistory/></PrivateRoute>}/>
                        <Route path="/flipbook" element={<PrivateRoute><FlipbookPage /></PrivateRoute>} />
                        <Route path="/history-view" element={<PrivateRoute><HistoryView /></PrivateRoute>} />
                        <Route path="/stories-page" element={<PrivateRoute><StoriesPage /></PrivateRoute>} />
                        <Route path="/chat" element={<PrivateRoute><Chat/></PrivateRoute>}/>
                    </Routes>
                </MainTemplate>
            </AuthProvider>
        </BrowserRouter>
    )
}