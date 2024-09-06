/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { cloneDeep } from 'lodash-es';
import dayjs from 'dayjs';
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import * as remotedev from 'remotedev';
import { factory, CollState, JsStrObj, Results, sendGet, SparqlClientImpl } from '@agentlab/sparql-jsld-client';

import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
  antdDataControlRenderers,
  createUiModelFromState,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
  tableRenderers,
  viewKindCollConstr,
  viewDescrCollConstr,
} from '../src';

import { noCollsFormModelState } from './TestData';

export default {
  title: 'Several Controls/Tree-Table-Form',
  component: Form,
  render: (args: any) => {
    const antdRenderers: RendererRegistryEntry[] = [
      ...antdControlRenderers,
      ...antdLayoutRenderers,
      ...antdDataControlRenderers,
      ...tableRenderers,
    ];
    //const client = new SparqlClientImpl('http://localhost:8181/rdf4j-server');
    //const rootStore = createUiModelFromState('mktp', client, noCollsFormModelState, additionalColls);
    const client = new SparqlClientImpl(
      'http://localhost:8181/rdf4j-server',
      'http://localhost:8181/rdf4j-server/repositories/mktp-schema/namespaces',
    );
    const rootStore = createUiModelFromState('mktp-fed', client, noCollsFormModelState, args.additionalColls);
    const store: any = asReduxStore(rootStore);
    connectReduxDevtools(remotedev, rootStore);
    return (
      <div style={{ height: 'calc(100vh - 32px)' }}>
        <Provider store={store}>
          <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
            <Form viewDescrId={args.viewDescrId} viewDescrCollId={args.viewDescrCollId} />
          </MstContextProvider>
        </Provider>
      </div>
    );
  },
} as Meta<typeof Form>;

type Story = StoryObj<any>; // StoryObj<typeof Form>;

const mktpSchemaRepoIri = 'http://localhost:8181/rdf4j-server/repositories/mktp-schema';
const mktpOntopRepoIri = 'http://192.168.1.33:8090/sparql';

