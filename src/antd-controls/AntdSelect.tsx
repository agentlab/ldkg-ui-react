/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { merge } from 'lodash-es';
import React from 'react';
import { Select } from 'antd';

import { areEqual } from '../util/ContextToProps';

export const AntdSelect = React.memo((props: any /*EnumCellProps & WithClassname*/) => {
  const { data, className, id, enabled, uischema, path, handleChange, options = [], config } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  console.log('OPTIONS', options);

  return (
    <Select
      className={className}
      id={id}
      style={{ width: 120 }}
      disabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
      value={data || ''}
      onChange={(value: any) => handleChange(path, value)}>
      {[
        <Select.Option value='' key={'empty'}>
          ''
        </Select.Option>,
      ].concat(
        options.map((optionValue: any) => (
          <Select.Option value={optionValue} key={optionValue}>
            {optionValue}
          </Select.Option>
        )),
      )}
    </Select>
  );
}, areEqual);
