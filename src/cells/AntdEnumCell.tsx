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

import { rankWith, RankedTester, isEnumControl } from '../testers';
import { withStoreToCellProps } from '../util/ContextToProps';

import { AntdSelect } from '../antd-controls/AntdSelect';

export const AntdEnumCell = (props: any /*: EnumCellProps & WithClassname*/) => <AntdSelect {...props} />;

/**
 * Default tester for enum controls.
 * @type {RankedTester}
 */
export const antdEnumCellTester: RankedTester = rankWith(2, isEnumControl);

export const AntdEnumCellWithStore = withStoreToCellProps(AntdEnumCell);
