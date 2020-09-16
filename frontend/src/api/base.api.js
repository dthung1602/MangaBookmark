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

  get(params, slug = "") {
    removeUndefinedAttrs(params);
    params = new URLSearchParams(params).toString();
    const path = params ? `${this.basePath}/${slug}?${params}` : `${this.basePath}/${slug}`;
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
