import { AppError } from "@/lib/error";
import { flatZodError } from "@/lib/utils";
import { createPostSchema } from "@/schema/posts";
import { createPostUseCase } from "@/use-cases/posts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const body = {
      title: formData.get("title") || undefined,
      content: formData.get("content") || undefined,
      cover: formData.get("cover"),
      genreId: +(formData.get("genreId") as string) || undefined,
      authorId: +(formData.get("authorId") as string) || undefined,
    };

    const validated = createPostSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        {
          validationErrors: flatZodError(validated.error),
        },
        { status: 400 },
      );
    }

    await createPostUseCase(validated.data);
    return NextResponse.json("post created successfully");
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(error.message, { status: error.statusCode });
    }
    return NextResponse.json("an error occurred", { status: 500 });
  }
}
