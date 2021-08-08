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
import { variable } from '@rdfjs/data-model';
import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import {
  SparqlClientImpl,
  rootModelInitialState,
  createModelFromState,
  CollState,
  mstSchemas,
} from '@agentlab/sparql-jsld-client';

import {
  RendererRegistryEntry,
  MstContextProvider,
  Form,
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
} from '../src';
import { viewKindCollConstr, viewDescrCollConstr } from '../src/stores/ViewCollConstrs';
import { ViewDescr } from '../src/stores/ViewDescr';

const antdRenderers: RendererRegistryEntry[] = [...antdControlRenderers, ...antdLayoutRenderers];

const viewDescrs = [
  {
    '@id': 'rm:FormView',
    '@type': 'aldkg:ViewDescr',
    //'viewKind': 'rm:FormViewClass',
    title: 'Малая форма',
    description: 'Small form',
    type: 'FormLayout',
    collsConstrs: [
      {
        '@id': 'rm:FormView_Artifacts_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:FormView_Artifacts_Coll_Ent0',
            '@type': 'aldkg:EntConstr',
            schema: 'rm:ArtifactShape',
          },
        ],
        //orderBy: [{ expression: variable('identifier0'), descending: false }],
      },
    ],
    elements: [
      {
        type: 'Control',
        resultsScope: 'rm:FormView_Artifacts_Coll/creator',
      },
      {
        type: 'Control',
        resultsScope: 'rm:FormView_Artifacts_Coll/assetFolder',
      },
      {
        type: 'Control',
        resultsScope: 'rm:FormView_Artifacts_Coll/description',
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
];

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

mstSchemas['aldkg:ViewDescr'] = ViewDescr;

const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
const rootStore = createModelFromState('reqs2', client, rootModelInitialState, additionalColls);
const store: any = asReduxStore(rootStore);
// eslint-disable-next-line @typescript-eslint/no-var-requires
connectReduxDevtools(require('remotedev'), rootStore);

export default {
  title: 'Form/ArtifactForm',
  component: Form,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<any> = (args: any) => (
  <Provider store={store}>
    <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
      <div style={{ height: '1000px' }}>
        <Form viewIri={viewDescrs[0]['@id']} viewsResultsScope={viewDescrCollConstr['@id']} />
      </div>
    </MstContextProvider>
  </Provider>
);

export const RemoteData = Template.bind({});
RemoteData.args = {};
