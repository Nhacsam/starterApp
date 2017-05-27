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
