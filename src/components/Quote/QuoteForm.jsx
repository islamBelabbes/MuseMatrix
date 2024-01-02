"use client";
import { useReducer, useState } from "react";
import BlockUi from "../BlockUi";
import Quote from "./Quote";
import AuthorSelect from "../Author/AuthorSelect";
import { HexColorPicker } from "react-colorful";
import { INITIAL_STATE, reducer } from "@/reducer/quoteReducer";
function QuoteForm() {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <div>
      <BlockUi>
        <form className="flex flex-col w-full gap-4 p-3 border rounded-md border-Primary sm:flex-row">
          <div className="w-full md:w-[263px]">
            <Quote
              author={data?.author?.label}
              avatar={data?.author?.avatar}
              book={data?.book}
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
              <AuthorSelect
                author={data.author}
                setAuthor={(payload) => {
                  return dispatch({ type: "AUTHOR", payload });
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
      </BlockUi>
    </div>
  );
}

export default QuoteForm;
