import axios from "axios";
import {
    PureHttpError,
    PureHttpResponse,
    PureHttpRequestConfig
} from "./types.d";
import debounce from "../debounce";

//请求拦截
axios.interceptors.request.use(
    (config: PureHttpRequestConfig) => {
        return config;
    },
    err => {
        console.log("请求拦截");
        return Promise.resolve(err);
    }
);

function handlerErrorResponse(errorResponse: PureHttpResponse) {
    if (errorResponse) {
        debounce(
            () => {
                if (errorResponse.data.code === "14000001") {
                    alert("未登陆");
                } else {
                    console.log("处理其它错误");
                }
            },
            300,
            errorResponse.data.code
        );
    }
}

// 响应拦截
axios.interceptors.response.use(
    (response: PureHttpResponse) => {
        if (response.data.code != 0) {
            handlerErrorResponse(response);
        }
        return response;
    },
    (error: PureHttpError) => {
        //需要与服务端定好错误状态码
        if (error.response) {
            if (
                error.response.status === 504 ||
                error.response.status === 404
            ) {
                //如果是业务异常不会拦截！
                console.log("服务器异常");
            } else {
                handlerErrorResponse(error.response);
            }
        }
        return Promise.resolve(error);
    }
);

export const getRequest = (
    url: string,
    params: {
        [key: string]: any;
    },
    otherSetting = {}
) => {
    if (params) {
        params["hash"] = Date.now();
    } else {
        params = {};
        params["hash"] = Date.now();
    }
    return axios({
        method: "get",
        url: url,
        ...otherSetting,
        params,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
};

/**
 * 新增
 * @param {*} url
 * @param {*} params
 */
export const postRequest = (
    url: string,
    params: {
        [key: string]: any;
    }
) => {
    return axios({
        method: "post",
        url: url,
        data: params,
        transformRequest: [
            function (data) {
                return JSON.stringify(data);
            }
        ],
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    });
};
