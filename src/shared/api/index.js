import { makeRequest } from "./config";

const makeActionRequest = (action, params) => {
    return makeRequest({
        action,
        params
    });
};

export const api = {
    getIds: (params) => makeActionRequest("get_ids", params),
    getItems: (params) => makeActionRequest("get_items", params),
    getFields: (params) => makeActionRequest("get_fields", params),
    filter: (params) => makeActionRequest("filter", params)
};
