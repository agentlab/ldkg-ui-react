/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
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
