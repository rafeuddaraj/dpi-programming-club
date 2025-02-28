export const errorResponse = (
  message = "There was an problem!",
  status = 500
) => ({
  error: true,
  message,
  status,
});
export const successResponse = (
  message = "Successfully Fetched",
  status = 200,
  data = []
) => ({
  error: false,
  message,
  status,
  data,
});
