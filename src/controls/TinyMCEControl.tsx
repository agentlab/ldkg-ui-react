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
import { ControlComponent } from '../Form';
import { withStoreToControlProps } from '../util/ContextToProps';

import { TinyMCE } from '../antd-controls/TinyMCE';
import { AntdInputControl } from './AntdInputControl';

export const TinyMCEControl: React.FC<ControlComponent> = (props) => {
  return <AntdInputControl {...props} input={TinyMCE} />;
};

export const tinyMCEControlTester: RankedTester = rankWith(3, (v: any, s: any) => {
  return s && s.contentMediaType === 'text/html';
});
export const TinyMCEControlWithStore = withStoreToControlProps(TinyMCEControl);
