/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';
import { RankedTester, rankWith, uiTypeIs } from '../testers';

import { EditableTable } from './BaseTable';

export const ArrayIRI = 'aldkg:Array';

export interface ArrayLocale {
  extSettings: string;
  columnSettings: string;
  btnCancel: string;
  btnSave: string;
}

export const BaseTableArrayControlRenderer = (props: any): JSX.Element => {
  return (props.schema && <EditableTable {...props} />) || <div />;
};

export const tableArrayControlTester: RankedTester = rankWith(3, uiTypeIs('aldkg:Array'));

export const tableRenderers: any[] = [
  {
    tester: tableArrayControlTester,
    renderer: BaseTableArrayControlRenderer,
  },
];
