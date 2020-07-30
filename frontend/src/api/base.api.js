export default class BaseAPI {
  constructor(resource) {
    this.resource = resource;
    this.basePath = `/api/${resource}`;
  }

  query(params) {
    params = new URLSearchParams(params).toString();
    const path = params ? `${this.basePath}?${params}` : this.basePath;
    return fetch(path, {
      method: "GET",
      credentials: "same-origin",
    });
  }

  get() {
    return fetch(this.basePath, {
      method: "GET",
      credentials: "same-origin",
    });
  }

  create(params) {
    return fetch(this.basePath, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  }

  update(id, params) {
    return fetch(`${this.basePath}/${id}`, {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  }

  delete(id) {
    return fetch(`${this.basePath}/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
    });
  }
}
