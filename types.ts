// Fix: Create types.ts to define shared interfaces and types
export interface BlogPost {
    slug: string;
    title: string;
    author: string;
    authorImage: string;
    authorTitle: string;
    authorBio: string;
    excerpt: string;
    imageUrl: string;
    tags: string[];
    content: string; // Can be markdown or HTML
    isFeatured?: boolean;
    popularity?: number; // For sorting popular posts
}

export type Page = 'home' | 'sobre-mi' | 'servicios' | 'menopausia' | 'diagnostico' | 'blog' | 'contacto' | 'aviso-legal' | 'privacidad' | 'cookies';

export interface NavigationTarget {
    page: Page;
    section?: string;
    postSlug?: string;
    originPage?: Page;
}

export interface Testimonial {
    quote: string;
    author: string;
    age: number;
    profession: string;
}