// Helper function to extract error message
export const getErrorMessage = (err: any): string => {
  if (typeof err?.response?.data?.errorDetails?.message === "object") {
    return err.response.data.errorDetails.message[0];
  } else if (typeof err?.response?.data?.errorDetails?.message === "string") {
    return err.response.data.errorDetails.message;
  } else if (typeof err?.response?.data?.errorDetails?.error === "string") {
    return err.response.data.errorDetails.error;
  }
  return "Something went wrong!";
};
