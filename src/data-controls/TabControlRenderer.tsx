/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';
import { Tabs, Col } from 'antd';
import { JsObject } from '@agentlab/sparql-jsld-client';

import { rankWith, RankedTester, uiTypeIs } from '../testers';
import { withStoreToTabProps } from '../util/ContextToProps';

interface TabControlProps {
  tabs: JsObject[];
  handleChange?: (data: JsObject) => void;
  options: JsObject;
}

const localeRus = {
  all: 'Все',
};

export const TabControl: React.FC<TabControlProps> = ({ tabs = [], handleChange = () => {}, options = {} }) => {
  const onSelect = (key: string) => {
    if (key === 'all') {
      handleChange({});
    } else {
      handleChange(tabs[Number(key)]);
    }
  };
  return (
    <div style={{ width: 'auto', display: 'flex', alignItems: 'center' }}>
      {options.title ? (
        <Col>
          <h2 style={{ margin: '0 24px 0 0' }}>{options.title}</h2>
        </Col>
      ) : (
        <></>
      )}
      <Col>
        <Tabs size='small' onChange={onSelect}>
          <Tabs.TabPane tab={localeRus.all} key='all' />
          {tabs.map((tab, index) => (
            <Tabs.TabPane tab={tab.title} key={String(index)} />
          ))}
        </Tabs>
      </Col>
    </div>
  );
};

export const TabControlRenderer = (props: any) => {
  return <TabControl {...props} />;
};

export const antdTabControlTester: RankedTester = rankWith(2, uiTypeIs('TabControl'));
export const AntdTabControlWithStore = withStoreToTabProps(TabControlRenderer);
