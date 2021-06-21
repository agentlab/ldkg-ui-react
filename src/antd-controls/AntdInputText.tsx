/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { isEqual } from 'lodash-es';
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

export const AntdInputText: React.FC<any> = React.memo(
  (props) => {
    const { data, id, enabled, handleChange, editing, inputRef, onValidation = () => {} } = props;
    const appliedUiSchemaOptions: any = {};
    const [currentData, setCurrentData] = useState(data);
    const onChange = (ev: any) => {
      const newData = ev.target.value;
      setCurrentData(newData);
    };
    const onSave = (ev: any) => {
      const newData = ev.target.value;
      setCurrentData(newData);
      handleChange(newData);
      onValidation(newData);
    };
    useEffect(() => {
      if (!editing) {
        setCurrentData(data);
      }
    }, [editing, data]);
    return (
      <Input
        ref={inputRef}
        type={appliedUiSchemaOptions.format === 'password' ? 'password' : 'text'}
        onChange={onChange}
        onPressEnter={onSave}
        onBlur={onSave}
        value={currentData || ''}
        id={id}
        disabled={!enabled}
        autoFocus={appliedUiSchemaOptions.focus}
      />
    );
  },
  (prevProps: any, nextProps: any) => isEqual(prevProps, nextProps),
);
