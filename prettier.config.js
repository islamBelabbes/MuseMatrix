/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  // Used to sort classes in strings provided to function calls (clsx, twMerge or cva)
  tailwindFunctions: ["cn", "clsx", "cva"],
  // Used to wrap classes in strings provided to function calls (clsx, twMerge or cva)
  customFunctions: ["cn", "clsx", "cva"],
  // https://github.com/ony3000/prettier-plugin-classnames?tab=readme-ov-file#ending-position
  endingPosition: "absolute-with-indent",
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-classnames",
    "prettier-plugin-merge",
  ],
};

export default config;
