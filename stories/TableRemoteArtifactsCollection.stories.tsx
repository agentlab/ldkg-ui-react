/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
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
import { rootModelInitialState, CollState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';
import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
  createUiModelFromState,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
  viewKindCollConstr,
  viewDescrCollConstr,
} from '../src';

import { tableRenderers } from '../src';

const viewKinds = [
  {
    '@id': 'rm:CollectionViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'Набор',
    description: 'Big FlatTable View',
    collsConstrs: [
      {
        '@id': 'rm:Folders_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:Folders_Coll_Shape0',
            '@type': 'raldkgm:EntConstr',
            schema: 'nav:folderShape',
          },
        ],
      },
      {
        '@id': 'rm:Users_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:Users_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'pporoles:UserShape',
          },
        ],
      },
      {
        '@id': 'rm:ArtifactClasses_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:ArtifactClasses_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'rm:ArtifactClassesShape',
          },
        ],
      },
      {
        '@id': 'rm:ArtifactFormats_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:ArtifactFormats_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOowShape',
          },
        ],
      },
      {
        '@id': 'rm:Artifacts_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:Artifacts_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'rm:ArtifactShape',
            conditions: {
              '@id': 'rm:Artifacts_Coll_Cond',
              '@type': 'aldkg:Condition',
              assetFolder: 'folders:samples_collection', //'folders:root',
            },
          },
        ],
        orderBy: [{ expression: variable('identifier0'), descending: false }],
        limit: 50,
      },
    ],
    elements: [
      {
        '@id': 'rm:_124jHd67',
        '@type': 'aldkg:PanelLayout',
        options: {
          style: {
            height: '100%',
          },
        },
        elements: [
          {
            '@id': 'ArtifactTable',
            '@type': 'aldkg:Array',
            resultsScope: 'rm:Artifacts_Coll',
            options: {
              draggable: true,
              resizeableHeader: true,
              style: { height: '100%' },
              order: [
                'identifier',
                'title',
                '@type',
                'artifactFormat',
                'description',
                'xhtmlText',
                'modified',
                'modifiedBy',
                '@id',
                'assetFolder',
              ],
              identifier: {
                width: 140,
                sortable: true,
                formatter: 'link',
                editable: false,
                dataToFormatter: { link: '@id' },
              },
              title: {
                formatter: 'artifactTitle',
                dataToFormatter: { type: 'artifactFormat' },
              },
              '@type': {
                width: 140,
                formatter: 'dataFormatter',
                query: 'rm:ArtifactClasses_Coll',
              },
              artifactFormat: {
                formatter: 'dataFormatter',
                query: 'rm:ArtifactFormats_Coll',
              },
              description: {
                //formatter: 'tinyMCE',
                sortable: true,
              },
              xhtmlText: {
                formatter: 'tinyMCE',
                tinyWidth: 'emptySpace' /** emptySpace, content*/,
                width: 300,
              },
              modified: {
                width: 140,
                formatter: 'dateTime',
                sortable: true,
              },
              modifiedBy: {
                formatter: 'dataFormatter',
                query: 'rm:Users_Coll',
                key: 'name',
              },
              '@id': {
                width: 220,
              },
              assetFolder: {
                formatter: 'dataFormatter',
                query: 'rm:Folders_Coll',
              },
              //creator: {
              //  formatter: 'userName',
              //},
              //created: {
              //  width: 140,
              //  formatter: 'dateTime',
              //},
            },
          },
        ],
      },
    ],
  },
];

const viewDescrs = [
  {
    '@id': 'rm:CollectionViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'rm:CollectionViewKind',
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
  title: 'Table/Remote Artifacts Collection',
  component: Form,
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta;

const Template: Story = (args: any) => {
  const antdRenderers: RendererRegistryEntry[] = [...antdControlRenderers, ...antdLayoutRenderers, ...tableRenderers];

  const client = new SparqlClientImpl('http://localhost:8181/rdf4j-server');
  const rootStore = createUiModelFromState('reqs2', client, rootModelInitialState, additionalColls);
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

export const RemoteData = Template.bind({});
RemoteData.args = {};
