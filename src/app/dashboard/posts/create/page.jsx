import IsAdmin from "@/components/IsAdmin";
import PostForm from "../_components/postForm/PostForm";

async function page() {
  return (
    <IsAdmin>
      <PostForm />
    </IsAdmin>
  );
}

export default page;
