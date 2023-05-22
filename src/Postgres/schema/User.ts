export interface User {
  id: number;
  username: string;
  password: string;
  display_name: string;
}
export const UserFields: Array<keyof User> = ["id", "username", "password", "display_name"];