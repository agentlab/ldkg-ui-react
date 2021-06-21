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

import { rankWith, RankedTester, isBooleanControl } from '../testers';
import { withStoreToCellProps } from '../util/ContextToProps';

import { AntdCheckbox } from '../antd-controls/AntdCheckbox';
import { CellRenderer } from './CellRenderer';

export const AntdBooleanCell = (props: any) => {
  return <CellRenderer Cell={AntdCheckbox} {...props} />;
};

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const antdBooleanCellTester: RankedTester = rankWith(2, isBooleanControl);

export const AntdBooleanCellWithStore = withStoreToCellProps(AntdBooleanCell);
