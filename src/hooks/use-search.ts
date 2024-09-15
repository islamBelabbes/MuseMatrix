import { useState } from "react";
import { useDebounce } from "./use-debounce";

function useSearch() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  return { search, setSearch, debouncedSearch };
}

export default useSearch;
