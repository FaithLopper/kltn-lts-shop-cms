const handleApiResponse = (result, onCompleted, onError) => {
  const { success, responseData } = result;
  if (success && responseData.result) {
    onCompleted && onCompleted(responseData);
  } else {
    onError && onError(responseData);
  }
};

export { handleApiResponse };
