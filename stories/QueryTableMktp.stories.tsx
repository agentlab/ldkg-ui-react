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
import * as remotedev from 'remotedev';
import { CollState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';
import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
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
  title: 'Several Controls/QueryTableMktp',
  component: Form,
  render: (args: any) => {
    const antdRenderers: RendererRegistryEntry[] = [...antdControlRenderers, ...antdLayoutRenderers, ...tableRenderers];
    const client = new SparqlClientImpl(
      'http://localhost:8181/rdf4j-server',
      'http://localhost:8181/rdf4j-server/repositories/mktp-schema/namespaces',
    );
    const rootStore = createUiModelFromState('mktp-fed', client, noCollsFormModelState, additionalColls);
    const store: any = asReduxStore(rootStore);
    connectReduxDevtools(remotedev, rootStore);
    return (
      <div style={{ height: 'calc(100vh - 32px)' }}>
        <Provider store={store}>
          <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
            <Form viewDescrId={viewDescrs[0]['@id']} viewDescrCollId={viewDescrCollConstr['@id']} />
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
    '@id': 'rm:TableViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'Карточки',
    description: 'Big table View with form',
    collsConstrs: [
      {
        '@id': 'mktp:ProductCards_in_Category_Coll',
        '@type': 'aldkg:CollConst',
        entConstrs: [
          {
            '@id': 'mktp:ProductCards_in_Category_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'als:ProductCardShape',
            /*variables: {
              name: null,
              amountValueMoving30: null,
              revenueMoving30: null,
              imageUrl: null,
              price: null,
              commentsCount: null,
              firstParsedAt: null,
              parsedAt: null,
            },*/
            conditions: {
              '@id': 'mktp:ProductCards_in_Category_Coll_Ent_Cond',
              amountValueMoving30: {
                relation: 'between-incl-both',
                value: [20000, 60000],
              },
            },
            service: mktpSchemaRepoIri,
          },
        ],
        orderBy: [{ variable: 'amountValueMoving30', descending: true }],
        limit: 500,
      },
    ],
    elements: [
      {
        '@id': 'rm:_934jHd67',
        '@type': 'aldkg:SplitPaneLayout',
        options: {
          grow: '1',
          width: '100%',
          style: {
            width: '100%',
            height: '100%',
          },
          collapseDirection: 'left',
          initialSizes: [10, 83],
        },
        elements: [
          {
            '@id': 'mktp:QueryComponent',
            '@type': 'aldkg:QueryForm',
            resultsScope: 'mktp:ProductCards_in_Category_Coll',
            options: {
              connections: [{ toObj: 'mktp:ProductCards_in_Category_Coll_Ent_Cond' }],
            },
          },
          {
            '@id': 'ProductCardTable',
            '@type': 'aldkg:Array',
            resultsScope: 'mktp:ProductCards_in_Category_Coll',
            options: {
              draggable: true,
              resizableHeader: true,
              style: { height: '100%' },
              order: [
                'imageUrl',
                'name',
                'amountValueMoving30',
                'revenueMoving30',
                'price',
                'commentsCount',
                'firstParsedAt',
                'parsedAt',
              ],
              imageUrl: {
                width: 70,
                formatter: 'image',
                editable: false,
              },
              name: {
                width: 340,
                formatter: 'extLink',
                dataToFormatter: { link: '@id' },
                icon: 'img/icons8-external-link-16.png',
                sortable: true,
                editable: false,
              },
              amountValueMoving30: {
                width: 80,
                sortable: true,
                editable: false,
              },
              revenueMoving30: {
                width: 80,
                sortable: true,
                editable: false,
              },
              price: {
                width: 60,
                sortable: true,
                editable: false,
              },
              commentsCount: {
                width: 100,
                sortable: true,
                editable: false,
              },
              firstParsedAt: {
                width: 100,
                formatter: 'dateTime',
                sortable: true,
                editable: false,
              },
              parsedAt: {
                width: 100,
                formatter: 'dateTime',
                sortable: true,
                editable: false,
              },
            },
          },
        ],
      },
    ],
  },
];

const viewDescrs = [
  {
    '@id': 'rm:TableViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'rm:TableViewKind',
    title: 'CardCellGrid',
    description: 'CardCellGrid',
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

export const RemoteData: Story = {};
