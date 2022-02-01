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

import { rankWith, RankedTester } from '../testers';
import { withStoreToCellProps } from '../util/ContextToProps';

import { TinyMCE } from '../antd-controls/TinyMCE';
import { CellRenderer } from './CellRenderer';

export const TinyMCECell = (props: any): JSX.Element => {
  return <CellRenderer Cell={TinyMCE} {...props} />;
};

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const tinyMCECellTester: RankedTester = rankWith(
  10,
  (viewKindElement, schema) => viewKindElement.options !== undefined && viewKindElement.options.formatter === 'tinyMCE',
);

export const TinyMCECellWithStore = withStoreToCellProps(TinyMCECell);
