/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import dayjs from 'dayjs';
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import * as remotedev from 'remotedev';
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
  render: (args: any) => {
    const antdRenderers: RendererRegistryEntry[] = [...antdControlRenderers, ...antdLayoutRenderers, ...tableRenderers];
    const client = new SparqlClientImpl(
      'http://localhost:8181/rdf4j-server',
      'http://localhost:8181/rdf4j-server/repositories/mktp-schema/namespaces',
    );
    const rootStore = createUiModelFromState('mktp-fed', client, rootModelInitialState, additionalColls);
    const store: any = asReduxStore(rootStore);
    connectReduxDevtools(remotedev, rootStore);
    console.log('OK');
    return (
      <div style={{ height: 'calc(100vh - 32px)' }}>
        <Provider store={store}>
          <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
            <Form viewDescrId={viewDescrs[0]['@id']} viewDescrCollId={viewDescrCollConstr['@id']} />
          </MstContextProvider>
        </Provider>
      </div>
    );
  },
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta<typeof Form>;

type Story = StoryObj<any>; // StoryObj<typeof Form>;

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
              value: formatMessage('100%, vertical', '20%', '80%'),
              style: { ...baseStyle, height: '20%', width: '80%', marginBottom: '10px' },
            },
          },
          {
            '@id': 'mktp:_1_2',
            '@type': 'aldkg:PanelLayout',
            options: {
              flow: 'horizontal',
              style: {
                width: '100%',
                height: '300px',
                padding: '10px',
                overflow: 'scroll',
              },
            },
            elements: [
              {
                '@id': 'mktp:_1_2_1',
                '@type': 'aldkg:TextPanel',
                options: {
                  value: formatMessage('80px, horizontal', '50%', '25%'),
                  style: { ...baseStyle, height: '50%', width: '25%', margin: '10px' },
                },
              },
              {
                '@id': 'mktp:_1_2_2',
                '@type': 'aldkg:TextPanel',
                options: {
                  height: '80%',
                  width: '45%',
                  value: formatMessage('80px, horizontal', '80%', '45%'),
                  style: { ...baseStyle, height: '80%', width: '45%', margin: '10px' },
                },
              },
              {
                '@id': 'mktp:_1_2_3',
                '@type': 'aldkg:TextPanel',
                options: {
                  height: '80%',
                  width: '45%',
                  value: formatMessage('80px, horizontal', '80%', '45%'),
                  style: { ...baseStyle, height: '80%', width: '45%', margin: '10px' },
                },
              },
              {
                '@id': 'mktp:_1_2_4',
                '@type': 'aldkg:TextPanel',
                options: {
                  height: '80%',
                  width: '45%',
                  value: formatMessage('80px, horizontal', '80%', '45%'),
                  style: { ...baseStyle, height: '80%', width: '45%', margin: '10px' },
                },
              },
            ],
          },
          {
            '@id': 'mktp:_1_3',
            '@type': 'aldkg:PanelLayout',
            options: {
              width: '100%',
              flow: 'wrap',
              style: { overflow: 'scroll' },
            },
            elements: [
              {
                '@id': 'mktp:_2_2_1',
                '@type': 'aldkg:TextPanel',
                options: {
                  value: formatMessage('-, wrap', '200px', '25%'),
                  style: { ...baseStyle, height: '200px', width: '25%', margin: '10px' },
                },
              },
              {
                '@id': 'mktp:_2_2_2',
                '@type': 'aldkg:TextPanel',
                options: {
                  height: '80%',
                  width: '45%',
                  value: formatMessage('-, wrap', '10em', '45%'),
                  style: { ...baseStyle, height: '10em', width: '45%', margin: '10px' },
                },
              },
              {
                '@id': 'mktp:_2_2_3',
                '@type': 'aldkg:TextPanel',
                options: {
                  height: '80%',
                  width: '45%',
                  value: formatMessage('-, wrap', '10em', '45%'),
                  style: { ...baseStyle, height: '10em', width: '45%', margin: '10px' },
                },
              },
              {
                '@id': 'mktp:_2_2_4',
                '@type': 'aldkg:TextPanel',
                options: {
                  height: '80%',
                  width: '45%',
                  value: formatMessage('-, wrap', '10em', '45%'),
                  style: { ...baseStyle, height: '10em', width: '45%', margin: '10px' },
                },
              },
            ],
          },
          {
            '@id': 'mktp:_2_2_4',
            '@type': 'aldkg:TextPanel',
            options: {
              value: formatMessage('100%', '70%', '100%'),
              style: { ...baseStyle, height: '70%', width: '100%', margin: '10px' },
            },
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
      lastSynced: dayjs().valueOf(),
      //resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },
  // ViewDescrs Collection
  {
    constr: viewDescrCollConstr,
    data: viewDescrs,
    opt: {
      updPeriod: undefined,
      lastSynced: dayjs().valueOf(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];

export const PanelLayout: Story = {};
