/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useContext } from 'react';
import { getSnapshot } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';

import { MstContext } from '../MstContext';

export const StoreDataFormater: any = observer<any>(({ value, query, propKey }: any) => {
  const { store } = useContext(MstContext);
  const coll = store.getColl(query);
  let data = coll?.data;
  if (data === undefined) {
    return <span>{value}</span>;
  }
  data = getSnapshot(data);
  const element = data.find((e: any) => e['@id'] === value);
  return <span>{element ? element[propKey || 'title'] : value}</span>;
});
