/**
 * @flow
 * @providesModule modelDefinition
 */
import { schema } from 'normalizr';

export type UserType = {
  id: number,
  email: string,
  password?: string,
  firstName: string,
  lastName: string,
};

export type AuthType = {
  id: string,
  ttl: number,
  created: string,
  userId: number,
};

export type TvShowType = {
  id: number,
  poster_path: string,
  popularity: number,
  backdrop_path: string,
  vote_average: number,
  overview: string,
  first_air_date: string,
  origin_country: string[],
  genre_ids: number[],
  vote_count: number,
  name: string,
  original_name: string,
  genres?: { id: string, name: string }[],
};

export type NormalizedEntitiesType = {
  tvShows?: {
    [number]: TvShowType,
  },
};

export type NormalizedResultType = {
  result: any,
  entities: NormalizedEntitiesType,
};

export const tvShowSchema = new schema.Entity('tvShows', {});
