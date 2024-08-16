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
import { Meta, StoryObj } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import * as remotedev from 'remotedev';
import { factory, CollState, rootModelInitialState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';
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

export default {
  title: 'Table/Remote Artifacts Module',
  component: Form,
  render: (args: any) => {
    const antdRenderers: RendererRegistryEntry[] = [...antdControlRenderers, ...antdLayoutRenderers, ...tableRenderers];
    const client = new SparqlClientImpl('http://localhost:8181/rdf4j-server');
    const rootStore = createUiModelFromState('reqs2', client, rootModelInitialState, additionalColls);
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
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta<typeof Form>;

type Story = StoryObj<any>; // StoryObj<typeof Form>;

const viewKinds = [
  {
    '@id': 'rm:ModuleViewViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'Набор',
    description: 'Big TreeTable View',
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
        '@id': 'rm:ModuleArtifacts_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:UsedInModuleLink_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'rmUserTypes:UsedInModuleShape',
            conditions: {
              '@id': 'rmUserTypes:my_link',
              '@type': 'aldkg:Condition',
              object: 'file:///urn-s2-iisvvt-infosystems-classifier-45950.xml',
              subject: '?eIri1',
              parentBinding: 'file:///urn-s2-iisvvt-infosystems-classifier-45950.xml',
            },
          },
          {
            '@id': 'rm:ModuleArtifacts_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'rm:ArtifactShape',
            /*schema: {
              $schema: 'http://json-schema.org/draft-07/schema#',
              //$id: 'rm:Artifact',
              '@id': 'rm:ArtifactShape',
              '@type': 'sh:NodeShape',
              title: 'Требование',
              description: 'Тип ресурса',
              targetClass: 'rm:Artifact',
              type: 'object',
              '@context': {
                '@type': 'rdf:type',
                identifier: {
                  '@id': 'dcterms:identifier',
                  '@type': 'xsd:integer',
                },
                modifiedBy: {
                  '@id': 'oslc:modifiedBy',
                  '@type': 'pporoles:User',
                },
                modified: {
                  '@id': 'dcterms:modified',
                  '@type': 'xsd:dateTime',
                },
                xhtmlText: {
                  '@id': 'rm:xhtmlText',
                  '@type': 'xsd:string', //'rdf:HTML',
                },
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
                identifier: {
                  title: 'Идентификатор',
                  description: 'Числовой идентификатор требования, уникальный только в пределах этой системы',
                  type: 'integer',
                  shapeModifiability: 'system',
                  //valueModifiability: 'system',
                },
                modifiedBy: {
                  title: 'Кем изменен',
                  description: 'Пользователь, изменивший требование',
                  type: 'string',
                  format: 'iri',
                  shapeModifiability: 'system',
                  //valueModifiability: 'system',
                },
                modified: {
                  title: 'Когда изменен',
                  description: 'Когда требование было изменено',
                  type: 'string',
                  format: 'date-time',
                  shapeModifiability: 'system',
                  //valueModifiability: 'system',
                },
                xhtmlText: {
                  title: 'Форматированный текст',
                  type: 'string',
                  //contentMediaType: 'text/html',
                  shapeModifiability: 'system',
                },
                hasChild: {
                  title: 'Имеет потомков',
                  description: 'Имеет потомков',
                  type: 'boolean',
                  shapeModifiability: 'system',
                },
              },
              required: ['@id', '@type', 'title', 'hasChild'],
            },
            conditions: {
              '@id': 'rm:ModuleArtifacts_Coll_Cond',
              '@type': 'aldkg:Condition',
              // context-less property calculated by EXISTS function
              hasChild: {
                bind: {
                  relation: 'exists',
                  triples: [
                    triple(
                      factory.variable('eIri2'),
                      namedNode('http://cpgu.kbpm.ru/ns/rm/user-types#parentBinding'),
                      factory.variable('eIri1'),
                    ),
                  ],
                },
              },
            },*/
          },
        ],
        orderBy: [{ expression: factory.variable('identifier0'), descending: false }],
        limit: 500,
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
            '@id': 'ModuleTable',
            '@type': 'aldkg:Array',
            resultsScope: 'rm:ModuleArtifacts_Coll',
            options: {
              draggable: true,
              resizeableHeader: true,
              style: { height: '100%' },
              //expandColumnKey: 'xhtmlText',
              order: ['identifier', 'xhtmlText', 'modified', 'modifiedBy', 'title'],
              identifier: {
                width: 140,
                sortable: true,
                formatter: 'link',
                editable: false,
                dataToFormatter: { link: '@id' },
              },
              title: {
                width: 140,
                //formatter: 'artifactTitle',
                //dataToFormatter: { type: 'artifactFormat' },
              },
              //'@type': {
              //  width: 140,
              //  formatter: 'dataFormatter',
              //  query: 'rm:ArtifactClasses_Coll',
              //},
              //artifactFormat: {
              //  formatter: 'dataFormatter',
              //  query: 'rm:ArtifactFormats_Coll',
              //},
              //description: {
              //  //formatter: 'tinyMCE',
              //  sortable: true,
              //},
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
              //'@id': {
              //  width: 220,
              //},
              //assetFolder: {
              //  formatter: 'dataFormatter',
              //  query: 'rm:Folders_Coll',
              //},
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
    '@id': 'rm:ModuleViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'rm:ModuleViewViewKind',
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

export const RemoteData: Story = {};
