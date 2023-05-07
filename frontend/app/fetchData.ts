import { postQuery } from "./type";

async function fetchData(query: string, variables?: object) {
  return fetch(process.env.BACKEND_API as string, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
}

async function getAllPosts() {
  /* https://hygraph.com/blog/nextjs-graphql */
  const data = await fetchData(`query getAllPosts{
    allPosts{
      key
      title
    }
  }`);

  try {
    const result: { data: postQuery } = await data.json();
    const postList = result["data"]["allPosts"];
    return { ok: true, postList };
  } catch (err) {
    return { ok: false, postList: [] };
  }
}

export { getAllPosts, fetchData };
