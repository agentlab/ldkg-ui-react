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
import SplitPane from 'react-split-pane';
import { Table } from 'antd';
import { autorun } from 'mobx';

import { SaveReqDialog } from '../util/OnSaveDialog';
import { FormsDispatch } from '../Form';

const divStyle: React.CSSProperties = {
  padding: '5px',
};

export const TableRenderer: React.FC<any> = React.memo(
  (props) => {
    const { viewKind, viewKindElement, viewDescr, viewDescrElement, schema, enabled, child, onSelect, editing } = props;
    const [selected, setSelected] = useState(child[0]);
    const [cacheSelect, setCacheSelect] = useState();
    const [dataSource, setDataSource] = useState(child);
    const [visible, setVisible] = useState(false);
    function columns() {
      return [
        {
          dataIndex: 'title',
          key: 'title',
          title: schema.title,
          render: (text: any) => <a href='#!'>{text}</a>,
        },
      ];
    }
    useEffect(
      () =>
        autorun(() => {
          const newData = [...child];
          setDataSource(newData);
        }),
      [child],
    );
    return (
      <React.Fragment>
        <SplitPane split='vertical' style={divStyle} minSize={100}>
          <div style={divStyle}>
            <Table
              className='gx-table-responsive'
              size='small'
              pagination={false}
              rowKey={(record) => record.uri}
              columns={columns()}
              onRow={(record) => {
                return {
                  onClick: () => {
                    if (!editing) {
                      onSelect(record);
                      setSelected(record);
                    } else {
                      setVisible(true);
                      setCacheSelect(record);
                    }
                  },
                };
              }}
              dataSource={dataSource.map((e: any) => {
                const newData = { ...e };
                if (newData.children && newData.children.length === 0) {
                  delete newData.children;
                }
                return newData;
              })}
            />
          </div>
          {selected.viewKindElement || viewKindElement.elements ? (
            <div style={divStyle}>
              <FormsDispatch
                viewKind={viewKind}
                viewKindElement={selected.viewKindElement || viewKindElement.elements[0]}
                viewDescr={viewDescr}
                enabled={enabled}
              />
            </div>
          ) : null}
        </SplitPane>
        <SaveReqDialog
          visible={visible}
          onOk={() => {
            setVisible(false);
            onSelect(cacheSelect);
            setSelected(cacheSelect);
          }}
          //schemaUri={viewKindElement.resultsScope}
          onCancel={() => setVisible(false)}
        />
      </React.Fragment>
    );
  },
  (prevProps: any, nextProps: any) => isEqual(prevProps, nextProps),
);
