"use client";

import { useRef } from "react";
import { mutateComment } from "./fetchData";

export function CommentSubmitForm({ postKey }: { postKey: number }) {
  const userKeyInput = useRef<any>(null);
  const userNameInput = useRef<any>(null);
  const commentBodyInput = useRef<any>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(userKeyInput.current);
        const { value: userKey } = userKeyInput.current;
        console.log(userNameInput.current);
        const { value: userName } = userNameInput.current;
        console.log(commentBodyInput.current);
        const { value: commentBody } = commentBodyInput.current;

        mutateComment({ key: userKey }, { key: postKey }, commentBody);
      }}
    >
      <label>userKey </label>
      <input type="number" name="userKey" ref={userKeyInput}></input>
      <label>userName</label>
      <input type="text" name="userName" ref={userNameInput}></input>
      <label>내용</label>
      <textarea name="commentBody" ref={commentBodyInput}></textarea>
      <input type="submit"></input>
    </form>
  );
}
