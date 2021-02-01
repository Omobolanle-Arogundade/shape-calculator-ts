export const defaultScope = {
  attributes: ["id", "name", "email", "created_at", "updated_at", "deleted_at"]
};

export const scopes = {
  full: {
    ...defaultScope
  },
  list: {
    ...defaultScope
  },
  withPassword: {
    attributes: ["id", "name", "email", "password"]
  }
};
