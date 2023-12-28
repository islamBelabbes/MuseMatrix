"use client";
import ReactImageUploading from "react-images-uploading";
import { twMerge } from "tailwind-merge";

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
        <div className={twMerge("upload__image-wrapper", className)}>
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
