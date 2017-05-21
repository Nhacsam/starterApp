/**
 * @flow
 * @providesModule modelDefinition
 */

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
