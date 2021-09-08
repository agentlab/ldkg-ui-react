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
import {
  CollState,
  JsStrObj,
  Results,
  rootModelInitialState,
  sendGet,
  SparqlClientImpl,
} from '@agentlab/sparql-jsld-client';

import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
  antdDataControlRenderers,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
  tableRenderers,
} from '../src';
import { viewKindCollConstr, viewDescrCollConstr } from '../src/models/ViewCollConstrs';
import { createUiModelFromState } from '../src/models/MstViewDescr';

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
              CardInCatLink: 'https://www.wildberries.ru/catalog/zdorove/ozdorovlenie?sort=popular&page=1&xsubject=594',
            },
          },
        ],
        limit: 1000,
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
              '@_id': undefined,
            },
          },
        ],
        //orderBy: [{ expression: variable('identifier0'), descending: false }],
      },
    ],
    // child ui elements configs
    elements: [
      {
        '@id': 'mktp:_934Jfg7',
        '@type': 'aldkg:SplitPaneLayout',
        options: {
          defaultSize: {
            'mktp:MarketplacesTabs': '17%',
            'mktp:CategoryCardsTable': '43%',
            'mktp:CategoryCardForm': '43%',
          },
          height: 'all-empty-space',
          //width: 'all-empty-space',
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
                  connections: [{ to: 'mktp:ProductCards_in_Category_Coll_Ent0_con', by: 'CardInCatLink' }],
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
              connections: [{ to: 'mktp:Cards_Coll_Ent0_con', by: '@_id' }],
              draggable: true,
              resizeableHeader: true,
              height: 'all-empty-space',
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

export default {
  title: 'Several Controls/Tree-Table-Form',
  component: Form,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

export const MktpCategories: Story<{}> = () => {
  const antdRenderers: RendererRegistryEntry[] = [
    ...antdControlRenderers,
    ...antdLayoutRenderers,
    ...antdDataControlRenderers,
    ...tableRenderers,
  ];

  //const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
  //const rootStore = createUiModelFromState('mktp', client, rootModelInitialState, additionalColls);
  const client = new SparqlClientImpl(
    'https://rdf4j.agentlab.ru/rdf4j-server',
    'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp/namespaces',
  );
  const rootStore = createUiModelFromState('mktp-fed', client, rootModelInitialState, additionalColls);
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <Provider store={store}>
      <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
        <div style={{ height: '1000px', width: '100%' }}>
          <Form viewDescrId={viewDescrs[0]['@id']} viewDescrCollId={viewDescrCollConstr['@id']} />
        </div>
      </MstContextProvider>
    </Provider>
  );
};
