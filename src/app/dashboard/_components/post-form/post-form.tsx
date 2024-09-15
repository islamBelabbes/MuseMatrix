"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "../image-upload";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import PostContentViewer from "@/components/post-content-viewr";
import AuthorSelect from "../author-select";
import GenreSelect from "../genre-select";
import { TCreatePost } from "@/schema/posts";
import { TPost } from "@/dto/posts";

type TPostFormProps = {
  initialData?: Omit<TCreatePost, "cover"> & {
    author: TPost["author"];
    genre: TPost["genre"];
    coverUrl: string;
    id: number;
  };
};

function PostForm({ initialData }: TPostFormProps) {
  const [genre, setGenre] = useState<TPost["genre"] | undefined>(
    initialData?.genre,
  );
  const [author, setAuthor] = useState<TPost["author"] | undefined>(
    initialData?.author,
  );
  const form = useForm<TCreatePost>({
    defaultValues: {
      authorId: initialData?.authorId,
      genreId: initialData?.genreId,
      title: initialData?.title,
      status: initialData?.status,
    },
  });

  const cover = form.watch("cover") ?? initialData?.coverUrl ?? undefined;
  const fullCover =
    typeof cover === "object" ? URL.createObjectURL(cover) : cover;
  return (
    <Form {...form}>
      <form className="flex flex-col gap-3 text-lg">
        <div className="flex gap-4 rounded-md border border-primary p-3 sm:flex-row">
          <div className="relative sm:w-[400px]">
            {!cover ? (
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform select-none">
                صورة المقالة
              </span>
            ) : (
              <Image
                src={fullCover}
                alt="post_cover"
                fill
                className="rounded-xl object-cover"
              />
            )}
          </div>

          <div className="flex grow flex-col gap-4">
            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem className="mt-0 flex items-center gap-2">
                  <FormControl>
                    <ImageUpload
                      image={field.value}
                      setImage={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mt-0 flex items-center gap-2">
                  <FormLabel className="w-16 shrink-0">العنوان</FormLabel>{" "}
                  <FormControl>
                    <Input
                      placeholder="عنوان المقالة"
                      {...field}
                      value={field.value ?? ""}
                      className="!m-0 h-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Genre Select */}
            <FormField
              control={form.control}
              name="genreId"
              render={({ field }) => (
                <FormItem className="mt-0 flex items-center gap-2">
                  <FormLabel className="w-16 shrink-0">التصنيف</FormLabel>{" "}
                  <FormControl>
                    <GenreSelect
                      value={{
                        label: genre?.title ?? "",
                        value: genre?.id.toString() ?? "",
                      }}
                      onChange={(selected, genre) => {
                        setGenre(genre);
                        return field.onChange(selected.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Author Select */}
            <FormField
              control={form.control}
              name="authorId"
              render={({ field }) => (
                <FormItem className="!mt-0 flex items-center gap-2">
                  <FormLabel className="w-16 shrink-0">المصدر</FormLabel>{" "}
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

            {/* Post Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="mt-0 flex items-center gap-2">
                  <FormLabel className="w-16 shrink-0">الحالة</FormLabel>
                  <FormControl>
                    <Select dir="rtl" defaultValue="draft">
                      <SelectTrigger className="!my-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-none shadow-none">
                        <SelectItem value="published">منشور</SelectItem>
                        <SelectItem value="draft">معلق</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <PostContentViewer htmlContent="hey" />

        <Button className="w-full">انشاء مقالة</Button>
      </form>
    </Form>
  );
}

export default PostForm;
