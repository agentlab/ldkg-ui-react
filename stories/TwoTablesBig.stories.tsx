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
  antdDataControlRenderers,
  antdLayoutRenderers,
  createUiModelFromState,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
  tableRenderers,
  viewDescrCollConstr,
  viewKindCollConstr,
} from '../src';

export default {
  title: 'Several Controls/TwoTablesBig',
  component: Form,
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta;

const Template: Story<any> = (args) => {
  const client = new SparqlClientImpl(
    'https://rdf4j.agentlab.ru/rdf4j-server',
    'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp-schema/namespaces',
  );
  const rootStore = createUiModelFromState('mktp-fed', client, rootModelInitialState, args.additionalColls);
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <div style={{ height: 'calc(100vh - 32px)' }}>
      <Provider store={store}>
        <MstContextProvider store={rootStore} renderers={args.renderers} cells={args.cells}>
          <Form viewDescrId={args.viewDescrId} viewDescrCollId={args.viewDescrCollId} />
        </MstContextProvider>
      </Provider>
    </div>
  );
};

const antdRenderers: RendererRegistryEntry[] = [
  ...antdControlRenderers,
  ...antdLayoutRenderers,
  ...antdDataControlRenderers,
  ...tableRenderers,
];

const mktpSchemaRepoIri = 'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp-schema';
const mktpOntopRepoIri = 'http://192.168.1.33:8090/sparql';