const viewKinds = [
  {
    '@id': 'mktp:TreeTableFormMktpCategoriesViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'Tree-Table-Form Mktp Categories',
    description: 'Tree-Table-Form Mktp Categories',
    collsConstrs: [
      {
        '@id': 'mktp:HSCategories_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:HSCategories_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:CategoryShape',
            service: mktpSchemaRepoIri,
          },
        ],
      },
      {
        '@id': 'mktp:KPCategories_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:KPCategories_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'kp:CategoryShape',
            service: mktpSchemaRepoIri,
          },
        ],
      },
      {
        '@id': 'mktp:TBCategories_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:TBCategories_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'tb:CategoryShape',
            service: mktpSchemaRepoIri,
          },
        ],
      },
      {
        '@id': 'mktp:ProductCards_in_Category_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ProductCards_in_Category_Coll_Ent0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:ProductCardShape',
            conditions: {
              '@id': 'mktp:ProductCards_in_Category_Coll_Ent0_con',
              CardInCatLink: null, //'https://www.wildberries.ru/catalog/igrushki/antistress',
            },
            service: mktpSchemaRepoIri,
          },
        ],
        limit: 10,
      },
      {
        '@id': 'mktp:Cards_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Cards_Coll_Ent0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:ProductCardShape',
            conditions: {
              '@id': 'mktp:Cards_Coll_Ent0_con',
              '@_id': null,
            },
            service: mktpSchemaRepoIri,
          },
        ],
        //orderBy: [{ expression: factory.variable('identifier0'), descending: false }],
      },
    ],
    // child ui elements configs
    elements: [
      {
        '@id': 'mktp:_934Jfg7',
        '@type': 'aldkg:SplitPaneLayout',
        options: {
          style: {
            width: '100%',
            height: '100%',
          },
          collapseDirection: 'left',
          initialSizes: [17, 43, 43],
        },
        elements: [
          {
            '@id': 'mktp:MarketplacesTabs',
            '@type': 'aldkg:TabsLayout',
            elements: [
              {
                '@id': 'mktp:_k345jh',
                '@type': 'aldkg:DataControl',
                resultsScope: 'mktp:HSCategories_Coll',
                options: {
                  renderType: 'tree',
                  title: 'WildBerries',
                  treeNodeTitleKey: 'name',
                  treeNodeParentKey: 'SubcatInCatLink',
                  connections: [
                    { toObj: 'mktp:ProductCards_in_Category_Coll_Ent0_con', toProp: 'CardInCatLink', fromProp: '@id' },
                  ],
                },
              },
              {
                '@id': 'mktp:_876df86',
                '@type': 'aldkg:DataControl',
                resultsScope: 'mktp:KPCategories_Coll',
                options: {
                  renderType: 'tree',
                  title: 'Amazon',
                  treeNodeTitleKey: 'name',
                  treeNodeParentKey: 'SubcatInCatLink',
                },
              },
              {
                '@id': 'mktp:_13hF67',
                '@type': 'aldkg:DataControl',
                resultsScope: 'mktp:HSCategories_Coll',
                options: {
                  renderType: 'tree',
                  title: '1688',
                  treeNodeTitleKey: 'name',
                  treeNodeParentKey: 'SubcatInCatLink',
                },
              },
            ],
          },
          {
            '@id': 'mktp:CategoryCardsTable',
            '@type': 'aldkg:Array',
            resultsScope: 'mktp:ProductCards_in_Category_Coll',
            options: {
              connections: [{ toObj: 'mktp:Cards_Coll_Ent0_con', toProp: '@_id' }],
              draggable: true,
              resizableHeader: true,
              style: { height: '100%' },
              order: ['imageUrl', 'name', 'price', 'saleValue', 'country', 'brand', 'seller', 'identifier'],
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
            },
          },
          {
            '@id': 'mktp:_933ndh8',
            '@type': 'aldkg:VerticalLayout',
            options: {
              style: {
                margin: '5px',
              },
            },
            elements: [
              {
                '@id': 'mktp:_29jGu67',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/identifier',
              },
              {
                '@id': 'mktp:_18hfgG78',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/name',
              },
              {
                '@id': 'mktp:_732HJfg6',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/country',
              },
              {
                '@id': 'mktp:_93jaSy67',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/brand',
              },
              {
                '@id': 'mktp:_Ogy87',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/price',
              },
              {
                '@id': 'mktp:_Jhf678',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/saleValue',
              },
              {
                '@id': 'mktp:_dfUy679',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/seller',
              },
              {
                '@id': 'mktp:_skUy67',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/categoryPopularity',
              },
              {
                '@id': 'mktp:_dkYu20',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/commentsCount',
              },
              {
                '@id': 'mktp:_sHt67y',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/starsValue',
              },
              {
                '@id': 'mktp:_Lkh78f',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/questionsCount',
              },

              {
                '@id': 'mktp:_oI89g',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/lastMonthSalesAmount',
              },
              {
                '@id': 'mktp:_lsG680',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/lastMonthSalesValue',
              },
              {
                '@id': 'mktp:_Ljs6dh',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/perMonthSalesAmount',
              },
              {
                '@id': 'mktp:_f5Ghy67',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/perMonthSalesValue',
              },
              {
                '@id': 'mktp:_lj8Hf7',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/prevMonthSalesAmount',
              },
              {
                '@id': 'mktp:_ls8GJd6',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/prevMonthSalesValue',
              },

              {
                '@id': 'mktp:_9hD67hK',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/salesAmountDiff',
              },
              {
                '@id': 'mktp:_nrFy67js',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/totalSales',
              },
              {
                '@id': 'mktp:_Sdf7n4',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/totalSalesDiff',
              },
              {
                '@id': 'mktp:_kF78d46',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/stocks',
              },
              {
                '@id': 'mktp:_df7JHd7',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/stocksDiffOrders',
              },
              {
                '@id': 'mktp:_29Kjdf78',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/stocksDiffReturns',
              },
              {
                '@id': 'mktp:_10Is93',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/rootId',
              },

              {
                '@id': 'mktp:_Kd710df',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/photosCount',
              },
              {
                '@id': 'mktp:_Asf783',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/firstParsedAt',
              },
              {
                '@id': 'mktp:_9kd7Mhd',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/lastMonthParsedAt',
              },
              {
                '@id': 'mktp:_23Mf5dY',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/parsedAt',
              },
              {
                '@id': 'mktp:_9Jke7cc6',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/prevParsedAt',
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
    '@id': 'mktp:TreeAndFormViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'mktp:TreeTableFormMktpCategoriesViewKind',
    title: 'CardCellGrid',
    description: 'CardCellGrid',
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

export const MktpCategories100Percent: Story = {
  args: {
    additionalColls,
    viewDescrId: viewDescrs[0]['@id'],
    viewDescrCollId: viewDescrCollConstr['@id'],
  },
};

const additionalColls50 = cloneDeep(additionalColls);
additionalColls50[0].data[0].elements[0].options.style.height = '50%';
export const MktpCategories50Percent: Story = {
  args: {
    additionalColls: additionalColls50,
    viewDescrId: viewDescrs[0]['@id'],
    viewDescrCollId: viewDescrCollConstr['@id'],
  },
};
