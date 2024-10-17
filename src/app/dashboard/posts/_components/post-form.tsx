"use client";
import React, { useMemo, useState } from "react";
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
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  TCreatePost,
  TUpdatePost,
  createPostSchema,
  updatePostSchema,
} from "@/schema/posts";
import { TPost } from "@/dto/posts";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "@/lib/react-query/mutations";
import { safeAsync } from "@/lib/safe";
import { cn, getDirtyFields } from "@/lib/utils";
import ImageUpload from "../../_components/image-upload";
import GenreSelect from "../../_components/genre-select";
import AuthorSelect from "../../_components/author-select";
import Editor from "./editor/advanced-editor";

import { generateJSON, generateHTML } from "@tiptap/react";
import { defaultExtensions } from "./editor/extensions";
import { useRouter } from "next-nprogress-bar";
import useDebouncedCallback from "@/hooks/use-debounced-callback";
import useIsMounted from "@/hooks/use-is-mounted";

type TPostFormProps = {
  initialData?: Omit<TCreatePost, "cover"> & {
    author: TPost["author"];
    genre: TPost["genre"];
    coverUrl: string;
    id: number;
  };
};

function PostForm({ initialData }: TPostFormProps) {
  const isUpdate = initialData?.id !== undefined;
  const [genre, setGenre] = useState<TPost["genre"] | undefined>(
    initialData?.genre,
  );
  const [author, setAuthor] = useState<TPost["author"] | undefined>(
    initialData?.author,
  );

  const isMounted = useIsMounted();

  const router = useRouter();

  const form = useForm<TCreatePost | TUpdatePost>({
    defaultValues: {
      id: initialData?.id,
      authorId: initialData?.authorId,
      genreId: initialData?.genreId,
      title: initialData?.title,
      status: initialData?.status ?? "Draft",
      content: initialData?.content ?? "",
    },
    resolver: zodResolver(isUpdate ? updatePostSchema : createPostSchema),
  });

  const createMutation = useCreatePostMutation();
  const updateMutation = useUpdatePostMutation();

  // use anonymous function to prevent Block-scoped variable error
  const debouncedOnUpdate = useDebouncedCallback(() => handleOnUpdate, 500);

  debouncedOnUpdate();

  const handleSubmit = async (data: TCreatePost | TUpdatePost) => {
    if ("id" in data) {
      const dirtyFields = form.formState.dirtyFields;
      const dirtyData = {
        ...(getDirtyFields(dirtyFields, data) as {}),
        id: data.id,
      };

      const post = await safeAsync(
        updateMutation.mutateAsync(dirtyData as TUpdatePost),
      );
      if (!post.success) return toast.error("حصلت خطأ أثناء تحديث الاقتباس");

      toast.success("تم تحديث الاقتباس بنجاح");
      return form.reset({
        id: post.data.id,
        authorId: post.data.authorId,
        genreId: post.data.genreId,
        title: post.data.title,
        status: post.data.status,
        content: post.data.content,
      });
    }

    const post = await safeAsync(createMutation.mutateAsync(data));
    if (!post.success) return toast.error("حصلت خطأ أثناء إنشاء المقالة");

    toast.success("تم إنشاء المقالة بنجاح");
    router.push(`/dashboard/posts/update/${post.data.id}`);
    return router.refresh();
  };

  const handleOnUpdate = () => {
    if (!initialData?.id) return;
    const value = form.getValues("content") ?? "";
    return safeAsync(
      updateMutation.mutateAsync({ content: value, id: initialData.id }),
    );
  };

  const cover = form.watch("cover") ?? initialData?.coverUrl ?? undefined;
  const fullCover = useMemo(() => {
    if (typeof cover === "object") return URL.createObjectURL(cover);
    return cover;
  }, [cover]);

  const editorContent = useMemo(() => {
    if (!isMounted) return;
    const content = form.watch("content");
    if (!content) return undefined;
    return generateJSON(content, defaultExtensions);
  }, [form.watch("content"), isMounted]);

  const isFormLoading =
    form.formState.isSubmitting || (createMutation.isSuccess && !isUpdate);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3 text-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-4 rounded-md border border-primary p-3 md:flex-row">
          <div className="relative h-[200px] w-full md:h-auto md:w-[400px]">
            {!fullCover ? (
              <span
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform select-none",
                  {
                    "text-red-700": form.formState.errors.cover,
                  },
                )}
              >
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
                      image={field.value ?? null}
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
                      ref={field.ref}
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
                      ref={field.ref}
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
                    <Select
                      dir="rtl"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="!my-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-none shadow-none">
                        <SelectItem value="Published">منشور</SelectItem>
                        <SelectItem value="Draft">معلق</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="mt-0">
              <FormControl>
                <Editor
                  initialValue={editorContent}
                  onChange={(value) =>
                    field.onChange(generateHTML(value, defaultExtensions))
                  }
                  onUpdate={isUpdate ? debouncedOnUpdate : undefined}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          disabled={isFormLoading}
          onClick={form.handleSubmit(handleSubmit)}
        >
          {isUpdate ? "تعديل المقالة" : "انشاء المقالة"}
        </Button>
      </form>
    </Form>
  );
}

export default PostForm;
