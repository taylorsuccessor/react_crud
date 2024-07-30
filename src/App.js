import "./App.css";
import { Route, Routes } from "react-router-dom";
import EditArticle from "./components/Article/EditArticle";
import Header from "./components/Common/Header";
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
            <Route path="/edit-article/:id" element={<EditArticle />} />
            <Route path="/create-article" element={<CreateArticle />} />
          </Routes>
          
        </div>
      </header>
    </div>
  );
}

export default App;
