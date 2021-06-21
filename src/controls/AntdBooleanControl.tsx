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
import { Row, Col } from 'antd';

import { rankWith, RankedTester, isBooleanControl } from '../testers';
import { ControlComponent } from '../Form';
import { withStoreToControlProps } from '../util/ContextToProps';

import { AntdCheckbox } from '../antd-controls/AntdCheckbox';

export const AntdBooleanControl: React.FC<ControlComponent> = (props) => {
  return (
    <Row>
      <Col span={8}>
        <span>{props.label}</span>
      </Col>
      <Col span={16}>
        <AntdCheckbox {...props} />
      </Col>
    </Row>
  );
};

export const antdBooleanControlTester: RankedTester = rankWith(2, isBooleanControl);
export const AntdBooleanControlWithStore = withStoreToControlProps(AntdBooleanControl);
