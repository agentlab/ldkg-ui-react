import { QueryFormIRI, QueryFormLocale } from '../controls/QueryForm';

export interface Locale {
  locale: string;
  [QueryFormIRI]?: QueryFormLocale;
}
