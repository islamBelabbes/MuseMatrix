"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import CreatableSelect from "../creatable-select";
import AuthorSelect from "../author-select";
import GenreSelect from "../genre-select";

function PostForm() {
  const [image, setImage] = React.useState<File | null>(null);
  const form = useForm();

  return (
    <Form {...form}>
      <form className="xform flex flex-col gap-3 text-lg">
        <div className="flex gap-4 rounded-md border border-primary p-3 sm:flex-row">
          <div className="relative h-[240px] sm:w-[400px]">
            {!image ? (
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform select-none">
                صورة المقالة
              </span>
            ) : (
              <Image
                src={URL.createObjectURL(image)}
                alt="post_cover"
                fill
                className="rounded-xl object-cover"
              />
            )}
          </div>

          <div className="xform flex grow flex-col gap-4">
            <ImageUpload image={image} setImage={setImage} />

            {/* Title Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mt-0 flex items-center gap-2">
                  <FormLabel className="w-16 shrink-0">العنوان</FormLabel>{" "}
                  <FormControl>
                    <Input
                      placeholder="عنوان المقالة"
                      {...field}
                      className="!m-0 h-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Genre Select */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mt-0 flex items-center gap-2">
                  <FormLabel className="w-16 shrink-0">التصنيف</FormLabel>{" "}
                  <FormControl>
                    <GenreSelect />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Author Select */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mt-0 flex items-center gap-2">
                  <FormLabel className="w-16 shrink-0">المصدر</FormLabel>{" "}
                  <FormControl>
                    <AuthorSelect />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Post Status */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mt-0 flex items-center gap-2">
                  <FormLabel className="w-16 shrink-0">الحالة</FormLabel>
                  <FormControl>
                    <Select dir="rtl" defaultValue="draft">
                      <SelectTrigger className="!my-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">منشور</SelectItem>
                        <SelectItem value="draft">معلق</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
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
