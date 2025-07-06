// src/components/EditArticle.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import '@Article/css/Article.css';

import Loader from "@components/Loader";

import { useArticleQuery, useUpdateArticleMutation } from "@queries/article";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [localArticle, setLocalArticle] = useState({ title: '', content: '' });
  const [articleImage, setArticleImage] = useState(null); // To hold the selected image file
  const [localError, setLocalError] = useState(null);




  const { data, isLoading, isError, error } = useArticleQuery(id);
  const { mutate: updateArticle, isPending: isUpdating } = useUpdateArticleMutation();

  useEffect(() => {
    if (data) {
      setLocalArticle({ title: data.title, content: data.content });
    }
  }, [data]);


  const handleInput = (e) => {
    const { name, value } = e.target;
    setLocalArticle((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setArticleImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creating form data to include text fields and image
    const formData = new FormData();
    formData.append("title", localArticle.title);
    formData.append("content", localArticle.content);
    if (articleImage) {
      formData.append("article_cover_img", articleImage);
    }
    updateArticle(
      { id, formData },
      {
        onSuccess: () => navigate('/'),
        onError: (err) => setLocalError(err.message),
      }
    );
  };

  return (
    <div className="article-form">
      <div className="heading">
        {(isLoading || isUpdating) && <Loader />}
        {(isError || localError) && (
          <p>Error: {error?.message || localError}</p>
        )}
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
            value={localArticle.title || ""}
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
            value={localArticle.content || ""}
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
