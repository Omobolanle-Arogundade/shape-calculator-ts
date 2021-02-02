export const defaultScope = {
  attributes: [
    "id",
    "area",
    "shape",
    "uid",
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
