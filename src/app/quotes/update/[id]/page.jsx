import IsAdmin from "@/components/IsAdmin";
import QuoteForm from "@/components/Quote/QuoteForm";
import { getQuotes } from "@/lib/db";
import { tryCatch } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

async function page({ params }) {
  const { id } = params;
  const [data, error] = await tryCatch(getQuotes({ id }));

  if (!data.length > 0 || error) notFound();

  const quoteFormData = {
    quote: data[0].quote,
    author: {
      value: data[0].author.id,
      label: data[0].author.name,
      avatar: data[0].author.avatar,
    },
    color: data[0]?.color || "#262D33",
    post: {
      label: data[0].post.title,
      value: data[0].post.id,
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
