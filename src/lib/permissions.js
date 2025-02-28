export const MEMBER = {
  "read:own_user": "read:own_user",
  "update:own_user": "update:own_user",
  "delete:own_user": "delete:own_user",
};

export const ROLES = {
  member: Object.values(MEMBER),
};

export const hasPermission = (role, permission) =>
  ROLES[role]?.includes(permission);
