import Image from "next/image";
import React, { useState } from "react";

import { toast } from "react-toastify";

import Conditional from "@/components/Conditional";
import { SingleImageUploader } from "@/components/ImageUploader";
import { Dialog, DialogContent } from "@/components/ui/dialog";

function AuthorCreationModal({ mutate, authorName, onOpenChange }) {
  const [image, setImage] = useState(null);

  const deleteHandler = () => {
    if (!image) return toast.error("الرجاء اختيار صورة");
    onOpenChange(false);
    mutate({ name: authorName, avatar: image });
  };
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="p-6 bg-white border border-secondary min-w-[500px]">
        <div className="flex flex-col gap-3">
          <div className="flex gap-[12px] items-center">
            <div className="w-[36px] h-[36px] rounded-full border  bg-slate-400">
              <Conditional
                condition={image}
                onTrue={
                  <Image
                    src={image}
                    alt="avatar"
                    className="object-cover w-full h-full rounded-full"
                    width={"36"}
                    height={"36"}
                  />
                }
              />
            </div>
            <span className="text-base font-medium">{authorName}</span>
            <SingleImageUploader
              images={image}
              setImages={setImage}
              className={"mr-auto"}
            />
          </div>
          <button
            className="w-full button_primary"
            disabled={!image}
            onClick={deleteHandler}
          >
            انشاء
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AuthorCreationModal;
