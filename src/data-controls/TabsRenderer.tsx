/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useState } from 'react';
import { Tabs } from 'antd';

import { SaveReqDialoglWithStore } from '../util/OnSaveDialog';
import { FormsDispatch } from '../Form';

/*const clone = (obj: any) => {
  let result: any = {};
  if (Array.isArray(obj)) {
    result = obj.map((e: any) => {
      return clone(e);
    });
  } else {
    Object.keys(obj).forEach((key: string) => {
      result[key] = key === 'options' || key === 'elements' || typeof key === 'number' ? clone(obj[key]) : obj[key];
    });
  }
  return result;
};*/
export const TabsRenderer: React.FC<any> = (props) => {
  const { enabled, child, onSelect, uischema, viewElement, view, editing } = props;
  const [activeKey, setActiveKey] = useState('0');
  const [visible, setVisible] = useState(false);
  const [selectedCache, setSelectedCache] = useState<any>();
  const elements = viewElement.elements;
  const setSelected = (key: string) => {
    if (!editing) {
      onSelect(child[Number(key)]);
      setActiveKey(key);
    } else {
      setSelectedCache(key);
      setVisible(true);
    }
  };
  const dataTabs = child.map((e: any, index: number) => {
    return e.viewElement ? (
      <Tabs.TabPane tab={e.title} key={'' + index}>
        <FormsDispatch
          viewElement={e.viewElement}
          uischema={uischema}
          enabled={enabled}
          view={view}
          parent={viewElement.resultsScope}
        />
      </Tabs.TabPane>
    ) : (
      <div>Нет данных</div>
    );
  });
  const idx = dataTabs.length;
  const viewTabs = elements
    ? elements.map((e: any, index: number) => {
        const title = e.options && e.options.title;
        return (
          <Tabs.TabPane tab={title} key={'' + (index + idx)}>
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
      <Tabs type='card' activeKey={activeKey} onChange={setSelected}>
        {dataTabs.concat(viewTabs)}
      </Tabs>
      <SaveReqDialoglWithStore
        visible={visible}
        onOk={() => {
          setVisible(false);
          onSelect(child[Number(selectedCache)]);
          setActiveKey(selectedCache);
        }}
        schemaUri={viewElement.resultsScope}
        onCancel={() => setVisible(false)}
      />
    </React.Fragment>
  );
};
