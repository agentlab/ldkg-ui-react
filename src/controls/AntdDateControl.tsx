/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import dayjs, { Dayjs } from 'dayjs';
import React, { useState, useEffect } from 'react';
import { DatePicker, Col, Row } from 'antd';

import { computeLabel, isPlainLabel } from '../renderers';
import { rankWith, RankedTester, isDateControl } from '../testers';
import { ControlComponent } from '../Form';
import { withStoreToControlProps } from '../util/ContextToProps';

export interface DateControlProps {
  dateLocale?: Dayjs;
}
export const AntdDateControl: React.FC<ControlComponent & DateControlProps> = (props) => {
  const { id, label, editing, enabled, required, handleChange, data, dateLocale, uiOptions = {} } = props;
  const defaultLabel = label as string;
  const localeDateTimeFormat = dateLocale ? `${(dateLocale as any).localeData().longDateFormat('L')}` : 'YYYY-MM-DD';
  const [currentData, setCurrentData] = useState(data);

  let labelText;

  if (isPlainLabel(label)) {
    labelText = label;
  } else {
    labelText = defaultLabel;
  }
  const onChange = (date: Dayjs) => {
    const dateNonNullStr = date ? date.format(localeDateTimeFormat) : 'YYYY-MM-DD';
    setCurrentData(dateNonNullStr);
    handleChange(dateNonNullStr);
  };
  useEffect(() => {
    if (!editing) {
      setCurrentData(data);
    }
  }, [editing, data]);
  return (
    <Row>
      <Col span={8}>
        <label className={'label-nowrap'} htmlFor={id}>
          {computeLabel(labelText, required as boolean, uiOptions.hideRequiredAsterisk)}:
        </label>
      </Col>
      <Col span={16}>
        <DatePicker
          // id={id + '-input'}
          value={dayjs(currentData) || null}
          onChange={onChange}
          format={localeDateTimeFormat}
          disabled={!enabled}
          autoFocus={uiOptions.focus}
        />
      </Col>
    </Row>
  );
};

export const antdDateControlTester: RankedTester = rankWith(4, isDateControl);
export const AntdDateControlWithStore = withStoreToControlProps(AntdDateControl);
