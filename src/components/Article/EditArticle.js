// src/components/EditArticle.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api"; // Import the api instance
import Loader from "../Common/Loader";
import "./Article.css";

const EditArticle = () => {
  const [article, setArticle] = useState({});
  const [articleImage, setArticleImage] = useState(null); // To hold the selected image file
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getArticleApi = "/article"; // Use relative URL

  useEffect(() => {
    getArticle();
  }, [id]);

  const getArticle = () => {
    setIsLoading(true);
    api
      .get(`${getArticleApi}/${id}`)
      .then((response) => {
        const { data } = response.data;
        setArticle(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch article");
        setIsLoading(false);
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleImageChange = (e) => {
    setArticleImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Creating form data to include text fields and image
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("content", article.content);
    if (articleImage) {
      formData.append("article_cover_img", articleImage);
    }

    api
      .post(`${getArticleApi}/${id}?_method=PUT`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setIsLoading(false);
        navigate("/");
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
        <div className="mb-3 mt-3">
          <label htmlFor="article_cover_img" className="form-label">
            Article Cover Image
          </label>
          <input
            type="file"
            className="form-control"
            id="article_cover_img"
            name="article_cover_img"
            accept="image/*"
            onChange={handleImageChange}
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
