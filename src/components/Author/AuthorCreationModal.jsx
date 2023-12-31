import Conditional from "@/components/Conditional";
import { SingleImageUploader } from "@/components/ImageUploader";
import Modal from "@/components/Modal/Modal";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

function AuthorCreationModal({ mutate, authorName, closeModal }) {
  const [image, setImage] = useState(null);

  const deleteHandler = () => {
    if (!image) return toast.error("الرجاء اختيار صورة");
    closeModal();
    mutate({ name: authorName, avatar: image });
  };
  return (
    <Modal onClickOutside={closeModal}>
      <div className="p-6 bg-white border border-Secondary min-w-[500px] relative">
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
      </div>
    </Modal>
  );
}

export default AuthorCreationModal;
