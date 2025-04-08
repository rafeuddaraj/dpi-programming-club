export const MEMBER = {
  "read:own_user": "read:own_user",
  "update:own_user": "update:own_user",
  "delete:own_user": "delete:own_user",
};
const MODERATOR = {};

const ADMIN = {
  create: "create",
  read: "read",
  update: "update",
  delete: "delete",
};

export const ROLES = {
  member: Object.values(MEMBER),
  moderator: Object.values(MODERATOR),
  admin: Object.values(ADMIN),
};

export const hasPermission = (role, permission) =>
  ROLES[role]?.includes(permission);
