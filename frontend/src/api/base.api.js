import { removeUndefinedAttrs } from "../utils";

export default class BaseAPI {
  constructor(resource) {
    this.resource = resource;
    this.basePath = `/api/${resource}`;
  }

  abortableFetch(request, opts) {
    const controller = new AbortController();
    const { signal } = controller;
    return {
      result: fetch(request, { ...opts, signal }),
      abort: () => controller.abort(),
    };
  }

  createJSONBody(params) {
    if (params) {
      return {
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    return {};
  }

  createSearchParamString(params) {
    if (!params) {
      return "";
    }
    const urlSearchParams = new URLSearchParams();
    for (let [paramName, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        for (let v of value) {
          urlSearchParams.append(paramName, v);
        }
      } else {
        urlSearchParams.append(paramName, value);
      }
    }
    return urlSearchParams.toString();
  }

  get(params, slug = "") {
    removeUndefinedAttrs(params);
    const searchStr = this.createSearchParamString(params);
    const path = searchStr ? `${this.basePath}/${slug}?${searchStr}` : `${this.basePath}/${slug}`;
    return this.abortableFetch(path, {
      method: "GET",
      credentials: "same-origin",
    });
  }

  post(params, slug = "") {
    return this.abortableFetch(`${this.basePath}/${slug}`, {
      method: "POST",
      credentials: "same-origin",
      ...this.createJSONBody(params),
    });
  }

  patch(params, slug = "") {
    return this.abortableFetch(`${this.basePath}/${slug}`, {
      method: "PATCH",
      credentials: "same-origin",
      ...this.createJSONBody(params),
    });
  }

  delete(slug = "") {
    return this.abortableFetch(`${this.basePath}/${slug}`, {
      method: "DELETE",
      credentials: "same-origin",
    });
  }
}

const pollAPI = (asyncAPICall, finishCondition, delay = 5000, maxAttempt = 60) => {
  let intervalId;
  let abortAPI = () => {};
  const result = new Promise((resolve, reject) => {
    intervalId = setInterval(async () => {
      maxAttempt--;
      if (maxAttempt === -1) {
        clearInterval(intervalId);
        return reject(new Error("Max attempt reached"));
      }

      try {
        const { result, abort } = asyncAPICall();
        abortAPI = abort;
        const res = await result;

        // have to clone because the condition may consume the body
        if (await finishCondition(res.clone())) {
          clearInterval(intervalId);
          resolve(res);
        }
      } catch (e) {
        clearInterval(intervalId);
        reject(e);
      }
    }, delay);
  });

  return {
    result,
    abort: () => {
      abortAPI();
      clearInterval(intervalId);
    },
  };
};

export { pollAPI };
