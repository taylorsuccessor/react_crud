import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Article.css"; // Assuming you have a CSS file for articles

const EditArticle = () => {
  const [article, setArticle] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getArticleApi = "http://localhost:3000/api/article";
  const authToken = "1|n750kP7nLDZcNduwK7EhLHSQGOekPQt07UlQeajE1f22573c"; // Replace with your actual token

  useEffect(() => {
    getArticle();
  }, [id]);

  const getArticle = () => {
    setIsLoading(true);
    axios
      .get(`${getArticleApi}/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setArticle(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch article");
        setIsLoading(false);
      });
  };

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(`${getArticleApi}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(article),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        navigate("/show-article"); // Redirect to a list of articles or any other route
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="article-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Edit Article</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={article.title || ""}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={article.content || ""}
            onChange={handleInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          EDIT
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
