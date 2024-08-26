import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "../lib/utils";

function AuthorAvatar({
  avatar,
  className,
}: {
  avatar: string;
  className?: string;
}) {
  return (
    <Avatar className={cn("size-[156px]", className)}>
      <AvatarImage src={avatar} alt="author" className="object-cover" />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
}

export default AuthorAvatar;
