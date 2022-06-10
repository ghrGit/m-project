import { ComponentInternalInstance, getCurrentInstance } from "vue";

function useCurrentInstance() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const globalProperties = appContext.config.globalProperties;
    return { ...globalProperties };
}

function getLoading(isLoading = true) {
    return isLoading
        ? useCurrentInstance().$loading({
              lock: true,
              text: "",
              background: "rgba(255, 255, 255, 0.4)"
          })
        : { close: () => ({}) };
}

function getMessage(message, type = "warning") {
    if (message) {
        useCurrentInstance().$message({
            message,
            type: type
        });
    }
}

function dealData(
    { data: result },
    loading: any,
    showMessage: boolean,
    returnResult: boolean,
    showErrorResponse: boolean
) {
    loading && loading.close && loading.close();
    const { code, msg, data, success, errorResponse } = result;
    if ((code && code == "1") || !errorResponse) {
        if (showMessage && msg && !data) {
            getMessage(msg, success ? "success" : "warning");
        }
        return returnResult ? result : data;
    } else {
        if (
            errorResponse &&
            showErrorResponse &&
            errorResponse.errorCode !== "10000030"
        )
            getMessage(errorResponse.message, "error");
        return returnResult ? result : data;
    }
}

function dealErr(err: any, loading: any) {
    loading && loading.close && loading.close();
    console.log(err);
    throw new Error(err.message);
}

const getMap = {
    GET: "$getRequest",
    POST: "$postRequest"
};

export default ({
    url,
    method = "GET",
    isLoading,
    showMessage = false,
    returnResult = false,
    showErrorResponse = true
}) => {
    return (params = {}) => {
        const loading = getLoading(isLoading);
        if (typeof params === typeof 1 || typeof params === typeof "a") {
            return useCurrentInstance()
                [getMap[method]](`${url}/${params}`)
                .then((data: any) =>
                    dealData(
                        data,
                        loading,
                        showMessage,
                        returnResult,
                        showErrorResponse
                    )
                )
                .catch((err: any) => dealErr(err, loading));
        } else {
            return useCurrentInstance()
                [getMap[method]](url, params)
                .then((data: any) =>
                    dealData(
                        data,
                        loading,
                        showMessage,
                        returnResult,
                        showErrorResponse
                    )
                )
                .catch((err: any) => dealErr(err, loading));
        }
    };
};
