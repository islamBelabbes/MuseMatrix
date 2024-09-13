"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import Quote from "@/components/quote";
import { Input } from "@/components/ui/input";
import PostSelect from "../../_components/post-select";
import AuthorSelect from "../../_components/author-select";
import { HexColorPicker } from "react-colorful";
import { TCreateQuote, createQuoteSchema } from "@/schema/quotes";
import { TAuthor } from "@/dtos/authors";
import { MEDIA_URL } from "@/lib/constants";
import { TPost } from "@/dtos/posts";

type TQuoteFormProps = {
  initialData?: Partial<TCreateQuote>;
};

function QuoteForm({ initialData }: TQuoteFormProps) {
  const [author, setAuthor] = useState<TAuthor | undefined>();
  const [post, setPost] = useState<TPost | undefined>();
  const form = useForm<TCreateQuote>({
    defaultValues: initialData,
    resolver: zodResolver(createQuoteSchema),
  });

  const handleOnSubmit = (data: TCreateQuote) => {
    console.log(data);
  };

  const color = form.watch("color");
  const quote = form.watch("quote");
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3 text-lg"
        onSubmit={form.handleSubmit(handleOnSubmit)}
      >
        <div className="flex gap-4 rounded-md border border-primary p-3 sm:flex-row">
          <Quote
            author={{
              avatar: `${MEDIA_URL}/${author?.avatar}`,
              name: author?.name ?? "",
            }}
            color={color}
            id={1}
            quote={quote}
            post={
              post && {
                id: post.id,
                title: post.title,
              }
            }
            className="shrink-0 md:basis-1/4"
          />

          <div className="flex basis-full flex-col gap-4">
            <FormField
              name="quote"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-0 flex items-center gap-2">
                  <FormLabel className="w-16 shrink-0">الاقتباس</FormLabel>{" "}
                  <FormControl>
                    <Input
                      placeholder="اقتباس الاقتباس"
                      {...field}
                      value={field.value ?? ""}
                      className="!m-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="authorId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-0 flex items-center gap-2">
                  <FormLabel className="w-16 shrink-0">الكاتب</FormLabel>{" "}
                  <FormControl>
                    <AuthorSelect
                      value={{
                        label: author?.name ?? "",
                        value: author?.id.toString() ?? "",
                      }}
                      onChange={(selected, author) => {
                        setAuthor(author);
                        return field.onChange(selected.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-start gap-2">
              <FormField
                name="postId"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-0 flex grow items-center gap-2">
                    <FormLabel className="w-16 shrink-0">المصدر</FormLabel>{" "}
                    <FormControl>
                      <PostSelect
                        value={{
                          label: post?.title ?? "",
                          value: post?.id.toString() ?? "",
                        }}
                        onChange={(selected, post) => {
                          setPost(post);
                          field.onChange(selected.value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="color"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <HexColorPicker
                        color={field.value ?? undefined}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <Button className="w-full">انشاء اقتباس</Button>
      </form>
    </Form>
  );
}

export default QuoteForm;
