import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Mail } from "lucide-react";
function NewsLetter() {
  return (
    <div className="flex flex-col gap-[30px] rounded-xl border border-secondary bg-white p-8">
      <div className="dark:text-[#161513]">
        <h1 className="text-center text-xl font-bold">اشعارات اسبوعية</h1>
        <p className="text-center text-base font-normal">
          احصل على اخر التلخيصات على البريد الإلكتروني العلامة
        </p>
      </div>
      <form className="flex flex-col gap-2">
        <div className="relative">
          <Input type="email" className="w-full" placeholder="بريدك" />
          <Mail className="absolute left-0 top-[50%] size-5 translate-x-[10px] translate-y-[-50%]" />
        </div>

        <Button className="button_primary w-full" disabled>
          اشتراك الان
        </Button>
      </form>
    </div>
  );
}

export default NewsLetter;
