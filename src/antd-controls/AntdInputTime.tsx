/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import moment from 'moment';
import React from 'react';
import { TimePicker } from 'antd';

import { areEqual } from '../util/ContextToProps';

export const AntdInputTime = React.memo((props: any /*CellProps & WithClassname*/) => {
  const { data, className, enabled, path, handleChange } = props;
  return (
    <TimePicker
      value={data || ''}
      onChange={(time, timeString) => handleChange(path, moment(timeString).format('LTS'))}
      className={className}
      disabled={!enabled}
    />
  );
}, areEqual);
