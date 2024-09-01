import Image from "next/image";
import CreateButton from "../_components/create-button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { getPostsUseCase } from "@/use-cases/posts";

const COLS = [
  {
    name: "الصورة",
  },
  {
    name: "العنوان",
  },
];

export default async function DraftsPage() {
  const posts = await getPostsUseCase({ status: "Draft" });

  return (
    <div>
      <CreateButton>إنشاء مقالة</CreateButton>
      <Table>
        <TableHeader>
          <TableRow>
            {COLS.map((col) => (
              <TableHead className="text-right">{col.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.data.map((post) => (
            <TableRow key={post.id}>
              <TableCell
                style={{
                  width: "100px",
                }}
              >
                <div className="relative h-[50px] w-[50px]">
                  <Image
                    src={post.cover}
                    alt="image"
                    fill
                    className="object-contain"
                    placeholder="empty"
                  />
                </div>
              </TableCell>
              <TableCell>{post.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
