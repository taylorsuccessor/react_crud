import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import config from "@config/config";
import Loader from "@components/Loader";

import defaultImage from "@assets/img/default-image.png";
import { useArticlesQuery, useDeleteArticleMutation } from "@queries/article";

const ShowArticle = () => {
  const { data: articles, isLoading, isError, error } = useArticlesQuery();
  const { mutate: deleteArticle, isPending: isDeleting } = useDeleteArticleMutation();


  const handleDelete = async (id) => {
    deleteArticle(id);
  };

  const handleImageError = (e) => {
    e.target.src = defaultImage; // Set default image on error
  };

  if (!articles || articles.length === 0) return <h1>No articles found</h1>;

  return (
    <div className="mt-5">
      {isDeleting || isLoading && <Loader />}
      {isError && <p>Error: {error.message}</p>}
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

};

export default ShowArticle;
