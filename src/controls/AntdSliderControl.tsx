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
import { Typography, Slider, Row, Col } from 'antd';

import { rankWith, RankedTester, isRangeControl } from '../testers';
import { computeLabel, isPlainLabel } from '../renderers';
import { ControlComponent } from '../Form';
import { withStoreToControlProps } from '../util/ContextToProps';

export const AntdSliderControl: React.FC<ControlComponent> = (props) => {
  const { id, data, enabled, label, schema, handleChange, required, editing, uiOptions = {} } = props;
  const [currentData, setCurrentData] = useState(data);

  const onChange = (value: any) => {
    setCurrentData(Number(value));
    handleChange(Number(value));
  };
  useEffect(() => {
    if (!editing) {
      setCurrentData(data);
    }
  }, [editing, data]);

  return (
    <Row style={{ width: '100%' }}>
      <Col span={8}>
        <Typography id={id + '-typo'}>
          {computeLabel(
            isPlainLabel(label) ? label : label.default,
            required as boolean,
            uiOptions.hideRequiredAsterisk,
          )}
        </Typography>
      </Col>
      <Col span={16}>
        <div className={'input-margin'}>
          <Slider
            min={schema.minimum}
            max={schema.maximum}
            value={Number(currentData || '')}
            onChange={onChange}
            id={id + '-input'}
            disabled={!enabled}
            step={schema.multipleOf || 1}
          />
        </div>
      </Col>
    </Row>
  );
};

export const antdSliderControlTester: RankedTester = rankWith(4, isRangeControl);
export const AntdSliderControlWithStore = withStoreToControlProps(AntdSliderControl);
