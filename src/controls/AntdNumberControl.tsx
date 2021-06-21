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

import { rankWith, RankedTester, isIntegerControl, isNumberControl, or } from '../testers';
import { ControlComponent } from '../Form';
import { withStoreToControlProps } from '../util/ContextToProps';

import { AntdInputNumber } from '../antd-controls/AntdInputNumber';
import { AntdInputControl } from './AntdInputControl';

export const AntdNumberControl: React.FC<ControlComponent> = (props) => (
  <AntdInputControl {...props} input={AntdInputNumber} />
);

//export const antdNumberControlTester: RankedTester = rankWith(2, or(isNumberControl, isIntegerControl));

export const antdNumberControlTester: RankedTester = rankWith(1, or(isIntegerControl, isNumberControl));
export const AntdNumberControlWithStore = withStoreToControlProps(AntdNumberControl);
