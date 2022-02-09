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
import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import { rootModelInitialState, CollState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';
import {
  antdCells,
  antdControlRenderers,
  antdDataControlRenderers,
  antdLayoutRenderers,
  createUiModelFromState,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
  viewKindCollConstr,
  viewDescrCollConstr,
} from '../src';

import { tableRenderers } from '../src';

export default {
  title: 'Several Controls/QueryTreeTableArtifacts',
  component: Form,
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta;

const Template: Story = (args: any) => {
  const antdRenderers: RendererRegistryEntry[] = [
    ...antdControlRenderers,
    ...antdLayoutRenderers,
    ...antdDataControlRenderers,
    ...tableRenderers,
  ];

  const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
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

const viewKinds = [
  {
    '@id': 'rm:ProjectViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'Project View',
    description: 'Project View',
    collsConstrs: [
      {
        '@id': 'rm:Artifacts_Coll',
        '@type': 'aldkg:CollConst',
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
        //orderBy: [{ expression: variable('identifier0'), descending: false }],
        //limit: 50,
      },
      {
        '@id': 'rm:Folders_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:Folders_Coll_Ent',
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
    ],
    elements: [
      {
        '@id': 'rm:_934jHd67',
        '@type': 'aldkg:VerticalLayout',
        options: {
          style: {
            height: '100%',
          },
        },
        elements: [
          {
            '@id': 'rm:_485Jdf7',
            '@type': 'aldkg:VerticalLayout',
            elements: [
              {
                '@id': 'rm:_23fJd7',
                '@type': 'aldkg:VerticalLayout',
                options: {
                  justify: 'start', // start end center space-between space-around
                  contentSize: true,
                  style: {
                    flexGrow: '5',
                  },
                },
                elements: [
                  {
                    '@id': 'rm:_903Fds1',
                    '@type': 'aldkg:TabControl',
                    // by this resultsScope TabControl could have read access to the results, selected by Query with @id='rm:ProjectViewClass_ArtifactFormats_Query'
                    resultsScope: 'rm:ArtifactFormats_Coll', // bind to results data by query @id
                    tabs: [
                      {
                        '@id': 'mktp:_4eos3',
                        '@type': 'aldkg:Tab',
                        title: 'Все',
                        value: undefined,
                        rank: 0,
                      },
                    ],
                    options: {
                      title: 'Требования',
                      style: {
                        margin: '0 0 0 24px',
                      },
                      contentSize: true,
                      // by this connection TabControl could have read/write access to the property 'artifactFormat' in condition object with @id='rm:ProjectViewClass_Artifacts_Query_Shape0_Condition'
                      connections: [
                        {
                          toObj: 'rm:Artifacts_Coll_Cond',
                          toProp: 'artifactFormat',
                        },
                      ],
                    },
                  },
                ],
              },
              /*{
                '@type': 'aldkg:VerticalLayout',
                options: {
                  contentSize: true,
                  justify: 'end',
                },
                elements: [
                  {
                    '@type': 'aldkg:Button',
                    options: {
                      contentSize: true,
                      icon: 'sync',
                    },
                  },
                  {
                    '@type': 'aldkg:MenuControl',
                    resultsScope: 'rm:Artifacts_Coll',
                    options: {
                      contentSize: true,
                      style: {
                        margin: '0 24px 0 5px',
                      },
                    },
                    elements: [
                      {
                        '@id': 'attr-types-and-links-settings',
                        '@type': 'aldkg:View',
                        resultsScope: 'rm:dataModelView',
                        options: {
                          height: 'all-empty-space',
                          modal: true,
                        },
                      },
                    ],
                  },
                ],
              },*/
            ],
          },
          {
            '@id': 'rm:QueryComponent',
            '@type': 'aldkg:Query',
            resultsScope: 'rm:Artifacts_Coll', // bind to json-ld object by '@id'
            options: {
              style: {
                margin: '0 0 0 16px',
              },
            },
          },
          {
            '@id': 'rm:_we34U8',
            '@type': 'aldkg:SplitPaneLayout',
            options: {
              grow: '1',
              width: '100%',
              style: {
                width: '100%',
                height: '100%',
              },
              collapseDirection: 'left',
              initialSizes: [17, 83],
            },
            elements: [
              {
                '@id': 'rm:_901hHft',
                '@type': 'aldkg:DataControl',
                resultsScope: 'rm:Folders_Coll',
                options: {
                  renderType: 'tree',
                  connections: [
                    {
                      //from: 'selector', // inner UI component variable name in case it has several variables? e.g. drag, moveX/moveY, width/height?
                      toObj: 'rm:Artifacts_Coll_Cond',
                      toProp: 'assetFolder',
                      fromProp: '@id',
                    },
                  ],
                },
              },
              {
                '@id': 'rm:ArtifactTable',
                '@type': 'aldkg:Array',
                resultsScope: 'rm:Artifacts_Coll',
                options: {
                  draggable: true,
                  resizeableHeader: true,
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
                    dataToFormatter: {
                      link: '@id',
                    },
                  },
                  title: {
                    formatter: 'artifactTitle',
                    dataToFormatter: {
                      type: 'artifactFormat',
                    },
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
                    tinyWidth: 'emptySpace', // emptySpace, content,
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
    ],
  },
];

const viewDescrs = [
  {
    '@id': 'rm:ProjectViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'rm:ProjectViewKind',
    title: 'Project View',
    description: 'Project View',
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

export const RemoteData = Template.bind({});
RemoteData.args = {};
