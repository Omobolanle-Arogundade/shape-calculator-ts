export const defaultScope = {
  attributes: [
    "id",
    "result",
    "shape",
    "created_at",
    "updated_at",
    "deleted_at"
  ]
};

export const scopes = {
  full: {
    ...defaultScope
  },
  list: {
    ...defaultScope
  }
};
