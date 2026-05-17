const apiResponse = ({
  success = true,
  message = "",
  data = null,
  meta = null
}) => {
  return {
    success,
    message,
    data,
    meta
  };
};

module.exports = apiResponse;