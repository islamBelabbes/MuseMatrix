import { AppError } from "@/lib/error";
import { safeAsync } from "@/lib/safe";
import { IdSchema } from "@/schema/schema";
import { getQuoteByIdUseCase } from "@/use-cases/quotes";
import { notFound } from "next/navigation";
import React from "react";
import QuoteForm from "../../_components/quote-form";

export default async function UpdateQuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const _id = (await params).id;
  const id = IdSchema.parse(_id);
  const quote = await safeAsync(getQuoteByIdUseCase(id));

  if (!quote.success) {
    if (quote.error instanceof AppError && quote.error.statusCode === 404) {
      notFound();
    }

    throw quote.error;
  }

  return (
    <QuoteForm
      initialData={{
        id: quote.data.id,
        authorId: quote.data.authorId,
        author: quote.data.author,
        postId: quote.data.postId ?? undefined,
        post: quote.data.post,
        color: quote.data.color,
        quote: quote.data.quote,
      }}
    />
  );
}
