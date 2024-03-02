import IsAdmin from "@/components/IsAdmin";
import QuoteForm from "@/components/Quote/QuoteForm/QuoteForm";
import { getQuotes } from "@/lib/db";
import { tryCatch } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

async function page({ params }) {
  const { id } = params;
  const [data, error] = await tryCatch(getQuotes({ id, limit: 1, page: 1 }));

  if (error) throw new Error("something went wrong");
  if (!data.data.length > 0 || error) notFound();

  const quoteFormData = {
    quote: data.data[0].quote,
    author: {
      value: data.data[0].author.id,
      label: data.data[0].author.name,
      avatar: data.data[0].author.avatar,
    },
    color: data.data[0]?.color || "#262D33",
    post: {
      label: data.data[0].post.title,
      value: data.data[0].post.id,
    },
  };
  return (
    <div className="app">
      <IsAdmin>
        <QuoteForm initialData={quoteFormData} isUpdate quoteId={id} />
      </IsAdmin>
    </div>
  );
}

export default page;
