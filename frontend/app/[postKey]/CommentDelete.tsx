"use client";

import { useRouter } from "next/navigation";
import { fetchData } from "../fetchData";

async function deleteButton(commentKey: number) {
  const data = await fetchData(
    `mutation($key: Int!) {
			deleteComment(key:$key)
    }`,
    { key: commentKey }
  );

  console.log(data);

  try {
    const result = await data.json();
    console.log(result);
    return { ok: true };
  } catch (err) {
    console.log("false");
    return { ok: false };
  }
}

export default function CommentDelete({ ele }: { ele: { key: number } }) {
  const router = useRouter();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        console.log("deleting key=", ele["key"]);
        deleteButton(ele["key"]);
        router.refresh();
      }}
    >
      삭제
    </button>
  );
}
