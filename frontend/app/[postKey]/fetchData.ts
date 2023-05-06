import { fetchData } from "../fetchData";
import { postQuery } from "../type";

async function getPost(postKey: number) {
	const data = await fetchData(
		`query($postKey: Int!) {
			post(key: $postKey) {
				key
				categoryKey
				title
				body
				time
				viewCount
				postUser {
					...frag_user
				}
				comments {
					...frag_comments
				}
				category {
					key
					name
				}
			}
		}

		fragment frag_comments on Comment {
			key
			time
			body
			parentKey
			childComment {
				key
			}
			commentUser {
				...frag_user
			}
		}

		fragment frag_user on User {
			key
			classKey
			userId
			userName
			class {
				key
				name
			}
		}`,
		{ postKey }
	);

	try {
		const result: { data: postQuery } = await data.json();
		const post = result["data"]["post"];
		return { ok: true, post };
	} catch (err) {
		return { ok: false };
	}
}

export { getPost };
