import Axios from "axios";

/**
 * isValidArray is to check is valid array
 *
 * @param arr is the array to check
 */
export const isValidArray = (arr: []) => {
  return arr && Array.isArray(arr) && arr.length > 0;
};

/**
 * isValidObject is to check is valid object
 *
 * @param obj is the object to check
 */
export const isValidObject = (obj: {}) => {
  return obj !== null && typeof obj === "object" && Object.keys(obj).length > 0;
};

/**
 * isValidString is to check is valid string
 *
 * @param str is the string to check
 */
export const isValidString = (str: string) => {
  return str && typeof str === "string" && str.length > 0;
};

//getHeaderWithToken to form header information
const getHeader= () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return headers;
};

/**
 * getAxiosHeader is to get complete header information
 *
 * @param url is used to get url
 * @param reqType is used to get request type
 * @param obj is used to get object to post
 */
const getAxiosHeader = (url: string, reqType: string, obj: {} | undefined) => {
  const cancelToken = Axios.CancelToken.source();
  const reqObj = {
    method: reqType,
    url: url,
    data: obj,
    headers: getHeader(),
    timeout: 200000,
    cancelToken: cancelToken.token,
  };
  return reqObj;
};

/**
 * fetchWithAxios is to call axios API call
 *
 * @param url is used to get url
 * @param reqType is used to get request type
 * @param obj is used to get object to post
 */
export const fetchWithAxios = (
  url: string,
  reqType: string,
  obj?: {} | undefined
) => {
  return Axios(getAxiosHeader(url, reqType, obj))
    .then((response) => {
      if (response && response.hasOwnProperty("data")) {
        return response.data;
      }
    })
    .catch((error) => {
      if (Axios.isCancel(error)) {
        throw error || "Operation canceled";
      }
      throw error;
    });
};
