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
import { DatePicker } from 'antd';

/*export interface DateControl {
  dateLocale?: Dayjs;
}*/
export const AntdInputDate: React.FC<any> = (props) => {
  const { data, enabled, handleChange, editing, inputRef } = props;
  const localeDateTimeFormat = 'L';
  const [currentData, setCurrentData] = useState(data);
  const onChange = (date: Dayjs) => {
    const dateNonNullStr = date ? date.format(localeDateTimeFormat) : '';
    setCurrentData(dateNonNullStr);
    handleChange(dateNonNullStr);
  };
  useEffect(() => {
    if (!editing) {
      setCurrentData(data);
    }
  }, [editing, data]);
  return (
    <DatePicker
      // id={id + '-input'}
      ref={inputRef}
      value={dayjs(currentData) || null}
      onChange={onChange}
      format={localeDateTimeFormat}
      disabled={!enabled}
    />
  );
};

/*export interface StatePropsOfDateControl extends StatePropsOfControl {
  defaultLabel: string;
  cancelLabel: string;
  clearLabel: string;
}*/