const viewKinds = [
  {
    '@id': 'mktp:TwoTablesViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'TwoTables',
    description: 'Big table View with TwoTables',
    collsConstrs: [
      /// Marketplaces
      {
        '@id': 'mktp:Marketplaces_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Marketplaces_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:MarketplaceShape',
            service: mktpSchemaRepoIri,
          },
        ],
        orderBy: [{ expression: variable('rank0'), descending: false }],
      },
      /// Marketplace categories & cards
      {
        '@id': 'mktp:Categories_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Categories_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'als:CategoryShape',
            service: mktpSchemaRepoIri,
          },
        ],
      },
      {
        '@id': 'mktp:ProductCards_in_Category_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ProductCards_in_Category_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'als:ProductCardShape',
            conditions: {
              '@id': 'mktp:ProductCards_in_Category_Coll_Ent_con',
              CardInCatLink: 'https://muying.1688.com/wanju',
            },
            service: mktpSchemaRepoIri,
          },
        ],
        limit: 30,
      },
      //// Mktp Products
      {
        '@id': 'mktp:Products_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Products_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:ProductShape',
            service: mktpSchemaRepoIri,
          },
        ],
      },
      {
        '@id': 'mktp:ProductCards_in_Product_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ProductCards_in_Product_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'als:ProductCardShape',
            conditions: {
              '@id': 'mktp:ProductCards_in_Product_Coll_Ent_Cond',
              CardInProdLink: null, //'mktp_d:Massager',
            },
            service: mktpSchemaRepoIri,
          },
        ],
      },
    ],
    elements: [
      {
        '@id': 'mktp:_934jHd67',
        '@type': 'aldkg:VerticalLayout',
        options: {
          style: {
            height: '100%',
          },
        },
        elements: [
          {
            '@id': 'mktp:_df7eds',
            '@type': 'aldkg:TabControl',
            // by this resultsScope TabControl could have read access to the results, selected by Query with @id='rm:ProjectViewClass_ArtifactFormats_Query'
            resultsScope: 'mktp:Marketplaces_Coll', // bind to results data by query @id
            options: {
              title: 'Маркетплейсы',
              style: {
                margin: '0 0 0 24px',
              },
              contentSize: true,
              // by this connection TabControl could have read/write access to the property 'artifactFormat' in condition object with @id='rm:ProjectViewClass_Artifacts_Query_Shape0_Condition'
              connections: [
                { toObj: 'mktp:Categories_Coll_Ent', toProp: 'schema', fromProp: 'categoryShape' },
                {
                  toObj: 'mktp:ProductCards_in_Category_Coll_Ent',
                  toProp: 'schema',
                  fromProp: 'productCardShape',
                },
                // Product cards
                {
                  toObj: 'mktp:ProductCards_in_Product_Coll_Ent',
                  toProp: 'schema',
                  fromProp: 'productCardShape',
                },
              ],
            },
          },
          {
            '@id': 'mktp:_97hFH67',
            '@type': 'aldkg:SplitPaneLayout',
            options: {
              grow: '1',
              style: {
                width: '100%',
                height: '100%',
              },
              initialSizes: [17, 43, 26, 17],
            },
            // child ui elements configs
            elements: [
              {
                '@id': 'mktp:_23sLhd67',
                '@type': 'aldkg:DataControl',
                resultsScope: 'mktp:Categories_Coll',
                options: {
                  renderType: 'tree',
                  title: 'Категории маркетплейса',
                  treeNodeTitleKey: 'name',
                  treeNodeParentKey: 'SubcatInCatLink',
                  connections: [{ toObj: 'mktp:ProductCards_in_Category_Coll_Ent_con', toProp: 'CardInCatLink' }],
                },
              },
              {
                '@id': 'mktp:CategoryCardsTable',
                '@type': 'aldkg:Array',
                resultsScope: 'mktp:ProductCards_in_Category_Coll',
                options: {
                  target: {
                    name: 'правую таблицу',
                    iri: 'mktp:ProductCards_in_Product_Coll',
                  },
                  draggable: true,
                  resizeableHeader: true,
                  style: { height: '100%' },
                  order: [
                    'imageUrl',
                    'name',
                    'price',
                    'saleValue',
                    'categoryPopularity',
                    'commentsCount',
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
                    'prevParsedAt',
                  ],
                  imageUrl: {
                    width: 60,
                    formatter: 'image',
                    editable: false,
                  },
                  identifier: {
                    formatter: 'link',
                    //dataToFormatter: { link: 'identifier' },
                    sortable: true,
                    editable: false,
                  },
                  name: {
                    width: 340,
                    formatter: 'link',
                    dataToFormatter: { link: '@id' },
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
                  price: {
                    width: 60,
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
                  commentsCount: {
                    width: 100,
                    sortable: true,
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
                  },
                },
              },
              {
                '@id': 'mktp:ProductCardsTable',
                '@type': 'aldkg:Array',
                resultsScope: 'mktp:ProductCards_in_Product_Coll',
                options: {
                  draggable: true,
                  resizeableHeader: true,
                  style: { height: '100%' },
                  order: [
                    'imageUrl',
                    'name',
                    'price',
                    'saleValue',
                    'categoryPopularity',
                    'commentsCount',
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
                    'prevParsedAt',
                  ],
                  imageUrl: {
                    width: 60,
                    formatter: 'image',
                    editable: false,
                  },
                  identifier: {
                    formatter: 'link',
                    //dataToFormatter: { link: 'identifier' },
                    sortable: true,
                    editable: false,
                  },
                  name: {
                    width: 340,
                    formatter: 'link',
                    dataToFormatter: { link: '@id' },
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
                  price: {
                    width: 60,
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
                  commentsCount: {
                    width: 100,
                    sortable: true,
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
                  },
                },
              },
              {
                '@id': 'mktp:ProductTree',
                '@type': 'aldkg:DataControl',
                resultsScope: 'mktp:Products_Coll',
                options: {
                  renderType: 'tree',
                  title: 'Продукты',
                  treeNodeTitleKey: 'title',
                  treeNodeParentKey: 'SubProdInProdLink',
                  connections: [{ toObj: 'mktp:ProductCards_in_Product_Coll_Ent_Cond', toProp: 'CardInProdLink' }],
                },
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
    '@id': 'mktp:TwoTablesViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'mktp:TwoTablesViewKind',
    title: 'TwoTables',
    description: 'TwoTables',
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
RemoteData.args = {
  viewDescrId: viewDescrs[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
  additionalColls: additionalColls,
  renderers: antdRenderers,
  cells: antdCells,
};
