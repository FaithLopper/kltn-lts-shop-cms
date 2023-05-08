import { errorCodes } from "../constants";
import { showErrorMessage } from "../services/notifyService";

const errorCodeHandler = (errorCode = "") => {
  errorCodes[errorCode] && showErrorMessage(errorCodes[errorCode].msg)
};

const handleApiResponse = (result, onCompleted, onError) => {
  const { success, responseData } = result;
  if (success && responseData.result) {
    onCompleted && onCompleted(responseData);
  } else {
    responseData?.code && errorCodeHandler(responseData.code);
    onError && onError(responseData);
  }
};

export { handleApiResponse };
