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
import dayjs from 'dayjs';
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import * as remotedev from 'remotedev';
import { factory, CollState, rootModelInitialState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';
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
  actions,
} from '../src';

import { tableRenderers } from '../src';

export default {
  title: 'Several Controls/TwoTables RemoteData',
  component: Form,
  render: (args: any) => {
    const antdRenderers: RendererRegistryEntry[] = [
      ...antdControlRenderers,
      ...antdLayoutRenderers,
      ...antdDataControlRenderers,
      ...tableRenderers,
    ];
    const client = new SparqlClientImpl('http://localhost:8181/rdf4j-server');
    const rootStore = createUiModelFromState('mktp', client, rootModelInitialState, args.additionalColls);
    const store: any = asReduxStore(rootStore);
    connectReduxDevtools(remotedev, rootStore);
    return (
      <div style={{ height: 'calc(100vh - 32px)' }}>
        <Provider store={store}>
          <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells} actions={actions}>
            <Form viewDescrId={args.viewDescrId} viewDescrCollId={args.viewDescrCollId} />
          </MstContextProvider>
        </Provider>
      </div>
    );
  },
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta<typeof Form>;

type Story = StoryObj<any>; // StoryObj<typeof Form>;

/*const css = {
    height: '1px',
    background: 'rgba(0, 0, 0, 0.1)',
  };
  const hoverCss = {
    height: '10px',
    marginTop: '-10px',
    backgroundImage: 'radial-gradient(at center center,rgba(0,0,0,0.2) 0%,transparent 70%,transparent 100%)',
    backgroundSize: '100% 50px',
    backgroundPosition: '50% 0',
    backgroundRepeat: 'no-repeat',
    borderRight: '1px solid rgba(0, 0, 0, 0.1)',
  };*/
