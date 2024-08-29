import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const AuthorScalarFieldEnumSchema = z.enum(['id','avatar','name','createdAt','updatedAt']);

export const PostScalarFieldEnumSchema = z.enum(['id','title','content','cover','status','authorId','genreId','createdAt','updatedAt']);

export const GenreScalarFieldEnumSchema = z.enum(['id','title','createdAt','updatedAt']);

export const QuoteScalarFieldEnumSchema = z.enum(['id','quote','color','postId','authorId','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const AuthorOrderByRelevanceFieldEnumSchema = z.enum(['avatar','name']);

export const PostOrderByRelevanceFieldEnumSchema = z.enum(['title','content','cover']);

export const GenreOrderByRelevanceFieldEnumSchema = z.enum(['title']);

export const NullsOrderSchema = z.enum(['first','last']);

export const QuoteOrderByRelevanceFieldEnumSchema = z.enum(['quote','color']);

export const STATUSSchema = z.enum(['Draft','Published']);

export type STATUSType = `${z.infer<typeof STATUSSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// AUTHOR SCHEMA
/////////////////////////////////////////

export const AuthorSchema = z.object({
  id: z.number().int(),
  avatar: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Author = z.infer<typeof AuthorSchema>

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  status: STATUSSchema,
  id: z.number().int(),
  title: z.string(),
  content: z.string(),
  cover: z.string(),
  authorId: z.number().int(),
  genreId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// GENRE SCHEMA
/////////////////////////////////////////

export const GenreSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Genre = z.infer<typeof GenreSchema>

/////////////////////////////////////////
// QUOTE SCHEMA
/////////////////////////////////////////

export const QuoteSchema = z.object({
  id: z.number().int(),
  quote: z.string(),
  color: z.string().nullable(),
  postId: z.number().int().nullable(),
  authorId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Quote = z.infer<typeof QuoteSchema>
