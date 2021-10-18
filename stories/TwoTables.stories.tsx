/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { cloneDeep } from 'lodash-es';
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
  antdDataControlRenderers,
  createUiModelFromState,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
  viewKindCollConstr,
  viewDescrCollConstr,
} from '../src';

import { tableRenderers } from '../src';

export default {
  title: 'Several Controls/TwoTables RemoteData',
  component: Form,
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta;

const Template: Story = (args: any) => {
  const antdRenderers: RendererRegistryEntry[] = [
    ...antdControlRenderers,
    ...antdLayoutRenderers,
    ...antdDataControlRenderers,
    ...tableRenderers,
  ];

  const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
  const rootStore = createUiModelFromState('mktp', client, rootModelInitialState, args.additionalColls);
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <div style={{ height: 'calc(100vh - 32px)' }}>
      <Provider store={store}>
        <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
          <Form viewDescrId={args.viewDescrId} viewDescrCollId={args.viewDescrCollId} />
        </MstContextProvider>
      </Provider>
    </div>
  );
};

const viewKinds = [
  {
    '@id': 'mktp:TwoTablesViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'TwoTables',
    description: 'Big table View with TwoTables',
    collsConstrs: [
      {
        '@id': 'mktp:Categories_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Categories_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:CategoryShape',
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
      },
      {
        '@id': 'mktp:ProductCards_in_Product_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ProductCards_in_Product_Coll_Ent0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:ProductCardShape',
            conditions: {
              '@id': 'mktp:ProductCards_in_Product_Coll_Ent0_Cond',
              CardInProdLink: 'mktp_d:Massager',
            },
          },
        ],
      },
      {
        '@id': 'mktp:Products_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Products_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:ProductShape',
          },
        ],
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
              '@_id': 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
            },
          },
        ],
        //orderBy: [{ expression: variable('identifier0'), descending: false }],
      },
    ],
    elements: [
      {
        '@id': 'mktp:_97hFH67',
        '@type': 'aldkg:SplitPaneLayout',
        options: {
          style: {
            width: '100%',
            height: '100%',
          },
          defaultSize: {
            'mktp:MarketplacesTabs': '17%',
            'mktp:CategoryCardsTable': '43',
            'mktp:ProductCardsTable': '26%',
            'mktp:ProductTree': '17%',
          },
          //height: 'all-empty-space',
          //width: 'all-empty-space',
        },
        // child ui elements configs
        elements: [
          {
            '@id': 'mktp:MarketplacesTabs',
            '@type': 'aldkg:TabsLayout',
            elements: [
              {
                '@id': 'mktp:_23sLhd67',
                '@type': 'aldkg:DataControl',
                resultsScope: 'mktp:Categories_Coll',
                options: {
                  renderType: 'tree',
                  title: 'WildBerries',
                  treeNodeTitleKey: 'name',
                  treeNodeParentKey: 'SubcatInCatLink',
                  connections: [{ toObj: 'mktp:ProductCards_in_Category_Coll_Ent0_con', toProp: 'CardInCatLink' }],
                },
              },
              {
                '@id': 'mktp:_90Syd67',
                '@type': 'aldkg:DataControl',
                resultsScope: 'mktp:Categories_Coll_Amzn',
                options: {
                  renderType: 'tree',
                  title: 'Amazon',
                  treeNodeTitleKey: 'name',
                  treeNodeParentKey: 'SubcatInCatLink',
                },
              },
              {
                '@id': 'mktp:_20dAy80',
                '@type': 'aldkg:DataControl',
                resultsScope: 'mktp:Categories_Coll_1688',
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
              target: {
                name: 'правую таблицу',
                iri: 'mktp:ProductCards_in_Product_Coll',
              },
              multiSelect: true,
              draggable: true,
              resizeableHeader: true,
              height: 'all-empty-space',
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
              height: 'all-empty-space',
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
              connections: [{ toObj: 'mktp:ProductCards_in_Product_Coll_Ent0_Cond', toProp: 'CardInProdLink' }],
            },
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

const cardForm = {
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
  ],
};

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

//////////////////////////////////////////////////////
//   Without VerticalLayout AND without Form
//////////////////////////////////////////////////////
export const NoVerticalLayout100Height = Template.bind({});
NoVerticalLayout100Height.args = {
  additionalColls,
  viewDescrId: viewDescrs[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};

export const NoVerticalLayout50Height = Template.bind({});
const additionalCollsNoVerticalLayout50Height = cloneDeep(additionalColls);
additionalCollsNoVerticalLayout50Height[0].data[0].elements[0].options.style.height = '50%';
NoVerticalLayout50Height.args = {
  additionalColls: additionalCollsNoVerticalLayout50Height,
  viewDescrId: viewDescrs[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};

//////////////////////////////////////////////////////
//   Without VerticalLayout AND with Form
//////////////////////////////////////////////////////
export const NoVerticalLayout100HeightForm = Template.bind({});
const additionalCollsNoVerticalLayout100HeightForm = cloneDeep(additionalColls);
additionalCollsNoVerticalLayout100HeightForm[0].data[0].elements = [
  ...additionalCollsNoVerticalLayout100HeightForm[0].data[0].elements,
  cardForm,
];
NoVerticalLayout100HeightForm.args = {
  additionalColls: additionalCollsNoVerticalLayout100HeightForm,
  viewDescrId: viewDescrs[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};

export const NoVerticalLayout50HeightForm = Template.bind({});
const additionalColls50HeightForm = cloneDeep(additionalCollsNoVerticalLayout100HeightForm);
additionalColls50HeightForm[0].data[0].elements[0].options.style.height = '50%';
NoVerticalLayout50HeightForm.args = {
  additionalColls: additionalColls50HeightForm,
  viewDescrId: viewDescrs[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};

//////////////////////////////////////////////////////
//   With VerticalLayout AND without Form
//////////////////////////////////////////////////////
export const VerticalLayout100Height = Template.bind({});
const additionalCollsVerticalLayout100Height = cloneDeep(additionalColls);
// wrap elements in VerticalLayout
additionalCollsVerticalLayout100Height[0].data[0].elements = [
  {
    '@id': 'mktp:_934jHd67',
    '@type': 'aldkg:VerticalLayout',
    options: {
      height: 'all-empty-space',
    },
    elements: additionalCollsVerticalLayout100Height[0].data[0].elements,
  },
];
VerticalLayout100Height.args = {
  additionalColls: additionalCollsVerticalLayout100Height,
  viewDescrId: viewDescrs[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};

export const VerticalLayout50Height = Template.bind({});
const additionalCollsVerticalLayout50Height = cloneDeep(additionalCollsVerticalLayout100Height);
additionalCollsVerticalLayout50Height[0].data[0].elements[0].elements[0].options.style.height = '50%';
VerticalLayout50Height.args = {
  additionalColls: additionalCollsVerticalLayout50Height,
  viewDescrId: viewDescrs[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};

//////////////////////////////////////////////////////
//   With VerticalLayout AND with Form
//////////////////////////////////////////////////////
export const VerticalLayout100HeightForm = Template.bind({});
const additionalCollsVerticalLayout100HeightForm = cloneDeep(additionalColls);
// wrap elements in VerticalLayout
additionalCollsVerticalLayout100HeightForm[0].data[0].elements = [
  {
    '@id': 'mktp:_934jHd67',
    '@type': 'aldkg:VerticalLayout',
    options: {
      height: 'all-empty-space',
    },
    elements: [...additionalCollsVerticalLayout100HeightForm[0].data[0].elements, cardForm],
  },
];
VerticalLayout100HeightForm.args = {
  additionalColls: additionalCollsVerticalLayout100HeightForm,
  viewDescrId: viewDescrs[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};

export const VerticalLayout50HeightForm = Template.bind({});
const additionalCollsVerticalLayout50HeightForm = cloneDeep(additionalCollsVerticalLayout100HeightForm);
additionalCollsVerticalLayout50HeightForm[0].data[0].elements[0].elements[0].options.style.height = '50%';
VerticalLayout50HeightForm.args = {
  additionalColls: additionalCollsVerticalLayout50HeightForm,
  viewDescrId: viewDescrs[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};
