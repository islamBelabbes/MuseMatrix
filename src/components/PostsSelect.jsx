import BlockUi from "@/components/BlockUi";
import axios from "axios";
import AsyncSelect from "react-select/async";

function PostsSelect({ post, setPost }) {
  const getOptions = async (inputValue) => {
    const response = await axios.get(`/api/post?title=${inputValue}`);
    return response.data.data.map((item) => {
      return { value: item.id, label: item.title };
    });
  };

  return (
    <div className="flex items-center w-full gap-2">
      <label htmlFor="post" className="whitespace-nowrap min-w-[60px] w-[60px]">
        المصدر :
      </label>
      <BlockUi classNames={{ container: "w-full", spinner: "rounded" }}>
        <AsyncSelect
          placeholder="اختيار او بحث"
          id="post"
          className="flex-1 font-bold dark:bg-transparent"
          classNames={{
            menu: () => "!z-20",
          }}
          onChange={(e) => setPost(e)}
          loadOptions={getOptions}
          defaultOptions
          value={post}
          isClearable
        />
      </BlockUi>
    </div>
  );
}

export default PostsSelect;
