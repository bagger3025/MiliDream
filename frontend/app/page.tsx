import "dotenv/config";
import Link from "next/link";
import { getAllPosts } from "./fetchData";
import { postQuery, postType } from "./type";

export default async function Home() {
	const { postList, ok } = await getAllPosts();

	return (
		<>
			<div>Hello!</div>
			{ok ? (
				<>
					<div>Here is post lists:</div>
					<ul>
						{postList.map((ele) => {
							return (
								<li key={ele.key}>
									<Link href={`/${ele.key}`}>{ele.title}</Link>
								</li>
							);
						})}
					</ul>
				</>
			) : (
				<div>Could not access to backend</div>
			)}
		</>
	);
}
