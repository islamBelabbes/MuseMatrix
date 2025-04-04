import { RefreshCcw } from "lucide-react";
import React from "react";

type TErrorFullBackProps = {
  onRetry?: () => void;
};

function ErrorFullBack({ onRetry }: TErrorFullBackProps) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-red-700">حصلت مشكلة</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1 text-sm"
          type="button"
        >
          <span>اعادة المحاولة</span>
          <RefreshCcw size={15} />
        </button>
      )}
    </div>
  );
}

export default ErrorFullBack;
