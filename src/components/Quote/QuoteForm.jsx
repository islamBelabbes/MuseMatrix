"use client";
import { useReducer } from "react";
import BlockUi from "../BlockUi";
import Quote from "./Quote";
import AuthorSelect from "../Author/AuthorSelect";
import { HexColorPicker } from "react-colorful";
import { INITIAL_STATE, reducer } from "@/reducer/quoteReducer";
import PostsSelect from "../PostsSelect";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
function QuoteForm() {
  const router = useRouter();
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => axios.post("/api/quotes", data),
  });

  const onClickHandler = async (e) => {
    e.preventDefault();
    const response = await mutateAsync({
      authorId: data.author.value,
      postId: data.post.value,
      quote: data.content,
      color: data.color,
    });
    if (response.status === 201) {
      toast.success("تم انشاء الإقتباس بنجاح");
      router.push(`/quotes`);
      router.refresh();
    }
  };
  return (
    <div>
      <BlockUi isBlock={isPending} classNames={{ spinner: "rounded-md" }}>
        <form className="flex flex-col w-full gap-4 p-3 border rounded-md border-Primary sm:flex-row">
          <div className="w-full md:w-[263px]">
            <Quote
              author={data?.author?.label}
              avatar={data?.author?.avatar}
              postId={data?.post?.value}
              postTitle={data?.post?.label}
              background={data?.color}
              content={data?.content}
            />
          </div>
          <div className="flex flex-col flex-1 gap-3">
            <AuthorSelect
              author={data.author}
              setAuthor={(payload) => {
                return dispatch({ type: "AUTHOR", payload });
              }}
            />
            <div className="flex items-center gap-2">
              <label
                htmlFor="quote"
                className="whitespace-nowrap min-w-[60px] w-[60px]"
              >
                الإقتباس :
              </label>
              <input
                type="text"
                placeholder="الإقتباس"
                id="quote"
                className="w-full input_primary"
                value={data.content}
                onChange={(e) => {
                  return dispatch({ type: "CONTENT", payload: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row">
              <PostsSelect
                post={data.post}
                setPost={(payload) => {
                  return dispatch({ type: "POST", payload });
                }}
              />
              <HexColorPicker
                color={data.color}
                onChange={(color) => {
                  return dispatch({ type: "COLOR", payload: color });
                }}
              />
            </div>
          </div>
        </form>
        <button
          className="w-full mt-3 button_primary"
          onClick={onClickHandler}
          disabled={isPending}
        >
          انشاء اقتباس
        </button>
      </BlockUi>
    </div>
  );
}

export default QuoteForm;
