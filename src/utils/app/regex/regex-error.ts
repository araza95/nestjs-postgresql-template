import { ValidationArguments } from 'class-validator';
import { RegexError } from 'src/types/common.type';

export const alphabeticError = ({ property }: ValidationArguments): string =>
  `The field '${property}' ${RegexError.ALPHABETIC}`;

export const alphanumericError = ({ property }: ValidationArguments): string =>
  `The field '${property}' ${RegexError.ALPHANUMERIC}`;

export const numericError = ({ property }: ValidationArguments): string =>
  `The field '${property}' ${RegexError.NUMERIC}`;
