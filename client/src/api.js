const BASE = "https://future-fs-02-0tis.onrender.com/api/leads";

export const api = {
  list: () =>
    fetch(BASE).then((res) => res.json()),

  create: (data) =>
    fetch(BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  update: (id, data) =>
    fetch(`${BASE}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  remove: (id) =>
    fetch(`${BASE}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json()),
};