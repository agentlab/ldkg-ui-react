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
import { Button } from 'antd';
import { JsObject } from '@agentlab/sparql-jsld-client';

import { rankWith, uiTypeIs, RankedTester } from '../testers';
import { withStoreToButtonProps } from '../util/ContextToProps';

import { LegacyTypeIcon as LegacyIcon } from '../icons';

export interface ButtonControlProps {
  handleChange: () => void;
  options?: JsObject;
}

export const AntdButtonControl: React.FC<ButtonControlProps> = ({ handleChange, options = {} }) => {
  return (
    <Button onClick={handleChange} className={options.icon ? 'ant-btn-icon-only' : ''}>
      {options.icon ? <LegacyIcon type={options.icon} theme='outlined' /> : null}
      {options.content ? options.content : null}
    </Button>
  );
};

export const antdButtonControlTester: RankedTester = rankWith(2, uiTypeIs('aldkg:Button'));
export const AntdButtonControlWithStore = withStoreToButtonProps(AntdButtonControl);
