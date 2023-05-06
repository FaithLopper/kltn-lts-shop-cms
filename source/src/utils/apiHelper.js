const handleApiResponse = (result, onCompleted, onError) => {
  const { success, responseData } = result;
  if (success) {
    if (responseData.result) {
      onCompleted && onCompleted(responseData);
    }
    else {
      // errorCodeHandler(responseData);
    }
  } else {
    onError && onError(responseData);
  }
};

export { handleApiResponse };
