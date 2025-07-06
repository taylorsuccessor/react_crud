import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from '@services/api';
import config from "@config/config";
import Loader from "@components/Loader";

import defaultImage from "@assets/img/default-image.png";

const ShowArticle = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await api.delete(`/article/${id}`);
      if (response.status === 200) {
        setArticles(articles.filter((item) => item.id !== id));
      } else {
        throw new Error("Failed to delete item");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const response = await api.get("/article");
      const { data } = response.data;
      setArticles(data);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch articles.");
    }
  };

  const handleImageError = (e) => {
    e.target.src = defaultImage; // Set default image on error
  };

  if (articles.length === 0) {
    return <h1>No articles found</h1>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Cover Image</th>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((item) => (
              <tr key={item.id}>

                <td>
                  <img
                    src={item.article_cover_img ? `${config.imageBaseUrl}${item.article_cover_img}` : defaultImage}
                    alt={item.title}
                    style={{ width: '100px', height: 'auto' }}
                    onError={handleImageError}
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>
                  <Link to={`/edit-article/${item.id}`}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Link>
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(item.id);
                    }}
                  >
                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowArticle;
