import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";

const ShowArticle = () => {
  const showArticleApi = "http://127.0.0.1:8000/api/article"; // Updated API endpoint
  const token = "1|n750kP7nLDZcNduwK7EhLHSQGOekPQt07UlQeajE1f22573c"; // Replace with your actual token

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${showArticleApi}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setArticles(articles.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = () => {
    axios
      .get(showArticleApi, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((res) => {
        const { data, meta } = res.data;
        setArticles(data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch articles.");
      });
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
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((item, i) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.content}</td>
                  <td>
                    <Link to={`/edit-article/${item.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <Link to={`/article/${item.id}`}>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>
                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handleDelete(item.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowArticle;
