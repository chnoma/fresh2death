export interface Schema {
  id: number;
  title: string;
  body: string;
  user_id: number;
}
export const Fields: (keyof Schema)[] = ["id", "title", "body", "user_id"];
export type Fields = typeof Fields;
export const TableName = 'post';