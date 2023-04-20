export interface Post {
    id: string;
    author: string;
    title: string;
    subTitle: string;
    posterUrl: string;
    content: string;
    dateCreated: string;
    status: boolean;
    postImages: PostImage[];
}

export interface PostImage {
    id: string;
    postId: string;
    postImageUrl: string;
}
