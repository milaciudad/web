import { mockPosts } from '../data/blogData';
import type { BlogPost } from '../types';

/**
 * Simulates fetching blog posts from a CMS.
 * In a real application, this would be an API call.
 * @returns A promise that resolves to an array of blog posts.
 */
export const getBlogPosts = (): Promise<BlogPost[]> => {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            resolve(mockPosts);
        }, 500);
    });
};
