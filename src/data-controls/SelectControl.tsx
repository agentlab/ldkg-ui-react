/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useEffect } from 'react';
import { Select, Divider } from 'antd';

import { rankWith, RankedTester, uiTypeIs } from '../testers';
import { withStoreToSelectControlProps } from '../util/ContextToProps';

export const AntdSelectControl: React.FC<any> = (props) => {
  const { handleChange, dataSource } = props;
  //const options = merge({}, viewKindElement.options);
  const data: any = [];
  const dataObject: any = {};

  if (Array.isArray(dataSource)) {
    dataSource.forEach((e: any) => {
      data.push({
        value: e['@id'],
        label: e.title || e['@id'],
      });
      dataObject[e['@id']] = e;
    });
  } else {
    for (const key in dataSource) {
      data.push({
        value: dataSource[key]['@id'],
        label: dataSource[key].title || dataSource[key]['@id'],
      });
      dataObject[key] = dataSource[key];
    }
  }

  const onSelect = (selected: any) => {
    handleChange(dataObject[selected]);
  };

  useEffect(() => {
    if (data[0]) handleChange(dataObject[data[0].value]);
  }, [data, dataObject, handleChange]);

  return (
    <div>
      <div style={{ marginLeft: 24, display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            display: 'inline',
            marginRight: 10,
            fontSize: 20,
          }}>
          {props?.options?.label || ''}:{' '}
        </div>
        <Select defaultValue={data[0]?.value} options={data} onSelect={onSelect} style={{ width: 400 }} />
      </div>
      <Divider style={{ marginTop: 7, marginBottom: 24 }} />
    </div>
  );
};

export const antdSelectControlTester: RankedTester = rankWith(2, uiTypeIs('aldkg:SelectControl'));
export const AntdSelectControlWithStore = withStoreToSelectControlProps(AntdSelectControl);
