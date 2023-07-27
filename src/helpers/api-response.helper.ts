export const successResponse = (
  res,
  status,
  data = {},
  message = "",
  meta = {}
) => {
  res.status(status).json({
    success: true,
    data,
    message,
    meta,
    errors: [],
  });
};

export const failureResponse = (
  res,
  status,
  errors = [],
  message = "Something went wrong !",
  data = {}
) => {
  res.status(status).json({
    success: false,
    data,
    status,
    message,
    meta: {},
    errors,
  });
};
