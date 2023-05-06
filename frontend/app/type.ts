interface UserClass {
	key: number;
	name: string;
}

interface User {
	key: number;
	classKey: number;
	userId: number;
	userName: string;
	class: UserClass;
}

interface postComment{
	key: number;

	time: string;
	body: string;

	parentKey: number;
	childComment: {
		key: number;
	};

	commentUser: User;
}

interface postType {
	key: number;
	categoryKey: number;

	title: string;
	body: string;
	time: string;
	
	viewCount: number;

	postUser: User;
	comments: postComment[];

}

interface postQuery {
	allPosts: postType[];
	post: postType;
}

export type { postType, postQuery };
