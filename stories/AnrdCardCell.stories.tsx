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
import { Story, Meta } from '@storybook/react/types-6-0';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import { SparqlClientImpl, rootModelInitialState, createModelFromState, CollState } from '@agentlab/sparql-jsld-client';

import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
  antdDataControlRenderers,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
} from '../src';

const antdRenderers: RendererRegistryEntry[] = [
  ...antdControlRenderers,
  ...antdLayoutRenderers,
  ...antdDataControlRenderers,
];

const cardData = [
  {
    '@id': '1',
    title: 'test1',
    image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    '@id': '2',
    title: 'test2',
    image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];
const viewDescrs = [
  {
    '@id': 'mktp:CardCellViewDescr',
    '@type': 'rm:View',
    title: 'CardCellGrid',
    description: 'CardCellGrid',
    viewKind: 'rm:CardCellGridViewKind',
    collsConstrs: [
      {
        '@id': 'rm:Cards_Coll',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:Cards_Coll_Shape0',
            '@type': 'rm:EntConstr',
            schema: 'hs:ProductCardShape',
          },
        ],
      },
    ],
    type: 'VerticalLayout',
    options: {
      //width: 'all-empty-space',
    },
    // child ui elements configs
    elements: [
      {
        type: 'DataControl',
        resultsScope: 'rm:Cards_Coll',
        options: {
          renderType: 'grid',
          elementTemplate: [
            {
              type: 'CardLayout',
              elements: [
                {
                  type: 'ImageCell',
                  scope: 'image',
                },
                {
                  type: 'Control',
                  scope: 'title',
                },
              ],
            },
          ],
        },
      },
    ],
  },
];

const viewDescrCollConstr = {
  '@id': 'rm:Views_Coll',
  entConstrs: [
    {
      '@id': 'rm:Views_EntConstr0',
      schema: 'rm:ViewShape',
    },
  ],
};

const additionalColls: CollState[] = [
  // ViewKinds Collection
  /*{
      constr: viewKindCollConstr,
      data: viewKinds,
      opt: {
        updPeriod: undefined,
        lastSynced: moment.now(),
        resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
      },
    },*/
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
  {
    constr: viewDescrs[0].collsConstrs[0],
    data: cardData,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];

const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
const rootStore = createModelFromState('reqs2', client, rootModelInitialState, additionalColls);
console.log('rootStore', rootStore);
const store: any = asReduxStore(rootStore);
// eslint-disable-next-line @typescript-eslint/no-var-requires
connectReduxDevtools(require('remotedev'), rootStore);

export default {
  title: 'Several Controls/TreeAndForm Cards',
  component: Form,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

export const Empty: Story<{}> = () => (
  <Provider store={store}>
    <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
      <div style={{ height: '1000px', width: '100%' }}>
        <Form viewIri={viewDescrs[0]['@id']} viewsResultsScope={viewDescrCollConstr['@id']} />
      </div>
    </MstContextProvider>
  </Provider>
);
