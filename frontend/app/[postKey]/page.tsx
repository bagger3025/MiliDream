import { deleteButton, getPost } from "./fetchData";
import Link from "next/link";
import { CommentSubmitForm } from "./CommentSubmit";
import CommentDelete from "./CommentDelete";

export default async function postPage({
  params,
}: {
  params: { postKey: number };
}) {
  params.postKey = Number(params.postKey);
  const { post } = await getPost(params.postKey);

  if (!post)
    return (
      <div>
        <p>The page does not exist!</p>
      </div>
    );

  console.log(post["comments"]);

  return (
    <div>
      <p>postKey: {params.postKey}</p>
      <p>userKey: {post["postUser"]["key"]}</p>
      <h1>제목: {post["title"]}</h1>
      <p>작성자: {post["postUser"]["userName"]}</p>

      <p>내용: {post["body"]}</p>

      <p>댓글: </p>
      {post["comments"].map((ele) => {
        return (
          <div key={ele["key"]} style={{ border: "solid 1px black" }}>
            <p>댓글 key: {ele["key"]}</p>
            <p>
              작성자:
              {ele["commentUser"] ? (
                <Link href={`/user/${ele["commentUser"]["key"]}`}>
                  {ele["commentUser"]["userName"]}
                </Link>
              ) : (
                "작성자가 없습니다!"
              )}
            </p>
            <p>작성시간: {ele["time"]}</p>
            <p>내용: {ele["body"]}</p>
            <CommentDelete ele={ele}></CommentDelete>
          </div>
        );
      })}
      <p>댓글 달기: </p>
      <CommentSubmitForm postKey={params.postKey}></CommentSubmitForm>
    </div>
  );
}
