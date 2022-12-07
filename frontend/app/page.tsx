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

	// return <div dangerouslySetInnerHTML={{ __html: await data.text() }}></div>;
	console.log(data);

	let result: { data: postQuery };
	let postList: postType[];
	let success = true;

	try {
		result = await data.json();
		postList = result["data"]["allPosts"];
	} catch (err) {
		postList = [];
		success = false;
	}

	return (
		<>
			<div>Hello!</div>
			{success ? (
				<>
					<div>Here is post lists:</div>
					<ul>
						{postList.map((ele) => {
							return <li key={ele.key}>{ele.title}</li>;
						})}
					</ul>
				</>
			) : (
				<div>Could not access to backend</div>
			)}
		</>
	);
}
