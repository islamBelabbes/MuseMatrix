import React from "react";
import NewsLetter from "./news-letter";
function Footer() {
  return (
    <footer className="mt-auto">
      <div className="app">
        <NewsLetter />
      </div>
      <div className="flex justify-center bg-secondary p-10 dark:border-t dark:border-secondary dark:bg-[#161513]">
        <p className="text-secondary/600 text-center" dir="ltr">
          {new Date().getFullYear()}
          &nbsp; جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}

export default Footer;
