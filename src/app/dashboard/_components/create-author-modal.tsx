import AuthorAvatar from "@/components/author-avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import ImageUpload from "./image-upload";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { TCreateAuthor, createAuthorSchema } from "@/schema/author";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useCreateAuthorMutation } from "@/lib/react-query/mutations";
import { safeAsync } from "@/lib/safe";
import toast from "react-hot-toast";
import { TAuthor } from "@/dto/authors";

type TCreateAuthorModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authorName: string;
  onSuccess?: (author: TAuthor) => void;
};

function CreateAuthorModal({
  onOpenChange,
  open,
  authorName,
  onSuccess,
}: TCreateAuthorModalProps) {
  const form = useForm<TCreateAuthor>({
    resolver: zodResolver(createAuthorSchema),
    defaultValues: {
      name: authorName,
    },
  });

  const mutation = useCreateAuthorMutation();

  const handleSubmit = async (data: TCreateAuthor) => {
    const author = await safeAsync(mutation.mutateAsync(data));
    if (!author.success) return toast.error("تعذر إنشاء المؤلف");

    toast.success("تم إنشاء المؤلف بنجاح");
    onOpenChange(false);

    return onSuccess?.(author.data);
  };

  const avatar = useMemo(
    () =>
      form.watch("avatar") ? URL.createObjectURL(form.watch("avatar")) : "",
    [form.watch("avatar")],
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AuthorAvatar
                  avatar={avatar}
                  className={cn("size-11", {
                    "border border-red-700": form.formState.errors.avatar,
                  })}
                />
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="mt-0 flex items-center gap-2">
                      <FormControl>
                        <span>{field.value}</span>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="avatar"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-0 flex items-center gap-2">
                    <FormControl>
                      <ImageUpload
                        image={field.value}
                        setImage={field.onChange}
                        className="w-fit"
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button className="mt-2 w-full" disabled={mutation.isPending}>
              انشاء مؤلف
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAuthorModal;
