export enum UserRoleEnum {
    Admin = "Admin",
    Supplier = "Supplier",
    Client = "Client"
  }
export type UserRole = "Admin" | "Supplier" | "Client";

export const UserRoles: UserRole[] = ["Admin", "Supplier", "Client"];
