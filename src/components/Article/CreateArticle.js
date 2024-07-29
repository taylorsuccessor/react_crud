import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import './Article.css'; // Update CSS file name if applicable

const CreateArticle = () => {
    const navigate = useNavigate();
    const createArticleApi = "http://127.0.0.1:8000/api/article"; 
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [article, setArticle] = useState({
        title: "",
        content: ""
    });

    const handleInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setArticle({ ...article, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch(createArticleApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(article),
            });

            if (response.ok) {
                console.log('Article created successfully!');
                setArticle({ title: "", content: "" });
                navigate('/show-article'); // Update navigation path
            } else {
                console.error('Article creation failed!');
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

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
                    <input type="text" className="form-control" id="title" name="title" value={article.title} onChange={handleInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control" id="content" name="content" value={article.content} onChange={handleInput}></textarea>
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default CreateArticle;
