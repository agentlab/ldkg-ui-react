import type { Locale } from '.';
import { QueryFormIRI } from '../controls/QueryForm';
import { enUS } from './en_US';

export const deDE: Locale = {
  ...enUS,
  locale: 'de_DE',
  [QueryFormIRI]: {
    searchBtnTitle: 'Suchen',
  },
};
