/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import moment from 'moment';
import { variable } from '@rdfjs/data-model';
import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import { rootModelInitialState, CollState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';
import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
  createUiModelFromState,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
  viewKindCollConstr,
  viewDescrCollConstr,
} from '../src';

import { tableRenderers } from '../src';

export default {
  title: 'Layout',
  component: Form,
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta;

const baseStyle = {
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5em',
  boxSizing: 'border-box',
  borderRadius: '6px',
  boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
};

const formatMessage = (rowHeight: string | number, blockHeight: string | number, blockWidth: string | number) =>
  `RowHeight: ${rowHeight}
 BoxHeight:${blockHeight}
 BoxWidth:${blockWidth}`;

const Template: Story = (args: any) => {
  const antdRenderers: RendererRegistryEntry[] = [...antdControlRenderers, ...antdLayoutRenderers, ...tableRenderers];

  const client = new SparqlClientImpl(
    'http://localhost:8181/rdf4j-server',
    'http://localhost:8181/rdf4j-server/repositories/mktp-schema/namespaces',
  );

  const rootStore = createUiModelFromState('mktp-fed', client, rootModelInitialState, additionalColls);
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <div style={{ height: 'calc(100vh - 32px)' }}>
      <Provider store={store}>
        <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
          <Form viewDescrId={viewDescrs[0]['@id']} viewDescrCollId={viewDescrCollConstr['@id']} />
        </MstContextProvider>
      </Provider>
    </div>
  );
};

const viewKinds = [
  {
    '@id': 'mktp:TableViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'Карточки',
    description: 'Big table View with form',
    collsConstrs: [],
    elements: [
      {
        '@id': 'mktp:_1',
        '@type': 'aldkg:PanelLayout',
        options: {
          style: { height: '100%', width: '100%' },
        },
        elements: [
          {
            '@id': 'mktp:_1_1',
            '@type': 'aldkg:TextPanel',
            options: {
              value: 'VerticalLayout, align: space-between',
              style: { ...baseStyle, height: '100px', width: '100%', marginBottom: '10px' },
            },
          },
          {
            '@id': 'mktp:_1_2',
            '@type': 'aldkg:PanelLayout',
            options: {
              style: {
                width: '100%',
                height: '700px',
                padding: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            },
            elements: [
              {
                '@id': 'mktp:_1_2_1',
                '@type': 'aldkg:VerticalLayout',
                options: {
                  style: {
                    width: '100%',
                    height: '100%',
                    padding: '10px',
                    justifyContent: 'space-between',
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:_1_2_1',
                    '@type': 'aldkg:TextPanel',
                    options: {
                      height: '25%',
                      width: '100%',
                      value: formatMessage('25%', '90%', '100%'),
                      style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
                    },
                  },
                  {
                    '@id': 'mktp:_1_2_1',
                    '@type': 'aldkg:TextPanel',
                    options: {
                      height: '25%',
                      width: '100%',
                      value: formatMessage('25%', '90%', '100%'),
                      style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
                    },
                  },
                  {
                    '@id': 'mktp:_1_2_1',
                    '@type': 'aldkg:TextPanel',
                    options: {
                      height: '25%',
                      width: '100%',
                      value: formatMessage('25%', '90%', '100%'),
                      style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
                    },
                  },
                ],
              },
            ],
          },
          {
            '@id': 'mktp:_1_1',
            '@type': 'aldkg:TextPanel',
            options: {
              value: 'VerticalLayout, align: 3 rows',
              style: { ...baseStyle, height: '100px', width: '100%', marginBottom: '10px' },
            },
          },
          {
            '@id': 'mktp:_1_2',
            '@type': 'aldkg:PanelLayout',
            options: {
              style: {
                width: '100%',
                height: '700px',
                padding: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            },
            elements: [
              {
                '@id': 'mktp:_1_2_1',
                '@type': 'aldkg:VerticalLayout',
                options: {
                  style: {
                    width: '100%',
                    height: '100%',
                    padding: '10px',
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:_1_2_1',
                    '@type': 'aldkg:TextPanel',
                    options: {
                      width: '100%',
                      grow: '1',
                      value: formatMessage('grow 1', '90%', '100%'),
                      style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
                    },
                  },
                  {
                    '@id': 'mktp:_1_2_1',
                    '@type': 'aldkg:TextPanel',
                    options: {
                      width: '100%',
                      grow: '1',
                      value: formatMessage('grow 1', '90%', '100%'),
                      style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
                    },
                  },
                  {
                    '@id': 'mktp:_1_2_1',
                    '@type': 'aldkg:TextPanel',
                    options: {
                      width: '100%',
                      grow: '1',
                      value: formatMessage('grow 1', '90%', '100%'),
                      style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const viewDescrs = [
  {
    '@id': 'rm:TableViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'mktp:TableViewKind',
    title: 'CardCellGrid',
    description: 'CardCellGrid',
    collsConstrs: [],
    // child ui elements configs
    elements: [],
  },
];

const additionalColls: CollState[] = [
  // ViewKinds Collection
  {
    constr: viewKindCollConstr,
    data: viewKinds,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      //resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },
  // ViewDescrs Collection
  {
    constr: viewDescrCollConstr,
    data: viewDescrs,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];

export const GridFlexLayout = Template.bind({});
GridFlexLayout.args = {};
