import React from "react";
import Spinner from "./ui/spinner";
import { Button } from "./ui/button";

type TLoadMoreButtonProps = {
  onClick: () => void;
  isLoading: boolean;
};

function LoadMoreButton({ onClick, isLoading }: TLoadMoreButtonProps) {
  return (
    <Button onClick={onClick} disabled={isLoading}>
      {isLoading ? <Spinner className="size-5" /> : "تحميل المزيد"}
    </Button>
  );
}

export default LoadMoreButton;
