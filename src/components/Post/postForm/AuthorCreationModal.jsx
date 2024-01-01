import Conditional from "@/components/Conditional";
import { SingleImageUploader } from "@/components/ImageUploader";
import Modal from "@/components/Modal/Modal";
import Image from "next/image";
import React, { useState } from "react";

function AuthorCreationModal({ mutate, authorName, setIsOpen }) {
  const [image, setImage] = useState(null);

  const deleteHandler = () => {
    setIsOpen(false);
    mutate({ name: authorName, avatar: image });
  };
  return (
    <Modal isGlobal={false} localOnClose={() => setIsOpen(false)}>
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
    </Modal>
  );
}

export default AuthorCreationModal;
