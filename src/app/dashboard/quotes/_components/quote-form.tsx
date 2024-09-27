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
import {
  TCreateQuote,
  TUpdateQuote,
  createQuoteSchema,
  updateQuoteSchema,
} from "@/schema/quotes";
import { MEDIA_URL } from "@/lib/constants";
import { TQuote } from "@/dto/quotes";
import {
  useCreateQuoteMutation,
  useUpdateQuoteMutation,
} from "@/lib/react-query/mutations";
import { safeAsync } from "@/lib/safe";
import toast from "react-hot-toast";
import { getDirtyFields } from "@/lib/utils";
import { useRouter } from "next-nprogress-bar";

const DEFAULT_COLOR = "#000000";

type TQuoteFormProps = {
  initialData?: TCreateQuote & {
    id: number;
    author: TQuote["author"];
    post?: TQuote["post"];
  };
};

function QuoteForm({ initialData }: TQuoteFormProps) {
  const isUpdate = initialData?.id !== undefined;
  const [author, setAuthor] = useState<TQuote["author"] | undefined>(
    initialData?.author,
  );
  const [post, setPost] = useState<TQuote["post"] | undefined>(
    initialData?.post ?? undefined,
  );

  const router = useRouter();

  const form = useForm<TCreateQuote | TUpdateQuote>({
    defaultValues: {
      id: initialData?.id,
      authorId: initialData?.authorId,
      postId: initialData?.postId ?? undefined,
      color: isUpdate ? initialData?.color : DEFAULT_COLOR,
      quote: initialData?.quote,
    },
    resolver: zodResolver(isUpdate ? updateQuoteSchema : createQuoteSchema),
  });

  const createMutation = useCreateQuoteMutation();
  const updateMutation = useUpdateQuoteMutation();

  const handleOnSubmit = async (data: TCreateQuote | TUpdateQuote) => {
    // we check if we are on update form
    if ("id" in data) {
      const dirtyFields = form.formState.dirtyFields;
      console.log(dirtyFields);

      const dirtyData = {
        ...(getDirtyFields(dirtyFields, data) as {}),
        id: data.id,
      };

      const quote = await safeAsync(
        updateMutation.mutateAsync(dirtyData as TUpdateQuote),
      );
      if (!quote.success) return toast.error("حصلت خطأ أثناء تحديث الاقتباس");

      toast.success("تم تحديث الاقتباس بنجاح");
      router.refresh();
      return form.reset(quote.data);
    }

    // we are on create form so lets create the quote
    const quote = await safeAsync(createMutation.mutateAsync(data));
    if (!quote.success) return toast.error("حصلت خطأ أثناء إنشاء الاقتباس");

    toast.success("تم إنشاء الاقتباس بنجاح");
    router.push(`/dashboard/quotes/update/${quote.data.id}`);
    return router.refresh();
  };

  const color = form.watch("color");
  const quote = form.watch("quote");

  const isFormLoading =
    form.formState.isSubmitting ||
    (form.formState.isSubmitSuccessful && !isUpdate);
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3 text-lg"
        onSubmit={form.handleSubmit(handleOnSubmit)}
      >
        <div className="flex flex-col gap-4 rounded-md border border-primary p-3 md:flex-row">
          <Quote
            author={{
              avatar: `${MEDIA_URL}/${author?.avatar}`,
              name: author?.name ?? "",
            }}
            color={color ?? DEFAULT_COLOR}
            quote={quote ?? ""}
            post={
              post
                ? {
                    id: post.id,
                    title: post.title,
                  }
                : undefined
            }
            className="shrink-0 md:basis-1/3 lg:basis-1/4"
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
                      value={field.value}
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
                        label: author?.name,
                        value: author?.id.toString(),
                      }}
                      onChange={(selected, author) => {
                        setAuthor(author);
                        return field.onChange(selected.value ?? null);
                      }}
                      ref={field.ref}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex flex-col items-start gap-2 xl:flex-row">
              <FormField
                name="postId"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-0 flex w-full grow items-center gap-2 xl:w-auto">
                    <FormLabel className="w-16 shrink-0">المصدر</FormLabel>{" "}
                    <FormControl>
                      <PostSelect
                        value={{
                          label: post?.title,
                          value: post?.id.toString(),
                        }}
                        onChange={(selected, post) => {
                          setPost(post);
                          field.onChange(selected.value ?? null);
                        }}
                        ref={field.ref}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="color"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full xl:w-auto">
                    <FormControl>
                      <HexColorPicker
                        color={field.value ?? DEFAULT_COLOR}
                        onChange={field.onChange}
                        className="!w-full xl:!w-52"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <Button className="w-full" disabled={isFormLoading}>
          {isUpdate ? "تحديث الاقتباس" : "انشاء اقتباس"}
        </Button>
      </form>
    </Form>
  );
}

export default QuoteForm;
