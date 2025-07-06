import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loader from '@components/Loader';

import '@Article/css/Article.css';
import { EMPTY_ARTICLE } from '@constants/Article';
import { useCreateArticleMutation } from '@queries/article';

const CreateArticle = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [article, setArticle] = useState(EMPTY_ARTICLE);
  const [articleImage, setArticleImage] = useState(null);
  const { mutate: createArticle, isPending: isLoading } = useCreateArticleMutation();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
  };

  const handleImageChange = (event) => {
    setArticleImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('content', article.content);
    if (articleImage) {
      formData.append('article_cover_img', articleImage);
    }

    createArticle(formData, {
      onSuccess: () => {
        setArticle(EMPTY_ARTICLE);
        setArticleImage(null);
      },
      onError: (error) => {
        console.error('Article creation failed!');
        setError(error.message || 'Something went wrong.');
      },
    });
  };


  return (
    <div className='article-form'>
      <div className='heading'>
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Article Form</p>
        <p>We can upload image to async and queue to make it faster to upload to S3</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={article.title}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={article.content}
            onChange={handleInput}
          ></textarea>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="article_cover_img" className="form-label">Article Cover Image</label>
          <input
            type="file"
            className="form-control"
            id="article_cover_img"
            name="article_cover_img"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default CreateArticle;
