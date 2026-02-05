import { Tables, TablesInsert } from "./database.types";

export type User = Tables<"users">;

export type Movie = Tables<"movies">;

export type MovieInsert = TablesInsert<"movies">;
