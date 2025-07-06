import {  Route, Routes } from "react-router-dom";

import CreateArticle from '@Article/CreateArticle';
import EditArticle from '@Article/EditArticle';
import ShowArticle from '@Article/ShowArticle';



function RoutesContainer() {

    return (
        <Routes>
            <Route path="/" element={<ShowArticle />} />
            <Route path="/edit-article/:id" element={<EditArticle />} />
            <Route path="/create-article" element={<CreateArticle />} />
        </Routes>
    )
}

export default RoutesContainer