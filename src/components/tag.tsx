const VARIATIONS = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-primary",
};

type TagProps = {
  variation?: keyof typeof VARIATIONS;
  name: string;
};

function Tag({ variation = "primary", name }: TagProps) {
  return (
    <span
      className={`w-fit rounded-md px-[10px] py-1 ${VARIATIONS[variation]}`}
    >
      {name}
    </span>
  );
}

export default Tag;
