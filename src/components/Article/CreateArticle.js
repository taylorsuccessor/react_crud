import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Loader from '../Common/Loader';
import './Article.css';

const CreateArticle = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState({
    title: '',
    content: '',
  });
  const [articleImage, setArticleImage] = useState(null);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
  };

  const handleImageChange = (event) => {
    setArticleImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('content', article.content);
    if (articleImage) {
      formData.append('article_cover_img', articleImage);
    }

    try {
      const response = await api.post('/article', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Article created successfully!');
        setArticle({ title: '', content: '' });
        setArticleImage(null);
        navigate('/');
      } else {
        console.error('Article creation failed!');
        setError('Article creation failed!');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='article-form'>
      <div className='heading'>
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Article Form</p>
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
