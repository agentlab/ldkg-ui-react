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
import { SparqlClientImpl, rootModelInitialState, CollState } from '@agentlab/sparql-jsld-client';

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
import { createUiModelFromState } from '../src/stores/ViewDescr';

const antdRenderers: RendererRegistryEntry[] = [
  ...antdControlRenderers,
  ...antdLayoutRenderers,
  ...antdDataControlRenderers,
];

const viewKinds = [
  {
    '@id': 'mktp:CardCellGridViewKind',
    '@type': 'aldkg:ViewKind',
    type: 'VerticalLayout',
    collsConstrs: [
      {
        '@id': 'mktp:ViewKind_Cards_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ViewKind_Cards_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:ProductCardShape',
          },
        ],
      },
    ],
    options: {
      //width: 'all-empty-space',
    },
    // child ui elements configs
    elements: [
      {
        type: 'DataControl',
        resultsScope: 'mktp:ViewKind_Cards_Coll',
        options: {
          renderType: 'grid',
          grid: {
            gutter: 16,
            xs: 2,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 7,
          },
          elementTemplate: [
            {
              type: 'CardLayout',
              elements: [
                {
                  type: 'ImageCell',
                  scope: 'imageUrl',
                },
                {
                  type: 'Control',
                  scope: 'name',
                  options: {
                    editable: false,
                    style: {
                      height: '3.5em',
                      textAlign: 'left',
                      fontFamily: 'Lato,Tahoma,sans-serif',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      margin: 0,
                    },
                  },
                },
                {
                  type: 'Rate',
                  scope: 'starsValue',
                  options: {
                    editable: false,
                  },
                },
                {
                  type: 'CellHorizontalLayout',
                  options: {
                    justify: 'space-between',
                  },
                  elements: [
                    {
                      type: 'Control',
                      scope: 'price',
                      options: {
                        formater: 'labeledValue',
                        editable: false,
                        label: 'Цена',
                        specialChar: '₽',
                        style: {
                          textAlign: 'left',
                          fontFamily: 'Lato,Tahoma,sans-serif',
                          color: 'gray',
                        },
                      },
                    },
                    {
                      type: 'Control',
                      scope: 'totalSales',
                      options: {
                        formater: 'labeledValue',
                        editable: false,
                        label: 'Всего продано',
                        style: {
                          textAlign: 'right',
                          fontFamily: 'Lato,Tahoma,sans-serif',
                          color: 'gray',
                        },
                      },
                    },
                  ],
                },
                {
                  type: 'Control',
                  scope: 'lastMonthSalesAmount',
                  options: {
                    editable: false,
                    formater: 'сomparison',
                    dataToFormater: {
                      prevValue: 'prevMonthSalesAmount',
                    },
                    label: 'Продажи за месяц',
                    style: {
                      textAlign: 'left',
                      fontFamily: 'Lato,Tahoma,sans-serif',
                      color: 'gray',
                    },
                  },
                },
                {
                  type: 'Control',
                  scope: 'lastMonthSalesValue',
                  options: {
                    formater: 'сomparison',
                    editable: false,
                    dataToFormater: {
                      prevValue: 'prevMonthSalesValue',
                    },
                    label: 'Объем продаж',
                    style: {
                      textAlign: 'left',
                      fontFamily: 'Lato,Tahoma,sans-serif',
                      color: 'gray',
                    },
                  },
                },
                {
                  type: 'G2',
                },
                {
                  type: 'CellHorizontalLayout',
                  options: {
                    justify: 'space-around',
                  },
                  elements: [
                    {
                      type: 'Control',
                      scope: '@id',
                      options: {
                        style: {
                          border: '1.5px solid black',
                          borderRadius: '2px',
                          height: '2em',
                          textAlign: 'center',
                          fontWeight: 500,
                          width: '90px',
                          color: 'black',
                        },
                        specialImage: 'https://www.meme-arsenal.com/memes/f8e9bfb9fdf368272b21a5dac8f01ec1.jpg',
                        editable: false,
                        formater: 'link',
                        dataToFormater: {
                          link: '@id',
                        },
                        label: 'Wildberries',
                      },
                    },
                    {
                      type: 'Button',
                      options: {
                        label: 'Добавить',
                        style: {
                          border: '1.5px solid black',
                          borderRadius: '2px',
                          width: '90px',
                          fontWeight: 500,
                          color: 'black',
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  },
];

const viewDescrs = [
  {
    '@id': 'mktp:CardCellViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'mktp:CardCellGridViewKind',
    type: 'VerticalLayout',
    title: 'CardCellGrid',
    description: 'CardCellGrid',
    collsConstrs: [
      {
        '@id': 'mktp:ViewDescr_Cards_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ViewDescr_Cards_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:ProductCardShape',
          },
        ],
      },
    ],
    options: {
      //width: 'all-empty-space',
    },
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

const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
const rootStore = createUiModelFromState('mktp', client, rootModelInitialState, additionalColls);
console.log('rootStore', rootStore);
const store: any = asReduxStore(rootStore);
// eslint-disable-next-line @typescript-eslint/no-var-requires
connectReduxDevtools(require('remotedev'), rootStore);

export default {
  title: 'Several Controls/TreeAndForm Cards',
  component: Form,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

export const Empty: Story<{}> = () => (
  <Provider store={store}>
    <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
      <div
        style={{
          //height: '1000px',
          width: '100%',
          backgroundColor: 'rgba(230, 235, 242, 0.5)',
          margin: '0 auto',
          padding: '5px',
        }}>
        <Form
          viewDescrId={viewDescrs[0]['@id']}
          viewDescrCollId={viewDescrCollConstr['@id']}
          viewKindCollId={viewKindCollConstr['@id']}
        />
      </div>
    </MstContextProvider>
  </Provider>
);
