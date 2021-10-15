/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { cloneDeep } from 'lodash';
import moment from 'moment';
import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import { SparqlClientImpl, rootModelInitialState, CollState, JsObject } from '@agentlab/sparql-jsld-client';

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
        options: {
          readOnly: false,
        },
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
    collsConstrs: [],
    // child ui elements configs
    elements: [],
  },
];

const createAdditionalColls = (viewKinds: any, data: JsObject[] | undefined): CollState[] => {
  const additionalColls = [
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
  if (data) {
    additionalColls.push({
      constr: viewKinds[0].collsConstrs[0],
      data,
      opt: {
        updPeriod: undefined,
        lastSynced: moment.now(),
        //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
        // for viewDescrs.collConstrs (it loads lazily -- after the first access)
      },
    });
  }
  return additionalColls;
};

export default {
  title: 'Form/ArtifactForm',
  component: Form,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<any> = (args: any) => {
  const antdRenderers: RendererRegistryEntry[] = [...antdControlRenderers, ...antdLayoutRenderers];

  const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
  const rootStore = createUiModelFromState(
    'reqs2',
    client,
    rootModelInitialState,
    createAdditionalColls(args.viewKinds, args.data),
  );
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

export const EditableRemoteData = Template.bind({});
EditableRemoteData.args = {
  viewKinds,
};

export const ReadOnlyRemoteData = Template.bind({});
const readOnlyFormViewKinds = cloneDeep(viewKinds);
readOnlyFormViewKinds[0].elements[0].options.readOnly = true;
ReadOnlyRemoteData.args = {
  viewKinds: readOnlyFormViewKinds,
};

export const EditableObjectWithNullProperty = Template.bind({});
EditableObjectWithNullProperty.args = {
  viewKinds,
  data: [
    {
      creator: null,
      assetFolder: null,
      description: 'TestDescr',
    },
  ],
};

export const ReadOnlyObjectWithNullProperty = Template.bind({});
ReadOnlyObjectWithNullProperty.args = {
  viewKinds: readOnlyFormViewKinds,
  data: [
    {
      creator: null,
      assetFolder: null,
      description: 'TestDescr',
    },
  ],
};

export const EditableEmptyObject = Template.bind({});
EditableEmptyObject.args = {
  viewKinds,
  data: [{}],
};

export const ReadOnlyEmptyObject = Template.bind({});
ReadOnlyEmptyObject.args = {
  viewKinds: readOnlyFormViewKinds,
  data: [{}],
};

export const ReadOnlyNoObject = Template.bind({});
ReadOnlyNoObject.args = {
  viewKinds, // form should be read-only even if viewKind is not read-only
  data: [],
};
