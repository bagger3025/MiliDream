interface postType {
	key: number;
	title: string;
}

interface postQuery {
	allPosts: postType[];
}

export type { postType, postQuery };
