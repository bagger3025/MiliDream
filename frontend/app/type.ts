interface postType {
	key: number;
	userKey: number;
	title: string;
}

interface postQuery {
	allPosts: postType[];
	post: postType;
}

export type { postType, postQuery };
