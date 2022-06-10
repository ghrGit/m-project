import { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

export interface PureHttpError extends AxiosError {
    isCancelRequest?: boolean;
}

export interface PureHttpResponse extends AxiosResponse {
    config: PureHttpRequestConfig;
}

export interface PureHttpRequestConfig extends AxiosRequestConfig {
    beforeRequestCallback?: (request: PureHttpRequestConfig) => void;
    beforeResponseCallback?: (response: PureHttpResponse) => void;
}
