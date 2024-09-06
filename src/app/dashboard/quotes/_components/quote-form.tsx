"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Quote from "@/components/quote";
import { Input } from "@/components/ui/input";
import PostSelect from "../../_components/post-select";
import AuthorSelect from "../../_components/author-select";
import { HexColorPicker } from "react-colorful";
import { TCreateQuote } from "@/schema/quotes";

type TQuoteFormProps = {
  initialData?: Partial<TCreateQuote>;
};

function QuoteForm({ initialData }: TQuoteFormProps) {
  const form = useForm<TCreateQuote>({
    defaultValues: initialData,
  });

  const color = form.watch("color");
  return (
    <Form {...form}>
      <form className="flex flex-col gap-3 text-lg">
        <div className="flex gap-4 rounded-md border border-primary p-3 sm:flex-row">
          <Quote
            author={{
              avatar: "https://avatars.githubusercontent.com/u/101989651?v=4",
              name: "محمد المصطفى",
            }}
            color={color}
            id={1}
            quote="this is a quote"
            post={{
              id: 1,
              title: "this is a post",
            }}
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
                      className="!m-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="quote"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-0 flex items-center gap-2">
                  <FormLabel className="w-16 shrink-0">الكاتب</FormLabel>{" "}
                  <FormControl>
                    <AuthorSelect />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-start gap-2">
              <FormField
                name="quote"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-0 flex grow items-center gap-2">
                    <FormLabel className="w-16 shrink-0">المصدر</FormLabel>{" "}
                    <FormControl>
                      <PostSelect />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
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
