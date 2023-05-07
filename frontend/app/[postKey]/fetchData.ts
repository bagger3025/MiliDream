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

async function mutateComment(
  user: { key: number },
  post: { key: number },
  commentBody: string
) {
  const data = await fetchData(
    `
	mutation($commentInfo: CommentInfo!) {
		postComment(commentInfo:$commentInfo)
	}
	`,
    {
      commentInfo: {
        body: commentBody,
        userKey: user.key,
        postKey: post.key,
        parentCommentKey: null,
      },
    }
  );

  try {
    const result = await data.json();
    console.log(result);
    return { ok: true };
  } catch (err) {
    return { ok: false };
  }
}

async function deleteButton(commentKey: number) {
  const data = await fetchData(
    `mutation($key: Int!) {
			deleteComment(key:$key)
		}`,
    { key: commentKey }
  );

  try {
    const result = await data.json();
    console.log(result);
    return { ok: true };
  } catch (err) {
    return { ok: false };
  }
}

export { getPost, mutateComment, deleteButton };
