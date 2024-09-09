type ApiSuccessResponse<T> = {
  success: true;
  status: number;
  message: string;
  data?: T;
};

type ApiErrorResponse<T> = {
  success: false;
  status: number;
  message: string;
  errors?: unknown;
};

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse<T>;

type ApiResponseParams<T> = {
  success: boolean;
  status: number;
  message: string;
  data?: T;
  errors?: unknown;
};

const apiResponse = <T>({
  data,
  message,
  status,
  success,
}: ApiResponseParams<T>): ApiResponse<T> => {
  return {
    success: success ? true : false,
    status,
    message,
    ...(success && { data }),
    ...(!success && { errors: data }),
  };
};

export default apiResponse;
