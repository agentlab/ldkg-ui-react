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
import { Button } from 'antd';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import {
  SparqlClientImpl,
  Repository,
  rootModelInitialState,
  createModelFromState,
  JSONSchema6forRdf,
  CollState,
} from '@agentlab/sparql-jsld-client';

import {
  RendererRegistryEntry,
  MstContextProvider,
  Form,
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
} from '../src';
import { artifactSchema } from '../test/schema/TestSchemas';

const antdRenderers: RendererRegistryEntry[] = [...antdControlRenderers, ...antdLayoutRenderers];

export default {
  title: 'Form/ArtifactForm',
  component: Form,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const viewDescrs = [
  {
    '@id': 'rm:FormView',
    '@type': 'rm:View',
    //'viewKind': 'rm:FormViewClass',
    title: 'Малая форма',
    description: 'Small form',
    type: 'FormLayout',
    collsConstrs: [
      {
        '@id': 'rm:FormView_Artifacts_Coll',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:FormView_Artifacts_Coll_Ent0',
            '@type': 'rm:EntConstr',
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

const ViewShapeSchema: JSONSchema6forRdf = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  '@id': 'rm:ViewShape',
  '@type': 'sh:NodeShape',
  title: 'View Shape',
  description: 'Artifact Shape',
  targetClass: 'rm:View',
  type: 'object',
  '@context': {
    '@type': 'rdf:type',
  },
  properties: {
    '@id': {
      title: 'URI',
      type: 'string',
      format: 'iri',
    },
    '@type': {
      title: 'Тип',
      type: 'string',
      format: 'iri',
    },
  },
  required: ['@id', '@type'],
};

const viewDescrCollConstr = {
  '@id': 'rm:Views_Coll',
  entConstrs: [
    {
      '@id': 'rm:Views_EntConstr0',
      schema: ViewShapeSchema['@id'],
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
//@ts-ignore
//const rootStore = Repository.create(rootModelInitialState, { client });
const rootStore = createModelFromState('reqs2', client, rootModelInitialState, additionalColls);
const store: any = asReduxStore(rootStore);
// eslint-disable-next-line @typescript-eslint/no-var-requires
connectReduxDevtools(require('remotedev'), rootStore);

console.log('const inited', { client, rootStore, store });

const Template: Story<any> = (args: any) => {
  console.log('Template initing', { client, rootStore, store });
  return (
    <Provider store={store}>
      <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
        <div style={{ height: '1000px' }}>
          <Form viewIri={viewDescrs[0]['@id']} viewsResultsScope={viewDescrCollConstr['@id']} />
        </div>
      </MstContextProvider>
    </Provider>
  );
};

export const RemoteData = Template.bind({});
RemoteData.args = {};
