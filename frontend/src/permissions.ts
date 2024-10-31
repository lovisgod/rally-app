type Role = "Admin" | "User";

type Action =
  | "CREATE_SPACE"
  | "INVITE_USER"
  | "CREATE_ITEM"
  | "MAKE_TRANSACTION";

const rolePermissions: Record<Role, Action[]> = {
  Admin: ["CREATE_SPACE", "INVITE_USER", "CREATE_ITEM", "MAKE_TRANSACTION"],
  User: ["CREATE_ITEM", "MAKE_TRANSACTION"],
};

export const canPerformAction = (role: Role, action: Action): boolean => {
  return rolePermissions[role]?.includes(action) ?? false;
};
