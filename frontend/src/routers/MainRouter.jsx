import { BrowserRouter, Route, Routes } from "react-router";

import CreateHistory from "../pages/CreateHistory";
import Chat from "../pages/Chat";
import Home from "../pages/Home";
import FlipbookPage from "../pages/FlipbookPage";
import HistoryView from "../pages/HistoryView";
import StoriesPage from "../pages/StoriesPage";
import MainTemplate from "../templates/MainTemplate";

export default function MainRouter(){
    return(
        <BrowserRouter>
            <MainTemplate>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/create-history" element={<CreateHistory/>}/>
                    <Route path="/flipbook" element={<FlipbookPage />} />
                    <Route path="/history-view" element={<HistoryView />} />
                    <Route path="/stories-page" element={<StoriesPage />} />
                    <Route path="/chat" element={<Chat/>}/>
                </Routes>
            </MainTemplate>
        </BrowserRouter>
    )
}