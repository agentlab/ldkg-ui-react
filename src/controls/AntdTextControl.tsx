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
import { ControlComponent } from '../Form';
import { withStoreToControlProps } from '../util/ContextToProps';

import { AntdInputText } from '../antd-controls/AntdInputText';
import { AntdInputControl } from './AntdInputControl';

export const AntdTextControl: React.FC<ControlComponent> = (props) => (
  <AntdInputControl {...props} input={AntdInputText} />
);

export const antdTextControlTester: RankedTester = rankWith(1, isStringControl);
export const AntdTextControlWithStore = withStoreToControlProps(AntdTextControl);
