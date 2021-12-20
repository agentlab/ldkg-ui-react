import { JsObject } from '@agentlab/sparql-jsld-client';
import { CELL_TYPE } from '../constants';

type Props = {
  viewKind: JsObject;
  key: string;
};

export const createViewKindElement = ({ viewKind, key }: Props): JsObject => {
  const options = viewKind?.options?.[key];
  const viewKindElement = {
    '@id': `${viewKind['@id']}-${key}-cell`,
    '@type': CELL_TYPE,
    options,
  };
  return viewKindElement;
};
