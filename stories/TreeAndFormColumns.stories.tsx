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
import {
  SparqlClientImpl,
  rootModelInitialState,
  createModelFromState,
  CollState,
  mstSchemas,
} from '@agentlab/sparql-jsld-client';

import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
  antdDataControlRenderers,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
} from '../src';
import { viewKindCollConstr, viewDescrCollConstr } from '../src/stores/ViewCollConstrs';
import { ViewDescr } from '../src/stores/ViewDescr';

const antdRenderers: RendererRegistryEntry[] = [
  ...antdControlRenderers,
  ...antdLayoutRenderers,
  ...antdDataControlRenderers,
];

const viewDescrs = [
  {
    '@id': 'mktp:TreeAndFormViewDescr',
    '@type': 'aldkg:ViewDescr',
    title: 'TreeAndForm',
    description: 'TreeAndForm',
    viewKind: 'rm:TreeAndFormViewKind',
    collsConstrs: [
      {
        '@id': 'rm:Cards_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:Cards_Coll_Ent0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:ProductCardShape',
          },
        ],
        //orderBy: [{ expression: variable('identifier0'), descending: false }],
      },
    ],
    type: 'SplitPaneLayout',
    options: {
      defaultSize: {
        'rm:Folders_Coll': '17%',
        ArtifactForm: '83%',
      },
      height: 'all-empty-space',
      //width: 'all-empty-space',
    },
    // child ui elements configs
    elements: [
      {
        '@id': 'ArtifactForm',
        type: 'HorizontalLayout',
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
            type: 'VerticalLayout',
            options: {
              style: {
                width: '50%',
              },
              width: 'all-empty-space',
            },
            elements: [
              /*{
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/identifier',
              },*/
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/name',
              },
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/country',
              },
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/brand',
              },
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/price',
              },
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/saleValue',
              },
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/seller',
              },
            ],
          },
          {
            type: 'VerticalLayout',
            options: {
              style: {
                width: '50%',
              },
              width: 'all-empty-space',
            },
            elements: [
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/categoryPopularity',
              },
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/commentsCount',
              },
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/starsValue',
              },
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/questionsCount',
              },

              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/lastMonthSalesAmount',
              },
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/lastMonthSalesValue',
              },
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/perMonthSalesAmount',
              },
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/perMonthSalesValue',
              },
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/prevMonthSalesAmount',
              },
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/prevMonthSalesValue',
              },

              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/salesAmountDiff',
              },
              {
                type: 'Control',
                resultsScope: 'rm:Cards_Coll/totalSales',
              },
              /*{
            type: 'Control',
            resultsScope: 'rm:Cards_Coll/totalSalesDiff',
          },
          {
            type: 'Control',
            resultsScope: 'rm:Cards_Coll/stocks',
          },
          {
            type: 'Control',
            resultsScope: 'rm:Cards_Coll/stocksDiffOrders',
          },
          {
            type: 'Control',
            resultsScope: 'rm:Cards_Coll/stocksDiffReturns',
          },
          {
            type: 'Control',
            resultsScope: 'rm:Cards_Coll/rootId',
          },

          {
            type: 'Control',
            resultsScope: 'rm:Cards_Coll/photosCount',
          },
          {
            type: 'Control',
            resultsScope: 'rm:Cards_Coll/firstParsedAt',
          },
          {
            type: 'Control',
            resultsScope: 'rm:Cards_Coll/lastMonthParsedAt',
          },
          {
            type: 'Control',
            resultsScope: 'rm:Cards_Coll/parsedAt',
          },
          {
            type: 'Control',
            resultsScope: 'rm:Cards_Coll/prevParsedAt',
          },*/
            ],
          },
        ],
      },
    ],
  },
];

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
];

mstSchemas['aldkg:ViewDescr'] = ViewDescr;

const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
const rootStore = createModelFromState('mktp', client, rootModelInitialState, additionalColls);
const store: any = asReduxStore(rootStore);
// eslint-disable-next-line @typescript-eslint/no-var-requires
connectReduxDevtools(require('remotedev'), rootStore);

export default {
  title: 'Several Controls/Tree And Form with Columns',
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
