"use client";
import PostContentView from "@/components/Post/PostContentView";
import Image from "next/image";
import { SingleImageUploader } from "@/components/ImageUploader";
import Conditional from "../../Conditional";
import BlockUi from "../../BlockUi";
import usePostForm from "./usePostForm";
import { INITIAL_STATE } from "@/reducer/postFormReducer";
import GenreSelect from "./GenreSelect";
import AuthorSelect from "./AuthorSelect";
import { useIsMutating, useIsFetching } from "@tanstack/react-query";
import Link from "next/link";
function PostForm({ type, initializedData = INITIAL_STATE, postId = null }) {
  const [richTextEditorInit, data, dispatch, mutate, isMutatingLoading] =
    usePostForm({
      initializedData,
      richEditorArea: "content",
      type,
      postId,
    });

  const isAuthorMutating = useIsMutating({ mutationKey: ["author"] });
  const isAuthorFetching = useIsFetching({ queryKey: ["authors"] });
  const isGenreMutating = useIsMutating({ mutationKey: ["genre"] });
  const isGenreFetching = useIsMutating({ mutationKey: ["genre"] });
  const isLoading = isMutatingLoading  || isAuthorFetching || isAuthorMutating || isGenreFetching || isGenreMutating //prettier-ignore

  return (
    <div className="app">
      <BlockUi
        isBlock={isMutatingLoading}
        classNames={{ spinner: "rounded-md" }}
      >
        <div className="flex flex-col gap-3 ">
          <form className="flex flex-col gap-4 p-3 border rounded-md border-Primary sm:flex-row">
            <div>
              <div className="sm:w-[400px] h-[240px] relative flex">
                {/* image placeholder */}
                <Conditional
                  condition={data?.cover}
                  onTrue={
                    <Image
                      src={data?.cover[0]?.data_url || data?.cover}
                      alt="listing image"
                      width={400}
                      height={240}
                      className={`object-cover w-full h-full rounded-xl `}
                    />
                  }
                  onFalse={<span className="m-auto">المرجو اختيار صورة</span>}
                />
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-3">
              {/* Image Uploader */}
              <Conditional
                condition={type === "create"}
                onTrue={
                  <SingleImageUploader
                    images={data?.cover}
                    setImages={(cover) =>
                      dispatch({ type: "COVER", payload: cover })
                    }
                  />
                }
                onFalse={
                  <button className="w-full button_primary" disabled>
                    تغير الصورة
                  </button>
                }
              />

              {/* Post Genre */}
              <GenreSelect state={data} dispatch={dispatch} />

              {/* Post Title */}
              <div className="flex items-center gap-2">
                <label htmlFor="title" className="whitespace-nowrap w-[60px]">
                  العنوان :
                </label>
                <input
                  type="text"
                  placeholder="العنوان"
                  id="title"
                  className="flex-1 input_primary"
                  onChange={(e) =>
                    dispatch({ type: "TITLE", payload: e.target.value })
                  }
                  value={data?.title}
                />
              </div>

              {/* Post Author */}
              <AuthorSelect state={data} dispatch={dispatch} />
            </div>
          </form>

          {/* rich text editor content */}
          <PostContentView
            HtmlContent={data?.content}
            initialization={richTextEditorInit}
            Minimized={type !== "create"}
          />
          {/* Submit Button */}
          <button
            className="w-full button_primary"
            onClick={mutate}
            disabled={isLoading}
          >
            {type === "create" ? "انشاء المقالة " : "تعديل المقالة"}
          </button>

          {/* readMore Button */}
          <Conditional
            condition={type === "update"}
            onTrue={
              <Link
                href={`/post/${postId}`}
                prefetch={false}
                className="w-full button_secondary"
              >
                قراءة المقال
              </Link>
            }
          />
        </div>
      </BlockUi>
    </div>
  );
}

export default PostForm;
