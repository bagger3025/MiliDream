import { getPost } from "./fetchData";
import { postType } from "../type";

export default async function postPage({
	params,
}: {
	params: { postKey: number };
}) {
	params.postKey = Number(params.postKey);
	const { post, ok } = await getPost(params.postKey);

	return (
		<div>
			{params.postKey} {post ? post["userKey"] : ""}
		</div>
	);
}
