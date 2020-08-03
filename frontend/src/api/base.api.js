export default class BaseAPI {
  constructor(resource) {
    this.resource = resource;
    this.basePath = `/api/${resource}`;
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
    params = new URLSearchParams(params).toString();
    const path = params ? `${this.basePath}/${slug}?${params}` : `${this.basePath}/${slug}`;
    return fetch(path, {
      method: "GET",
      credentials: "same-origin",
    });
  }

  post(params, slug = "") {
    return fetch(`${this.basePath}/${slug}`, {
      method: "POST",
      credentials: "same-origin",
      ...this.createJSONBody(params),
    });
  }

  patch(params, slug = "") {
    return fetch(`${this.basePath}/${slug}`, {
      method: "PATCH",
      credentials: "same-origin",
      ...this.createJSONBody(params),
    });
  }

  delete(slug = "") {
    return fetch(`${this.basePath}/${slug}`, {
      method: "DELETE",
      credentials: "same-origin",
    });
  }
}
