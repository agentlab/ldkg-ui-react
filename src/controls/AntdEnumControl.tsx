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
import { withStoreToControlProps } from '../util/ContextToProps';
import { AntdSelect } from '../antd-controls/AntdSelect';
import { AntdInputControl } from './AntdInputControl';

export const AntdEnumControl = (props: any) => <AntdInputControl {...props} input={AntdSelect} />;

export const antdEnumControlTester: RankedTester = rankWith(2, isEnumControl);
export const AntdEnumControlWithStore = withStoreToControlProps(AntdEnumControl);
