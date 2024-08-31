import { UserEntity } from 'src/modules/features/user/entities/user.entity';

export interface GenerateOTPOptions {
  digits: boolean;
  lowerCaseAlphabets: boolean;
  upperCaseAlphabets: boolean;
  specialChars: boolean;
}

export interface PaginationResponse<T> {
  meta: Metadata;
  data: T[];
}

export interface Metadata {
  count: number;
  limit: number;
  page: number;
  totalPages: number;
}

export enum AuthorizationHeader {
  BEARER = 'Bearer Authorization',
}

export enum RegexError {
  ALPHABETIC = 'must only contain letters and spaces',
  ALPHANUMERIC = 'must only contain letters, numbers, and spaces',
  NUMERIC = 'must only contain numbers',
}

export interface SuccessResponse {
  url: string;
  filename: string;
  mimetype: string;
}

export type ConnectionProtocol = 'http' | 'ws';

export enum ConnectionType {
  WS = 'ws',
  HTTP = 'http',
}

export interface RequestUser {
  user?: UserEntity;
}
export interface CustomRequest extends Request {
  user: RequestUser;
}

export interface JWT {
  id: string;
  email: string;
}

export interface SalesforceUserResponse {
  records: Array<{
    TimeZoneSidKey: string;
    // Add other properties as needed
  }>;
}
