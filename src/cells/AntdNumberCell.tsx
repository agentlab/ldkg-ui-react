/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';

import { rankWith, RankedTester, isIntegerControl, isNumberControl } from '../testers';
import { withStoreToCellProps } from '../util/ContextToProps';

import { AntdInputNumber } from '../antd-controls/AntdInputNumber';
import { CellRenderer } from './CellRenderer';

export const AntdNumberCell = (props: any) => {
  return <CellRenderer Cell={AntdInputNumber} {...props} />;
};

export const antdIntegerCellTester: RankedTester = rankWith(2, isIntegerControl);
export const AntdIntegerCellWithStore = withStoreToCellProps(AntdNumberCell);

export const antdNumberCellTester: RankedTester = rankWith(2, isNumberControl);
export const AntdNumberCellWithStore = withStoreToCellProps(AntdNumberCell);
