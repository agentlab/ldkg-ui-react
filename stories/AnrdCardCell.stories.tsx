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
import { SparqlClientImpl, rootModelInitialState, createModelFromState, CollState } from '@agentlab/sparql-jsld-client';

import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
  antdDataControlRenderers,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
} from '../src';

const antdRenderers: RendererRegistryEntry[] = [
  ...antdControlRenderers,
  ...antdLayoutRenderers,
  ...antdDataControlRenderers,
];

const cardData = [
  {
    '@id': '1',
    name: 'test1',
    imageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    '@id': '2',
    name: 'test2',
    imageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    '@id': '1',
    name: 'test1',
    imageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    '@id': '1',
    name: 'test1',
    imageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    '@id': '1',
    name: 'test1',
    imageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    '@id': '1',
    name: 'test1',
    imageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    '@id': '1',
    name: 'test1',
    imageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    '@id': '1',
    name: 'test1',
    imageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    '@id': '1',
    name: 'test1',
    imageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];
const viewDescrs = [
  {
    '@id': 'mktp:CardCellViewDescr',
    '@type': 'rm:View',
    title: 'CardCellGrid',
    description: 'CardCellGrid',
    viewKind: 'rm:CardCellGridViewKind',
    collsConstrs: [
      {
        '@id': 'rm:Cards_Coll',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:Cards_Coll_Shape0',
            '@type': 'rm:EntConstr',
            schema: 'hs:ProductCardShape',
          },
        ],
      },
    ],
    type: 'VerticalLayout',
    options: {
      //width: 'all-empty-space',
    },
    // child ui elements configs
    elements: [
      {
        type: 'DataControl',
        resultsScope: 'rm:Cards_Coll',
        options: {
          renderType: 'grid',
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
                        label: 'Цена',
                        specialChar: '$',
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

const viewDescrCollConstr = {
  '@id': 'rm:Views_Coll',
  entConstrs: [
    {
      '@id': 'rm:Views_EntConstr0',
      schema: 'rm:ViewShape',
    },
  ],
};

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

const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
const rootStore = createModelFromState('mktp', client, rootModelInitialState, additionalColls);
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
          height: '1000px',
          width: '1000px',
          backgroundColor: 'rgba(230, 235, 242, 0.5)',
          margin: '0 auto',
          padding: '5px',
        }}>
        <Form viewIri={viewDescrs[0]['@id']} viewsResultsScope={viewDescrCollConstr['@id']} />
      </div>
    </MstContextProvider>
  </Provider>
);
