import api from '@services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
// import { useCustomToast } from '@hooks/useCustomToast'; //  create toast hook
// import { handleResErrors } from '@utils/errorHandler';  // create custom error handler


// **************** Fetch Articles *****************************//
const fetchArticles = async () => {
    const response = await api.get('/article');
    // return response.data.data;
    return [
        {
            id: '1',
            title: 'Fake Article 1',
            content: 'This is a fake article used for testing.',
            article_cover_img: null,
        },
        {
            id: '2',
            title: 'Fake Article 2',
            content: 'Another fake article to test UI.',
            article_cover_img: null,
        },
    ];
};

export const useArticlesQuery = () => {
    return useQuery({
        queryKey: ['articles'],
        queryFn: fetchArticles,
    });
};


// **************** Crete Articles *****************************//
const createArticle = async (formData) => {
    const response = await api.post('/article', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    if (response.status !== 200) {
        throw new Error('Failed to create article');
    }

    return response.data;
};

export const useCreateArticleMutation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createArticle,
        onSuccess: (data) => {
            console.log('success', 'Article Created successfully');
            queryClient.invalidateQueries({ queryKey: ['articles'] });
            navigate('/');
        },
        onError: (error) => {
            console.log("error", error)
            // handleResErrors(error, showToast);
        },
    });
};


// ---------------------------------- Get One Article ----------------------------------
export const fetchArticleById = async (id) => {
    const response = await api.get(`/article/${id}`);
    return response.data.data;
};

export const useArticleQuery = (id) => {
    return useQuery({
        queryKey: ['article', id],
        queryFn: () => fetchArticleById(id),
        enabled: !!id,
    });
};

// ---------------------------------- Update One Article ----------------------------------
export const updateArticle = async ({ id, formData }) => {
    const response = await api.post(`/article/${id}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.status !== 200) {
        throw new Error('Update failed');
    }

    return response.data;
};

export const useUpdateArticleMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
        },
    });
};


// **************** Delete Article *****************************//
const deleteArticle = async (id) => {
    const response = await api.delete(`/article/${id}`);
    if (response.status !== 200) {
        throw new Error('Failed to delete article');
    }
    return response;
};

export const useDeleteArticleMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
            console.log('success', 'Article Deleted successfully');

        },
        onError: (error) => {
            console.error('Delete failed:', error.message);
        },
    });
};
