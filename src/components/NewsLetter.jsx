import Image from "next/image";
import React from "react";
function NewsLetter() {
  return (
    <div className="p-8 flex flex-col gap-[30px] bg-white rounded-xl border border-Secondary">
      <div className="dark:text-[#161513]">
        <h1 className="text-xl font-bold text-center">اشعارات اسبوعية</h1>
        <p className="text-base font-normal text-center">
          احصل على اخر التلخيصات على البريد الإلكتروني العلامة
        </p>
      </div>
      <form className="flex flex-col gap-2">
        <div className="relative">
          <input
            type="email"
            className="w-full input_primary"
            placeholder="بريدك"
          />
          <Image
            src={"/mail.svg"}
            width={24}
            height={24}
            alt="mail"
            className="absolute top-[50%] left-0 translate-x-[10px] translate-y-[-50%]"
          />
        </div>
        <button className="w-full button_primary" disabled>
          اشتراك الان
        </button>
      </form>
    </div>
  );
}

export default NewsLetter;
