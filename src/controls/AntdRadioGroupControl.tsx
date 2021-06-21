/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useState, useEffect } from 'react';
import { Radio, Row, Col } from 'antd';

import { rankWith, RankedTester, optionIs } from '../testers';
import { ControlComponent } from '../Form';
import { withStoreToControlProps } from '../util/ContextToProps';

export const AntdRadioGroupControl: React.FC<ControlComponent> = (props) => {
  const { id, data, enabled, label, schema, handleChange, required, editing, uiOptions = {} } = props;
  const [currentData, setCurrentData] = useState(data);

  const onChange = (value: any) => {
    setCurrentData(value);
    handleChange(value);
  };
  useEffect(() => {
    if (!editing) {
      setCurrentData(data);
    }
  }, [editing, data]);

  return (
    <Row>
      <Col span={8}>
        <span>{props.label}</span>
      </Col>
      <Col span={16}>
        <Radio.Group value={currentData} onChange={onChange}>
          {(uiOptions as any[]).map((optionValue) => (
            <Radio checked={data === optionValue}>{optionValue}</Radio>
          ))}
        </Radio.Group>
      </Col>
    </Row>
  );
};

export const antdRadioGroupControlTester: RankedTester = rankWith(2, optionIs('format', 'radio'));
export const AntdRadioGroupControlWithStore = withStoreToControlProps(AntdRadioGroupControl);
