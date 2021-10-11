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
import { Story, Meta } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import { CollState, rootModelInitialState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';

import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
  antdDataControlRenderers,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
} from '../src';
import { viewKindCollConstr, viewDescrCollConstr } from '../src/models/ViewCollConstrs';
import { createUiModelFromState } from '../src/models/MstViewDescr';

export default {
  title: 'Form/Form with Columns',
  component: Form,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

export const Empty: Story<{}> = () => {
  const antdRenderers: RendererRegistryEntry[] = [
    ...antdControlRenderers,
    ...antdLayoutRenderers,
    ...antdDataControlRenderers,
  ];

  const client = new SparqlClientImpl(
    'https://rdf4j.agentlab.ru/rdf4j-server',
    'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp/namespaces',
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
    '@id': 'mktp:FormWithColumnsViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'FormWithColumns',
    description: 'FormWithColumns',
    collsConstrs: [
      {
        '@id': 'rm:Cards_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:Cards_Coll_Ent0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:ProductCardShape',
            service: mktpSchemaRepoIri,
          },
        ],
        //orderBy: [{ expression: variable('identifier0'), descending: false }],
      },
    ],
    // child ui elements configs
    elements: [
      {
        '@id': 'mktp:_87Dfg78',
        '@type': 'aldkg:HorizontalLayout',
        options: {
          justify: 'start', // start end center space-between space-around
          //contentSize: true,
          style: {
            //flexGrow: '5',
            width: '100%',
          },
          width: 'all-empty-space',
        },
        elements: [
          {
            '@id': 'mktp:_8255hFd3',
            '@type': 'aldkg:VerticalLayout',
            options: {
              style: {
                width: '20%',
              },
              width: 'all-empty-space',
            },
            elements: [
              {
                '@id': 'mktp:_63JdF67',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/imageUrl',
              },
            ],
          },
          {
            '@id': 'mktp:_93JhdA78',
            '@type': 'aldkg:VerticalLayout',
            options: {
              style: {
                width: '20%',
              },
              width: 'all-empty-space',
            },
            elements: [
              /*{
                    '@id': 'mktp:_92KdFj6',
                    '@type': 'aldkg:Control',
                    resultsScope: 'rm:Cards_Coll/identifier',
                  },*/
              {
                '@id': 'mktp:_63JdF67',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/name',
              },
              {
                '@id': 'mktp:_Kjd7F7s8',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/country',
              },
              {
                '@id': 'mktp:_Kf893Jd6',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/brand',
              },
              {
                '@id': 'mktp:_K84jd^',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/price',
              },
              {
                '@id': 'mktp:_dF7jdF6',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/saleValue',
              },
              {
                '@id': 'mktp:_93Kdf7j',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/seller',
              },
            ],
          },
          {
            '@id': 'mktp:_87Kdf3Ry7',
            '@type': 'aldkg:VerticalLayout',
            options: {
              style: {
                width: '20%',
              },
              width: 'all-empty-space',
            },
            elements: [
              {
                '@id': 'mktp:_93Kd8hH',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/categoryPopularity',
              },
              {
                '@id': 'mktp:_j7JG8d',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/commentsCount',
              },
              {
                '@id': 'mktp:_fg78Dfj6',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/starsValue',
              },
              {
                '@id': 'mktp:_924KFhf7',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/questionsCount',
              },
            ],
          },
          {
            '@id': 'mktp:_86hDyf9',
            '@type': 'aldkg:VerticalLayout',
            options: {
              style: {
                width: '20%',
              },
              width: 'all-empty-space',
            },
            elements: [
              {
                '@id': 'mktp:_Kd83457',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/lastMonthSalesAmount',
              },
              {
                '@id': 'mktp:_8385jKd',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/lastMonthSalesValue',
              },
              {
                '@id': 'mktp:_8357KhfEm',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/perMonthSalesAmount',
              },
              {
                '@id': 'mktp:_956jsnH',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/perMonthSalesValue',
              },
              {
                '@id': 'mktp:_834LdjR',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/prevMonthSalesAmount',
              },
              {
                '@id': 'mktp:_935jFhj',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/prevMonthSalesValue',
              },
            ],
          },
          {
            '@id': 'mktp:_9348jDf7',
            '@type': 'aldkg:VerticalLayout',
            options: {
              style: {
                width: '20%',
              },
              width: 'all-empty-space',
            },
            elements: [
              {
                '@id': 'mktp:_912JdmF',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/salesAmountDiff',
              },
              {
                '@id': 'mktp:_935KfH',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/totalSales',
              },
              {
                '@id': 'mktp:_482fDg8',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/totalSalesDiff',
              },
              {
                '@id': 'mktp:_94Fdf72',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/stocks',
              },
              {
                '@id': 'mktp:_68hDf2',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/stocksDiffOrders',
              },
              {
                '@id': 'mktp:_683Jfg72',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Cards_Coll/stocksDiffReturns',
              },
              /*{
                  '@type': 'aldkg:Control',
                  resultsScope: 'rm:Cards_Coll/rootId',
                },
                {
                  '@type': 'aldkg:Control',
                  resultsScope: 'rm:Cards_Coll/photosCount',
                },
                {
                  '@type': 'aldkg:Control',
                  resultsScope: 'rm:Cards_Coll/firstParsedAt',
                },
                {
                  '@type': 'aldkg:Control',
                  resultsScope: 'rm:Cards_Coll/lastMonthParsedAt',
                },
                {
                  '@type': 'aldkg:Control',
                  resultsScope: 'rm:Cards_Coll/parsedAt',
                },
                {
                  '@type': 'aldkg:Control',
                  resultsScope: 'rm:Cards_Coll/prevParsedAt',
                },*/
            ],
          },
        ],
      },
    ],
  },
];

const viewDescrs = [
  {
    '@id': 'mktp:FormWithColumnsViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'mktp:FormWithColumnsViewKind',
    title: 'FormWithColumns',
    description: 'FormWithColumns',
    collsConstrs: [],
    options: {},
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
