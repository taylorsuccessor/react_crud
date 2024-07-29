import "./App.css";
import CreateUser from "./components/User/CreateUser";
import ShowUser from "./components/User/ShowUser";
import { Route, Routes } from "react-router-dom";
import EditArticle from "./components/Article/EditArticle";
import User from "./components/User/User";
import Header from "./components/Common/Header";
import Home from "./components/Layout/Home";
import ShowArticle from "./components/Article/ShowArticle";
import CreateArticle from "./components/Article/CreateArticle";
function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
          
            <Route path="/" element={<ShowArticle />} />
            <Route path="/front-end/edit-user/:id" element={<EditArticle />} />
            <Route path="/front-end/create-article" element={<CreateArticle />} />
          </Routes>
          
        </div>
      </header>
    </div>
  );
}

export default App;
