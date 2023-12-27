const VARIATIONS = {
  Primary: "bg-Primary text-white",
  Secondary: "bg-Secondary text-Primary",
};
function Tag({ variation = "Primary", name }) {
  return (
    <span
      className={`px-[10px] py-1 rounded-md w-fit ${VARIATIONS[variation]}`}
    >
      {name}
    </span>
  );
}

export default Tag;
