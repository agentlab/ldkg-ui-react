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
import { Input } from 'antd';

import { areEqual } from '../util/ContextToProps';

export const AntdInputNumber = React.memo((props: any) => {
  const { data, className, id, enabled, handleChange, editing, inputRef } = props;
  const toNumber = (value: string) => (value === '' ? undefined : parseInt(value, 10));
  const appliedUiSchemaOptions: any = {};
  const [currentData, setCurrentData] = useState(data);
  const onChange = (ev: any) => {
    const newData = toNumber(ev.target.value);
    setCurrentData(newData);
    handleChange(newData);
  };
  useEffect(() => {
    if (!editing) {
      setCurrentData(data);
    }
  }, [editing, data]);
  return (
    <Input
      ref={inputRef}
      type='number'
      value={currentData || ''}
      onChange={onChange}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
    />
  );
}, areEqual);
