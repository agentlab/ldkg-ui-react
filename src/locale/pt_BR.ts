import type { Locale } from '.';
import { QueryFormIRI } from '../controls/QueryForm';
import { enUS } from './en_US';

export const ptBR: Locale = {
  ...enUS,
  locale: 'pt_BR',
  [QueryFormIRI]: {
    searchBtnTitle: 'Procurar',
  },
};
