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
import remotedev from 'remotedev';
import { CollState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';
import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
  antdDataControlRenderers,
  createAdditionalColls,
  createUiModelFromState,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
  viewKindCollConstr,
  viewDescrCollConstr,
  actions,
  tableRenderers,
} from '../src';

import { noCollsFormModelState } from './TestData';

export default {
  title: 'Several Controls/Table surrounded by four SplitPanes',
  component: Form,
  render: (args: any) => {
    const antdRenderers: RendererRegistryEntry[] = [
      ...antdControlRenderers,
      ...antdLayoutRenderers,
      ...antdDataControlRenderers,
      ...tableRenderers,
    ];
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
          <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells} actions={actions}>
            <Form viewDescrId={args.viewDescrId} viewDescrCollId={args.viewDescrCollId} />
          </MstContextProvider>
        </Provider>
      </div>
    );
  },
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

const viewKinds = [
  {
    '@id': 'mktp:TwoTablesViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'TwoTables',
    description: 'Big table View with TwoTables',
    collsConstrs: [
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
              //CardInCatLink: 'https://www.wildberries.ru/catalog/zdorove/ozdorovlenie?sort=popular&page=1&xsubject=594',
            },
          },
        ],
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
          initialSizes: [20, 80],
          split: 'horizontal',
          collapseDirection: 'top',
        },
        // child ui elements configs
        elements: [
          {
            '@id': 'mktp:_1_2_1',
            '@type': 'aldkg:TextPanel',
            options: {
              height: '25%',
              width: '100%',
              value: 'Верхний сосед',
              style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
            },
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
              split: 'horizontal',
              collapseDirection: 'down',
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
                  initialSizes: [80, 20],
                  collapseDirection: 'right',
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
                      initialSizes: [20, 80],
                      collapseDirection: 'left',
                    },
                    elements: [
                      {
                        '@id': 'mktp:_1_2_1',
                        '@type': 'aldkg:TextPanel',
                        options: {
                          height: '25%',
                          width: '100%',
                          value: 'Левый сосед',
                          style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
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
                    '@id': 'mktp:_1_2_1',
                    '@type': 'aldkg:TextPanel',
                    options: {
                      height: '25%',
                      width: '100%',
                      value: 'Правый сосед',
                      style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:_1_2_1',
                '@type': 'aldkg:TextPanel',
                options: {
                  height: '25%',
                  width: '100%',
                  value: 'Нижний сосед',
                  style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
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

//////////////////////////////////////////////////////
//   Without VerticalLayout AND without Form
//////////////////////////////////////////////////////
export const RemoteData: Story = {
  args: {
    additionalColls,
    viewDescrId: viewDescrs[0]['@id'],
    viewDescrCollId: viewDescrCollConstr['@id'],
  },
};
