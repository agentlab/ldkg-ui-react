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
  tableRenderers,
} from '../src';
import { viewKindCollConstr, viewDescrCollConstr } from '../src/models/ViewCollConstrs';
import { createUiModelFromState } from '../src/models/MstViewDescr';

export default {
  title: 'Several Controls/FormColumns and Table',
  component: Form,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta;

export const Empty: Story<{}> = () => {
  const antdRenderers: RendererRegistryEntry[] = [
    ...antdControlRenderers,
    ...antdLayoutRenderers,
    ...antdDataControlRenderers,
    ...tableRenderers,
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
            conditions: {
              '@id': 'mktp:Cards_Coll_Ent0_con',
              identifier: 'https://huntersales.ru/catalog/products/18279449',
            },
          },
        ],
        //orderBy: [{ expression: variable('identifier0'), descending: false }],
      },
    ],
    // child ui elements configs
    elements: [
      {
        '@id': 'mktp:_97hFH67',
        '@type': 'aldkg:SplitPaneLayout',
        options: {
          style: {
            width: '100%',
            height: '120%',
          },
          split: 'horizontal',
          collapseDirection: 'up',
          initialSizes: [25, 65],
          minSizes: [100, 100],
          //height: 'all-empty-space',
          //width: 'all-empty-space',
        },
        elements: [
          {
            '@id': 'mktp:_8255hFsd',
            '@type': 'aldkg:PanelLayout',
            options: {
              style: {
                width: '100%',
              },
              width: 'all-empty-space',
            },
            elements: [
              {
                '@id': 'rm:_834hd7f',
                '@type': 'aldkg:FormLayout',
                options: {
                  style: {
                    height: '100%',
                    width: '100%',
                  },
                  readOnly: true,
                },
                elements: [
                  {
                    '@id': 'mktp:_87Dfg78',
                    '@type': 'aldkg:PanelLayout',
                    options: {
                      flow: 'horizontal',
                      style: {
                        height: '100%',
                        width: '100%',
                      },
                      width: 'all-empty-space',
                    },
                    elements: [
                      {
                        '@id': 'mktp:_8255hFd3',
                        '@type': 'aldkg:PanelLayout',
                        options: {
                          style: {
                            width: '20%',
                            height: '100%',
                            padding: '5px',
                          },
                        },
                        elements: [
                          {
                            '@id': 'mktp:_63JdF67',
                            '@type': 'aldkg:Image',
                            resultsScope: 'rm:Cards_Coll/imageUrl',
                            options: {
                              fallback:
                                'data:image/png;base64,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',
                            },
                          },
                        ],
                      },
                      {
                        '@id': 'mktp:_88Dfg78',
                        '@type': 'aldkg:PanelLayout',
                        options: {
                          style: {
                            verticalAlign: 'top',
                            height: '20%',
                            width: '80%',
                          },
                        },
                        elements: [
                          {
                            '@id': 'mktp:_63JdF67',
                            '@type': 'aldkg:Control',
                            resultsScope: 'rm:Cards_Coll/name',
                          },
                          {
                            '@id': 'mktp:_87Dfg78',
                            '@type': 'aldkg:PanelLayout',
                            options: {
                              flow: 'horizontal',
                              style: {
                                //flexGrow: '5',
                                width: '100%',
                              },
                              width: 'all-empty-space',
                            },
                            elements: [
                              {
                                '@id': 'mktp:_93JhdA78',
                                '@type': 'aldkg:VerticalLayout',
                                options: {
                                  style: {
                                    verticalAlign: 'top',
                                    padding: '5px',
                                  },
                                  width: 'all-empty-space',
                                },
                                elements: [
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
                                    verticalAlign: 'top',
                                    padding: '5px',
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
                                    verticalAlign: 'top',
                                    padding: '5px',
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
                                    verticalAlign: 'top',
                                    padding: '5px',
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
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            '@id': 'mktp:_8255hFsd',
            '@type': 'aldkg:PanelLayout',
            options: {
              style: {
                height: '100%',
                width: '100%',
              },
            },
            elements: [
              {
                '@id': 'mktp:CategoryCardsTable',
                '@type': 'aldkg:Array',
                resultsScope: 'rm:Cards_Coll',
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
