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
import { Meta, Story } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import { SparqlClientImpl, rootModelInitialState, CollState } from '@agentlab/sparql-jsld-client';

import {
  RendererRegistryEntry,
  MstContextProvider,
  Form,
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
} from '../src';
import { viewKindCollConstr, viewDescrCollConstr } from '../src/models/ViewCollConstrs';
import { createUiModelFromState } from '../src/models/MstViewDescr';

const viewKinds = [
  {
    '@id': 'rm:FormViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'Малая форма',
    description: 'Small form',

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
        '@id': 'rm:_83hd7f',
        '@type': 'aldkg:FormLayout',
        elements: [
          {
            '@id': 'rm:_17Gj78',
            '@type': 'aldkg:Control',
            resultsScope: 'rm:FormView_Artifacts_Coll/creator',
          },
          {
            '@id': 'rm:_297Hgf56',
            '@type': 'aldkg:Control',
            resultsScope: 'rm:FormView_Artifacts_Coll/assetFolder',
          },
          {
            '@id': 'rm:_934jHd67',
            '@type': 'aldkg:Control',
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
    ],
  },
];

const viewDescrs = [
  {
    '@id': 'rm:FormViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'rm:FormViewKind',
    title: 'CardCellGrid',
    description: 'CardCellGrid',
    collsConstrs: [
      {
        '@id': 'rm:FormView_Artifacts_Coll_ViewDescr',
        '@type': 'aldkg:CollConstr',
        '@parent': 'rm:FormView_Artifacts_Coll',
        entConstrs: [
          {
            '@id': 'rm:FormView_Artifacts_Coll_Ent0_ViewDescr',
            '@type': 'aldkg:EntConstr',
            '@parent': 'rm:FormView_Artifacts_Coll_Ent0',
            conditions: {
              '@id': 'rm:_2Yud6',
              '@type': 'aldkg:EntConstrCondition',
              assetFolder: 'folders:samples_collection',
            },
          },
        ],
      },
    ],
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
  title: 'Form/ArtifactFormOverride',
  component: Form,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta;

const Template: Story<any> = (args: any) => {
  const antdRenderers: RendererRegistryEntry[] = [...antdControlRenderers, ...antdLayoutRenderers];

  const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
  const rootStore = createUiModelFromState('reqs2', client, rootModelInitialState, additionalColls);
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <Provider store={store}>
      <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
        <div style={{ height: '1000px' }}>
          <Form viewDescrId={viewDescrs[0]['@id']} viewDescrCollId={viewDescrCollConstr['@id']} />
        </div>
      </MstContextProvider>
    </Provider>
  );
};

export const RemoteData = Template.bind({});
RemoteData.args = {};
