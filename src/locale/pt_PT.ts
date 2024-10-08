import type { Locale } from '.';
import { QueryFormIRI } from '../controls/QueryForm';
import { enUS } from './en_US';

export const ptPT: Locale = {
  ...enUS,
  locale: 'pt_PT',
  [QueryFormIRI]: {
    searchBtnTitle: 'Procurar',
  },
};
