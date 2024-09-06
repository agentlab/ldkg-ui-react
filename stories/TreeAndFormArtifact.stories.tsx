/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
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
import { factory, CollState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';

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
import { noCollsFormModelState } from './TestData';

export default {
  title: 'Several Controls/TreeAndForm Artifacts',
  component: Form,
  render: (args: any) => {
    const antdRenderers: RendererRegistryEntry[] = [
      ...antdControlRenderers,
      ...antdLayoutRenderers,
      ...antdDataControlRenderers,
    ];
    const client = new SparqlClientImpl('http://localhost:8181/rdf4j-server');
    const rootStore = createUiModelFromState('reqs2', client, noCollsFormModelState, additionalColls);
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

const viewKinds = [
  {
    '@id': 'rm:TreeAndFormArtifactViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'TreeAndForm',
    description: 'TreeAndForm',
    collsConstrs: [
      {
        '@id': 'rm:Folders_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:Folders_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'nav:folderShape',
          },
        ],
      },
      {
        '@id': 'rm:Artifacts_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:Artifacts_Coll_Ent0',
            '@type': 'aldkg:EntConstr',
            schema: 'rm:ArtifactShape',
          },
        ],
        //orderBy: [{ expression: factory.variable('identifier0'), descending: false }],
      },
    ],
    // child ui elements configs
    elements: [
      {
        '@id': 'rm:_kf8Df7',
        '@type': 'aldkg:SplitPaneLayout',
        options: {
          style: {
            width: '100%',
            height: '50%',
          },

          collapseDirection: 'left',
          initialSizes: [17, 83],
        },
        elements: [
          {
            '@id': 'rm:_9fKJ7dv',
            '@type': 'aldkg:DataControl',
            resultsScope: 'rm:Folders_Coll',
            options: {
              renderType: 'tree',
            },
          },
          {
            '@id': 'rm:_fgu778f',
            '@type': 'aldkg:FormLayout',
            options: {
              title: 'Aртефакт',
            },
            elements: [
              {
                '@id': 'rm:_kf8Jdf',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Artifacts_Coll/creator',
              },
              {
                '@id': 'rm:_9dF78',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Artifacts_Coll/assetFolder',
              },
              {
                '@id': 'rm:_37Jdf67',
                '@type': 'aldkg:Control',
                resultsScope: 'rm:Artifacts_Coll/description',
                options: {
                  validation: [
                    {
                      validator: 'RegExp',
                      propsToValidator: {
                        regExp: 'bo*',
                      },
                      validateStatus: 'error',
                      help: 'Работает',
                    },
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
    '@id': 'rm:TreeAndFormArtifactViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'rm:TreeAndFormArtifactViewKind',
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
