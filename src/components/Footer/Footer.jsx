import React from "react";
import NewsLetter from "../NewsLetter";
function Footer() {
  return (
    <footer className="mt-auto">
      <div className="app">
        <NewsLetter />
      </div>
      <div className="flex justify-center p-10 bg-secondary dark:bg-[#161513] dark:border-t dark:border-secondary">
        <p className="text-center text-secondary/600" dir="ltr">
          {new Date().getFullYear()}
          &nbsp; جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}

export default Footer;
