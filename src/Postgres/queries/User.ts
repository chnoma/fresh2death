import { Pool, QueryErrors } from './mod.ts';
import { User, UserFields } from '../schema/mod.ts';

// export async function getUserByID(id: number): Promise<User | Error> {
//   try {
//     const conn = await Pool.connect();
//     const result = await conn.queryArray(`SELECT ${}`)
//   }