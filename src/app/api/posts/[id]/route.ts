import { AppError } from "@/lib/error";
import { flatZodError } from "@/lib/utils";
import { updatePostSchema } from "@/schema/posts";
import { deletePostUseCase, updatePostUseCase } from "@/use-cases/posts";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const idSchema = z.coerce.number().int();

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const formData = await req.formData();
    const body = {
      id: +id,
      title: formData.get("title") || undefined,
      content: formData.get("content") || undefined,
      cover: formData.get("cover") || undefined,
      genreId: +(formData.get("genreId") as string) || undefined,
      authorId: +(formData.get("authorId") as string) || undefined,
    };

    const validated = updatePostSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        {
          validationErrors: flatZodError(validated.error),
        },
        { status: 400 },
      );
    }
    console.log(validated.data);

    await updatePostUseCase(validated.data);
    return NextResponse.json("post updated successfully");
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(error.message, { status: error.statusCode });
    }
    return NextResponse.json("an error occurred", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const _id = idSchema.safeParse(id);
    if (!_id.success) {
      return NextResponse.json(
        {
          validationErrors: flatZodError(_id.error),
        },
        { status: 400 },
      );
    }

    await deletePostUseCase(_id.data);
    return NextResponse.json("post deleted successfully");
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(error.message, { status: error.statusCode });
    }
    return NextResponse.json("an error occurred", { status: 500 });
  }
}
