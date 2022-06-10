import apiGenerator from "./apiGenerator";

export const GET_COUNTRYS = apiGenerator({
    url: `/mng/v1/action/get-countries`,
    method: "GET",
    isLoading: true
});
