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
import { Tabs } from 'antd';

import { FormsDispatch } from '../Form';
import { rankWith, RankedTester, uiTypeIs } from '../testers';
import { withLayoutProps } from '../util/ContextToProps';

export const TabsLayout: React.FC<any> = (props) => {
  const { enabled, onSelect = () => {}, uischema, viewElement, view } = props;
  const elements = viewElement.elements;
  const viewTabs = elements
    ? elements.map((e: any, index: number) => {
        const title = e.options && e.options.title;
        return (
          <Tabs.TabPane tab={title} key={'' + index}>
            <FormsDispatch
              viewElement={e}
              uischema={uischema}
              enabled={enabled}
              view={view}
              parent={viewElement.resultsScope}
            />
          </Tabs.TabPane>
        );
      })
    : [];
  return (
    <React.Fragment>
      <Tabs type='card' size='small' onChange={onSelect}>
        {viewTabs}
      </Tabs>
    </React.Fragment>
  );
};

export const antdTabsLayoutTester: RankedTester = rankWith(2, uiTypeIs('TabsLayout'));
export const AntdTabsLayoutWithStore = withLayoutProps(TabsLayout);
