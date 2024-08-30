import { parse } from 'date-fns';

export const dateStringToDate = (dateString: string): Date =>
  parse(dateString, 'dd-MMMM-yyyy', new Date());
