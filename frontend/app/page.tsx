import "dotenv/config";
interface postType {
	key: number;
	title: string;
}

interface postQuery {
	allPosts: postType[];
}

export default async function Home() {
	/* https://hygraph.com/blog/nextjs-graphql */
	const data = await fetch(process.env.BACKEND_API as string, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			query: `query getAllPosts{
        allPosts{
          key
          title
        }
      }`,
		}),
	});

	const result: { data: postQuery } = await data.json();
	console.log(result["data"]);

	const postList: postType[] = result["data"]["allPosts"];
	return (
		<>
			<div>Hello!</div>
			<div>Here is post lists:</div>
			<ul>
				{postList.map((ele) => {
					return <li key={ele.key}>{ele.title}</li>;
				})}
			</ul>
		</>
	);
}
