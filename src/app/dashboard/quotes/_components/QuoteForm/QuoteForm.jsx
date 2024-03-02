"use client";

import { HexColorPicker } from "react-colorful";

import { INITIAL_STATE } from "@/reducer/quoteReducer";
import useQuoteForm from "./useQuoteForm";
import AuthorSelect from "@/components/AuthorSelect/AuthorSelect";
import PostsSelect from "@/components/PostsSelect";
import BlockUi from "@/components/BlockUi";
import Quote from "@/components/Quote/Quote";

function QuoteForm({
  isUpdate = false,
  initialData = INITIAL_STATE,
  quoteId = null,
}) {
  const [data, dispatch, isLoading, mutate] = useQuoteForm(
    initialData,
    isUpdate,
    quoteId
  );

  const quoteProp = {
    author: {
      name: data?.author?.label,
      avatar: data?.author?.avatar,
    },
    post: {
      id: data?.post?.value,
      title: data?.post?.label,
    },
    color: data?.color,
    quote: data?.quote,
  };
  return (
    <div>
      <BlockUi isBlock={isLoading} classNames={{ spinner: "rounded-md" }}>
        <form className="flex flex-col w-full gap-4 p-3 border rounded-md border-primary md:flex-row">
          {/* quote card */}
          <div className="w-full md:w-[263px]">
            <Quote quote={quoteProp} />
          </div>

          {/* Fields */}
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
                value={data.quote}
                onChange={(e) => {
                  return dispatch({ type: "QUOTE", payload: e.target.value });
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
                className="hidden"
              />
            </div>
          </div>
        </form>

        <button
          className="w-full mt-3 button_primary"
          onClick={mutate}
          disabled={isLoading}
        >
          {isUpdate ? "تعديل" : "انشاء"}
        </button>
      </BlockUi>
    </div>
  );
}

export default QuoteForm;
