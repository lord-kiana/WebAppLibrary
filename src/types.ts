// src/types.ts
export type Book = {
  id: string;
  Tittle: string;
  Author: string;
  Image: string; // Must be string to satisfy your BookList img src
  Published?: string; // Optional field
  gifUrl?: string;    // Optional field
};