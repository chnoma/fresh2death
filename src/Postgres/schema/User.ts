export interface Schema {
  id: number;
  username: string;
  password: string;
  display_name: string;
}
export const Fields: (keyof Schema)[] = ["id", "username", "password", "display_name"];
export type Fields = typeof Fields;
export const TableName = 'users';