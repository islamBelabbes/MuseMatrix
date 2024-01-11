import IsAdmin from "@/components/IsAdmin";
import PostForm from "@/components/Post/postForm/PostForm";

async function page() {
  return (
    <IsAdmin>
      <PostForm />
    </IsAdmin>
  );
}

export default page;
