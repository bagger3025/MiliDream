import { fetchData } from "../fetchData";
import { postQuery } from "../type";

async function getPost(postKey: number) {
	const data = await fetchData(
		`query($postKey: Int!) {
    post(key: $postKey) {
      key
      userKey
			title
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
