import AuthorAvatar from "@/components/author-avatar";
import PostContentViewer from "@/components/post-content-viewr";
import Tag from "@/components/tag";
import React from "react";

function PostPage() {
  return (
    <main className="app flex h-fit flex-col gap-5">
      <div className="flex flex-col items-center justify-between gap-y-2 md:flex-row">
        <div className="flex w-full flex-1 flex-col gap-5">
          <Tag name={"كتب"} variation="primary" />
          <h1 className={`landscape-[50px] text-[18px] font-bold`}>
            الاسلام بين الشرق و الغرب
          </h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-[12px]">
              <AuthorAvatar
                avatar=" https://picsum.photos/200"
                className="size-9"
              />
              <span className="text-base font-medium">علي عزت بيغوفيتش</span>
            </div>
          </div>
        </div>
      </div>
      <PostContentViewer htmlContent={"<h1>Content</h1>"} Minimized={false} />
    </main>
  );
}

export default PostPage;
