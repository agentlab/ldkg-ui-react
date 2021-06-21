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

import { rankWith, RankedTester, isStringControl } from '../testers';
import { withStoreToCellProps } from '../util/ContextToProps';

import { AntdInputText } from '../antd-controls/AntdInputText';
import { CellRenderer } from './CellRenderer';

export const AntdTextCell = (props: any) => {
  return <CellRenderer Cell={AntdInputText} {...props} />;
};

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const antdTextCellTester: RankedTester = rankWith(1, isStringControl);

export const AntdTextCellWithStore = withStoreToCellProps(AntdTextCell);
