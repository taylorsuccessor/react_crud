import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Article.css";

const EditArticle = () => {
  const [article, setArticle] = useState({});
  const [articleImage, setArticleImage] = useState(null); // To hold the selected image file
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getArticleApi = "http://localhost:8000/api/article";
  const authToken = "1|n750kP7nLDZcNduwK7EhLHSQGOekPQt07UlQeajE1f22573c";

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
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setArticleImage(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Creating JSON payload to include text fields and Base64-encoded image
    const articleData = {
      title: article.title,
      content: article.content,
      article_cover_img: articleImage,
    };

    try {
      const response = await fetch(`${getArticleApi}/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Article updated:', data);
        navigate(`/show-article/${id}`);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update article');
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
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
