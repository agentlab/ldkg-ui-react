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

import { rankWith, RankedTester, isDateTimeControl } from '../testers';
import { withStoreToCellProps } from '../util/ContextToProps';

import { AntdInputDate } from '../antd-controls/AntdInputDate';
import { CellRenderer } from './CellRenderer';

export const AntdTimeCell = (props: any) => {
  return <CellRenderer Cell={AntdInputDate} {...props} />;
};

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const antdTimeCellTester: RankedTester = rankWith(2, isDateTimeControl);

export const AntdTimeCellWithStore = withStoreToCellProps(AntdTimeCell);
