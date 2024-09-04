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

import { rankWith, RankedTester, uiTypeIs } from '../testers';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const colors = ['#FED6BC', '#FFFADD', '#DEF7FE', '#E7ECFF', '#C3FBD8', '#FDEED9', '#F6FFF8', '#B5F2EA', '#C6D8FF'];

export const PanelWithText: React.FC<any> = (props) => {
  const style = props?.viewKindElement.options?.style;
  const value = props?.viewKindElement.options?.value;
  return (
    <div style={{ ...style, backgroundColor: colors[getRandomInt(colors.length)] }}>
      <pre style={{ verticalAlign: 'center' }}>{value}</pre>
    </div>
  );
};

export const panelWithTextControlTester: RankedTester = rankWith(3, uiTypeIs('aldkg:TextPanel'));