const css = {
  width: '2px',
  backgroundColor: 'rgba(120, 120, 120, 0.3)',
};
const hoverCss = { backgroundColor: 'rgba(120, 120, 120, 0.6)' };

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
        //orderBy: [{ expression: factory.variable('identifier0'), descending: false }],
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
          initialSizes: [40, 60],
          collapseDirection: 'left',
        },
        // child ui elements configs
        elements: [
          {
            '@id': 'mktp:_97hFH67',
            '@type': 'aldkg:SplitPaneLayout',
            options: {
              style: {
                width: '100%',
                height: '100%',
              },
              initialSizes: [30, 70],
              collapseDirection: 'left',
              resizerOptions: {
                grabberSize: '2rem',
                css: css,
                hoverCss: hoverCss,
              },
            },
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
                      connections: [
                        {
                          toObj: 'mktp:ProductCards_in_Category_Coll_Ent0_con',
                          toProp: 'CardInCatLink',
                          fromProp: '@id',
                        },
                      ],
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
                  selectActions: [
                    {
                      '@id': 'action1',
                      '@type': 'ldkg:addObjects',
                      title: 'Добавить объекты',
                    },
                    {
                      '@id': 'action2',
                      '@type': 'ldkg:deleteObjects',
                      title: 'Удалить объекты',
                    },
                    {
                      '@id': 'action3',
                      '@type': 'ldkg:addConnectionToTarget',
                      title: 'Добавить в правую таблицу',
                      options: {
                        target: 'mktp:ProductCards_in_Product_Coll',
                      },
                    },
                  ],
                  resizableHeader: true,
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
            ],
          },
          {
            '@id': 'mktp:_97hFH67',
            '@type': 'aldkg:SplitPaneLayout',
            options: {
              style: {
                width: '100%',
                height: '100%',
              },
              initialSizes: [80, 20],
              collapseDirection: 'right',
            },
            elements: [
              {
                '@id': 'mktp:ProductCardsTable',
                '@type': 'aldkg:Array',
                resultsScope: 'mktp:ProductCards_in_Product_Coll',
                options: {
                  selectActions: [
                    {
                      '@id': 'action1',
                      '@type': 'ldkg:addObjects',
                      title: 'Добавить объекты',
                    },
                    {
                      '@id': 'action2',
                      '@type': 'ldkg:deleteObjects',
                      title: 'Удалить объекты',
                    },
                  ],
                  draggable: true,
                  resizableHeader: true,
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
                  connections: [
                    { toObj: 'mktp:ProductCards_in_Product_Coll_Ent0_Cond', toProp: 'CardInProdLink', fromProp: '@id' },
                  ],
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

//////////////////////////////////////////////////////
//   Without VerticalLayout AND without Form
//////////////////////////////////////////////////////
export const NoVerticalLayout100Height: Story = {
  args: {
    additionalColls,
    viewDescrId: viewDescrs[0]['@id'],
    viewDescrCollId: viewDescrCollConstr['@id'],
  },
};

const additionalCollsNoVerticalLayout50Height = cloneDeep(additionalColls);
additionalCollsNoVerticalLayout50Height[0].data[0].elements[0].options.style.height = '50%';
export const NoVerticalLayout50Height: Story = {
  args: {
    additionalColls: additionalCollsNoVerticalLayout50Height,
    viewDescrId: viewDescrs[0]['@id'],
    viewDescrCollId: viewDescrCollConstr['@id'],
  },
};

//////////////////////////////////////////////////////
//   Without VerticalLayout AND with Form
//////////////////////////////////////////////////////
const additionalCollsNoVerticalLayout100HeightForm = cloneDeep(additionalColls);
additionalCollsNoVerticalLayout100HeightForm[0].data[0].elements = [
  ...additionalCollsNoVerticalLayout100HeightForm[0].data[0].elements,
  cardForm,
];
export const NoVerticalLayout100HeightForm: Story = {
  args: {
    additionalColls: additionalCollsNoVerticalLayout100HeightForm,
    viewDescrId: viewDescrs[0]['@id'],
    viewDescrCollId: viewDescrCollConstr['@id'],
  },
};

const additionalColls50HeightForm = cloneDeep(additionalCollsNoVerticalLayout100HeightForm);
additionalColls50HeightForm[0].data[0].elements[0].options.style.height = '50%';
export const NoVerticalLayout50HeightForm: Story = {
  args: {
    additionalColls: additionalColls50HeightForm,
    viewDescrId: viewDescrs[0]['@id'],
    viewDescrCollId: viewDescrCollConstr['@id'],
  },
};

//////////////////////////////////////////////////////
//   With VerticalLayout AND without Form
//////////////////////////////////////////////////////
const additionalCollsVerticalLayout100Height = cloneDeep(additionalColls);
// wrap elements in VerticalLayout
additionalCollsVerticalLayout100Height[0].data[0].elements = [
  {
    '@id': 'mktp:_934jHd67',
    '@type': 'aldkg:PanelLayout',
    options: {
      style: { height: '100%' },
    },
    elements: additionalCollsVerticalLayout100Height[0].data[0].elements,
  },
];
export const VerticalLayout100Height: Story = {
  args: {
    additionalColls: additionalCollsVerticalLayout100Height,
    viewDescrId: viewDescrs[0]['@id'],
    viewDescrCollId: viewDescrCollConstr['@id'],
  },
};

const additionalCollsVerticalLayout50Height = cloneDeep(additionalCollsVerticalLayout100Height);
additionalCollsVerticalLayout50Height[0].data[0].elements[0].elements[0].options.style.height = '50%';
export const VerticalLayout50Height: Story = {
  args: {
    additionalColls: additionalCollsVerticalLayout50Height,
    viewDescrId: viewDescrs[0]['@id'],
    viewDescrCollId: viewDescrCollConstr['@id'],
  },
};

//////////////////////////////////////////////////////
//   With VerticalLayout AND with Form
//////////////////////////////////////////////////////
const additionalCollsVerticalLayout100HeightForm = cloneDeep(additionalColls);
// wrap elements in VerticalLayout
additionalCollsVerticalLayout100HeightForm[0].data[0].elements = [
  {
    '@id': 'mktp:_934jHd67',
    '@type': 'aldkg:PanelLayout',
    options: {
      style: { height: '100%' },
    },
    elements: [...additionalCollsVerticalLayout100HeightForm[0].data[0].elements, cardForm],
  },
];
export const VerticalLayout100HeightForm: Story = {
  args: {
    additionalColls: additionalCollsVerticalLayout100HeightForm,
    viewDescrId: viewDescrs[0]['@id'],
    viewDescrCollId: viewDescrCollConstr['@id'],
  },
};

const additionalCollsVerticalLayout50HeightForm = cloneDeep(additionalCollsVerticalLayout100HeightForm);
additionalCollsVerticalLayout50HeightForm[0].data[0].elements[0].elements[0].options.style.height = '50%';
export const VerticalLayout50HeightForm: Story = {
  args: {
    additionalColls: additionalCollsVerticalLayout50HeightForm,
    viewDescrId: viewDescrs[0]['@id'],
    viewDescrCollId: viewDescrCollConstr['@id'],
  },
};
