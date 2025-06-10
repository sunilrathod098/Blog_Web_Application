import { useBlog as useBlogContext } from '../context/BlogContext';

export const useBlog = () => {
    const context = useBlogContext();

    if (!context) {
        throw new Error('useBlog must be used within a BlogProvider');
    }

    return context;
};