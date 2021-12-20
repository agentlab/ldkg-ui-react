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
  title: 'Table/Remote Mktp',
  component: Form,
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta;

const Template: Story = (args: any) => {
  const antdRenderers: RendererRegistryEntry[] = [...antdControlRenderers, ...antdLayoutRenderers, ...tableRenderers];

  const client = new SparqlClientImpl(
    'https://rdf4j.agentlab.ru/rdf4j-server',
    'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp-schema/namespaces',
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

const mktpSchemaRepoIri = 'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp-schema';
const mktpOntopRepoIri = 'http://192.168.1.33:8090/sparql';

const viewKinds = [
  {
    '@id': 'mktp:TableViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'Карточки',
    description: 'Big table View with form',
    collsConstrs: [
      {
        '@id': 'mktp:ProductCard_Coll',
        '@type': 'aldkg:CollConst',
        entConstrs: [
          {
            '@id': 'mktp:ProductCard_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'als:ProductCardShape',
            conditions: {
              '@id': 'mktp:ProductCards_in_Category_Coll_Ent_Cond',
              amountValueMoving30: {
                relation: 'between-incl-both',
                value: [20000, 60000],
              },
            },
            variables: {
              '@id': 'mktp:ProductCards_in_Category_Coll_Ent_Var',
              imageUrl: null,
              name: null,
              amountValueMoving30: null,
              commentsCount: null,
            },
            service: mktpSchemaRepoIri,
          },
        ],
        //orderBy: [{ expression: variable('identifier0'), descending: false }],
        limit: 100,
      },
    ],
    elements: [
      {
        '@id': 'mktp:_934jHd67',
        '@type': 'aldkg:PanelLayout',
        options: {
          style: { height: '100%' },
        },
        elements: [
          {
            '@id': 'ProductCardTable',
            '@type': 'aldkg:Array',
            resultsScope: 'mktp:ProductCard_Coll',
            options: {
              draggable: true,
              resizeableHeader: true,
              style: { height: '100%' },
              multiSelect: true,
              order: [
                'imageUrl',
                'name',
                'amountValueMoving30',
                'commentsCount',
                'price',
                /*'saleValue',
                'categoryPopularity',
                'starsValue',
                'questionsCount',
                'lastMonthSalesAmount',
                'lastMonthSalesValue',
                'perMonthSalesAmount',
                'perMonthSalesValue',
                'prevMonthSalesAmount',
                'prevMonthSalesValue',
                'salesAmountDiff',
                'totalSales',
                'totalSalesDiff',
                'stocks',
                'stocksDiffOrders',
                'stocksDiffReturns',
                'country',
                'brand',
                'seller',
                'identifier',
                'rootId',
                'photosCount',
                'firstParsedAt',
                'lastMonthParsedAt',
                'parsedAt',
                'prevParsedAt',*/
              ],
              imageUrl: {
                width: 100,
                formatter: 'image',
                editable: false,
              },
              name: {
                width: 340,
                formatter: 'link',
                dataToFormatter: { link: '@id' },
                sortable: true,
                editable: false,
              },
              price: {
                width: 60,
                sortable: true,
                editable: false,
              },
              amountValueMoving30: {
                width: 100,
                sortable: true,
                editable: false,
              },
              commentsCount: {
                width: 100,
                sortable: true,
                editable: false,
              },
              /*identifier: {
                formatter: 'link',
                //dataToFormatter: { link: 'identifier' },
                sortable: true,
                editable: false,
              },
              country: {
                width: 60,
                sortable: true,
                editable: false,
              },
              brand: {
                formatter: 'link',
                sortable: true,
                editable: false,
              },
              saleValue: {
                width: 60,
                sortable: true,
                editable: false,
              },
              seller: {
                formatter: 'link',
                sortable: true,
                editable: false,
              },
              categoryPopularity: {
                width: 100,
                editable: false,
              },
              starsValue: {
                width: 100,
                sortable: true,
                editable: false,
              },
              questionsCount: {
                width: 100,
                sortable: true,
                editable: false,
              },
              lastMonthSalesAmount: {
                width: 150,
                sortable: true,
                editable: false,
              },
              lastMonthSalesValue: {
                width: 150,
                sortable: true,
                editable: false,
              },
              perMonthSalesAmount: {
                width: 150,
                sortable: true,
                editable: false,
              },
              perMonthSalesValue: {
                width: 150,
                sortable: true,
                editable: false,
              },
              prevMonthSalesAmount: {
                width: 150,
                sortable: true,
                editable: false,
              },
              prevMonthSalesValue: {
                width: 150,
                sortable: true,
                editable: false,
              },
              salesAmountDiff: {
                width: 150,
                sortable: true,
                editable: false,
              },
              totalSales: {
                width: 100,
                sortable: true,
                editable: false,
              },
              totalSalesDiff: {
                width: 150,
                sortable: true,
                editable: false,
              },
              stocks: {
                width: 100,
                sortable: true,
                editable: false,
              },
              stocksDiffOrders: {
                width: 100,
                sortable: true,
                editable: false,
              },
              stocksDiffReturns: {
                width: 100,
                sortable: true,
                editable: false,
              },
              rootId: {
                editable: false,
              },
              photosCount: {
                editable: false,
              },
              firstParsedAt: {
                editable: false,
              },
              lastMonthParsedAt: {
                editable: false,
              },
              parsedAt: {
                editable: false,
              },
              prevParsedAt: {
                editable: false,
              },*/
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

export const RemoteData = Template.bind({});
RemoteData.args = {};
