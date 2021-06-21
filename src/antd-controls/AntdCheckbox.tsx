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
import { Checkbox } from 'antd';

import { areEqual } from '../util/ContextToProps';
//import { ControlComponent } from '../Form';

export const AntdCheckbox = React.memo((props: any) => {
  const { data, id, enabled, handleChange, uiOptions = {}, editing } = props;
  const autoFocus = !!uiOptions.focus;
  const [currentData, setCurrentData] = useState(data);
  const onChange = (ev: any) => {
    const newData = ev.target.checked;
    setCurrentData(newData);
    handleChange(newData);
  };
  useEffect(() => {
    if (!editing) {
      setCurrentData(data);
    }
  }, [editing, data]);
  return (
    <Checkbox checked={currentData || false} onChange={onChange} id={id} disabled={!enabled} autoFocus={autoFocus} />
  );
}, areEqual);
