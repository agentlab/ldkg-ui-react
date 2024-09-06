import { ArrayIRI, ArrayLocale, SaveReqDialogIRI, SaveReqDialogLocale } from '..';
import { QueryFormIRI, QueryFormLocale, QueryIRI, QueryLocale } from '../controls';
import { FormLayoutIRI, FormLayoutLocale } from '../layouts';

export interface Locale {
  locale: string;
  [ArrayIRI]: ArrayLocale;
  [FormLayoutIRI]?: FormLayoutLocale;
  [QueryFormIRI]?: QueryFormLocale;
  [QueryIRI]?: QueryLocale;
  [SaveReqDialogIRI]?: SaveReqDialogLocale;
}
