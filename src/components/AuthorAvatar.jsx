import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AuthorAvatar({ image = 156, size = 156 }) {
  return (
    <Avatar style={{ width: `${size}px`, height: `${size}px` }}>
      <AvatarImage src={image} alt="author" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export default AuthorAvatar;
