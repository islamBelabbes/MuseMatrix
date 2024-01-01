"use client";
import { cn } from "@/lib/utils";
import ReactImageUploading from "react-images-uploading";

export function SingleImageUploader({ images, setImages, className }) {
  const onChange = (imageList) => {
    setImages(imageList[0].data_url);
  };

  return (
    <ReactImageUploading
      value={[images]}
      onChange={onChange}
      dataURLKey="data_url"
      acceptType={["jpg", "png"]}
    >
      {({ onImageUpload }) => (
        // write your building UI
        <div className={cn("upload__image-wrapper", className)}>
          <button
            onClick={onImageUpload}
            className="w-full button_primary"
            type="button"
          >
            {images?.length > 0 ? "تغيير الصورة" : "تحميل الصورة"}
          </button>
        </div>
      )}
    </ReactImageUploading>
  );
}
