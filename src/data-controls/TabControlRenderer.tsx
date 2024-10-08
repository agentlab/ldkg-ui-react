/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useContext } from 'react';
import { Tabs, Col, Spin } from 'antd';
import { getSnapshot, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';
import { JsObject } from '@agentlab/sparql-jsld-client';

import { MstViewKindElement } from '../models/MstViewDescr';

import { rankWith, RankedTester, uiTypeIs } from '../testers';
import { MstContext } from '../MstContext';
import { processViewKindOverride, RenderProps } from '../Form';
import { MstJsObject } from '@agentlab/sparql-jsld-client';

export const MstVkeTabControl = types.compose(
  'MstVkeTabControl',
  MstViewKindElement,
  types.model({
    '@type': types.literal('aldkg:TabControl'),
    tabs: types.maybe(types.array(MstJsObject)),
  }),
);

export type TMstVkeTabControl = Instance<typeof MstVkeTabControl>;
export type TMstVkeTabControlSnapshotIn = SnapshotIn<typeof MstVkeTabControl>;
export type TMstVkeTabControlSnapshotOut = SnapshotOut<typeof MstVkeTabControl>;

export const AntdTabControlWithStore = observer<RenderProps>((props) => {
  const { schema, viewKind, viewDescr } = props;
  const { store } = useContext(MstContext);
  //if (viewKindElement.resultsScope && !store.saveLogicTree[viewKindElement.resultsScope]) {
  //  store.setSaveLogic(viewKindElement.resultsScope);
  //}

  const [id, collIri, collIriOverride, inCollPath, viewKindElement, viewDescrElement] = processViewKindOverride(
    props,
    store,
  );
  const options = viewKindElement.options || {};

  const coll = store.rep.getColl(collIriOverride);
  const data = coll?.data;
  if (!data) {
    return <Spin />;
  }
  const withConnections = options.connections;
  let tabs: JsObject[] = getSnapshot(data);

  //if (tabs && tabs[0] && tabs[0].rank) {
  //  tabs = tabs.slice().sort((t1, t2) => t1.rank - t2.rank);
  //}

  const viewKindElementJs = /*getSnapshot(*/ viewKindElement; /*)*/
  let additionalTabs = (viewKindElementJs as any).tabs;
  if (additionalTabs) {
    additionalTabs = additionalTabs.slice().sort((t1: JsObject, t2: JsObject) => t1.rank - t2.rank);
    tabs = [
      ...additionalTabs.filter((t: JsObject) => t.rank <= 100),
      ...tabs,
      ...additionalTabs.filter((t: JsObject) => t.rank > 100),
    ];
  }

  const handleChange = (data2: any) => {
    store.setSelectedData(collIriOverride, data2);
    if (withConnections) store.rep.editConn(withConnections, data2);
  };

  const onSelect = (key: string) => {
    const v = tabs[Number(key)];
    if (v['@type'] === 'aldkg:Tab') {
      handleChange(v.value);
    } else {
      handleChange(v);
    }
  };
  return (
    <div style={{ width: 'auto', display: 'flex', alignItems: 'left' }}>
      {options.title ? (
        <Col>
          <h2 style={{ margin: '0 24px 0 0' }}>{options.title}</h2>
        </Col>
      ) : (
        <></>
      )}
      <Col>
        <Tabs size='small' onChange={onSelect}>
          {tabs.map((tab, index) => (
            <Tabs.TabPane tab={tab.title} key={String(index)} />
          ))}
        </Tabs>
      </Col>
    </div>
  );
});

export const antdTabControlTester: RankedTester = rankWith(2, uiTypeIs('aldkg:TabControl'));
