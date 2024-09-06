import type { Locale } from '.';
import { QueryFormIRI } from '../controls/QueryForm';
import { enUS } from './en_US';

export const itIT: Locale = {
  ...enUS,
  locale: 'it_IT',
  [QueryFormIRI]: {
    searchBtnTitle: 'Ricerca',
  },
};
