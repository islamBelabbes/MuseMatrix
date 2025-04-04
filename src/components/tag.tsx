import React from "react";

const VARIATIONS = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-primary",
};

type TagProps = {
  variation?: keyof typeof VARIATIONS;
  name: string;
} & React.HTMLProps<HTMLSpanElement>;

function Tag({ variation = "primary", name, ...props }: TagProps) {
  return (
    <span
      className={`w-fit rounded-md px-[10px] py-1 ${VARIATIONS[variation]}`}
      {...props}
    >
      {name}
    </span>
  );
}

export default Tag;
