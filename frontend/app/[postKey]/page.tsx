import { getPost } from "./fetchData";
import { postType } from "../type";

export default async function postPage({
	params,
}: {
	params: { postKey: number };
}) {
	params.postKey = Number(params.postKey);
	const { post } = await getPost(params.postKey);

	if (!post) return (
		<div>
			<p>The page does not exist!</p>
		</div>
	)

	return (
		<div>
			<p>postKey: {params.postKey}</p>
			<p>userKey: {post["postUser"]["key"]}</p>
			<h1>제목: {post["title"]}</h1>
			<p>작성자: {post["postUser"]["userName"]}</p>

			<p>내용: {post["body"]}</p>

			<p>댓글: </p>
			{post["comments"].map(ele => {
				console.log(ele);
				return (
					<div key={ele["key"]}>
						<p>작성자: {ele["commentUser"]["userName"]}</p>
						<p>작성시간: {ele["time"]}</p>
						<p>내용: {ele["body"]}</p>
					</div>
				)
			})}
		</div>
	);
}
