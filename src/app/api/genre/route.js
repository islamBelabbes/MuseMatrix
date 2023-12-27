import { createGenre, getGenres } from "@/lib/db";
import { sendOk, sendServerError } from "@/lib/responseHelper";
import { tryCatch } from "@/lib/utils";
export async function POST(req) {
  const { title } = await req.json();

  // creating author
  const [data, error] = await tryCatch(createGenre({ title }));
  if (error) return sendServerError();

  return sendOk({
    data,
  });
}

export async function GET() {
  const [data, error] = await tryCatch(getGenres());

  if (error) return sendServerError();

  return sendOk({
    data,
  });
}
