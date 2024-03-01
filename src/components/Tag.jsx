const VARIATIONS = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-primary",
};
function Tag({ variation = "primary", name }) {
  return (
    <span
      className={`px-[10px] py-1 rounded-md w-fit ${VARIATIONS[variation]}`}
    >
      {name}
    </span>
  );
}

export default Tag;
