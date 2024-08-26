import Quote from "@/components/quote";

function QuoteList() {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(263px,1fr))] justify-center gap-5">
      <Quote />
      <Quote />
      <Quote />
      <Quote />
      <Quote />
      <Quote />
    </ul>
  );
}

export default QuoteList;
