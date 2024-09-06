/********************************************************************************
 * Copyright (c) 2024 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { cloneDeep } from 'lodash-es';
import { JsObject, rootModelInitialState } from '@agentlab/sparql-jsld-client';

import { TFormMstRepositorySnapshotIn, TMstViewDescrSnapshotIn, TMstViewKindSnapshotIn } from '../src';
import { enUS } from '../src/locale/en_US';

export const noCollsFormModelState: TFormMstRepositorySnapshotIn = {
  rep: {
    ...rootModelInitialState,
    ns: {
      current: {
        ...rootModelInitialState.ns.current,
        owl: 'http://www.w3.org/2002/07/owl#',
        sh: 'http://www.w3.org/ns/shacl#',
        //shsh: 'http://www.w3.org/ns/shacl-shacl#',

        schema: 'http://schema.org/',
        dcterms: 'http://purl.org/dc/terms/',
        foaf: 'http://xmlns.com/foaf/0.1/',

        oslc: 'http://open-services.net/ns/core#',
        oslc_asset: 'http://open-services.net/ns/asset#',
        oslc_rm: 'http://open-services.net/ns/rm#',

        ppo: 'http://vocab.deri.ie/ppo#',
        pporoles: 'https://agentlab.eu/ns/rm/ppo-roles#',

        nav: 'https://agentlab.eu/ns/rm/navigation#',
        rm: 'https://agentlab.eu/ns/rm/rdf#',
        rmUserTypes: 'https://agentlab.eu/ns/rm/user-types#',
        clss: 'https://agentlab.eu/ns/rm/classifier#',

        users: 'https://agentlab.eu/ns/rm/users#',
        projects: 'https://agentlab.eu/ns/rm/projects#',
        folders: 'https://agentlab.eu/ns/rm/folders#',
        reqs: 'https://agentlab.eu/ns/rm/reqs#',
        aldkg: 'https://agentlab.eu/ns/ldkg#',
      },
    },
  },
  locale: enUS,
  editingData: {},
  selectedData: {},
};

export const emptyCollsModelState: TFormMstRepositorySnapshotIn = cloneDeep(noCollsFormModelState);
emptyCollsModelState.rep.colls = {
  'aldkg:ViewKinds_Coll': {
    '@id': 'aldkg:ViewKinds_Coll',
    collConstr: {
      '@id': 'aldkg:ViewKinds_Coll',
      entConstrs: [
        {
          '@id': 'aldkg:ViewKinds_EntConstr0',
          schema: 'aldkg:ViewKindShape',
          conditions: {},
          data: {},
        },
      ],
    },
    dataIntrnl: [],
    updPeriod: 300,
    lazy: true,
    lastSynced: 1723761063346,
    isLoading: false,
    pageSize: 500,
    resolveCollConstrs: false,
  },
  'aldkg:Views_Coll': {
    '@id': 'aldkg:Views_Coll',
    collConstr: {
      '@id': 'aldkg:Views_Coll',
      entConstrs: [
        {
          '@id': 'aldkg:Views_EntConstr0',
          schema: 'aldkg:ViewShape',
          conditions: {},
          data: {},
        },
      ],
    },
    dataIntrnl: [],
    updPeriod: 300,
    lazy: true,
    lastSynced: 1723761063346,
    isLoading: false,
    pageSize: 500,
    resolveCollConstrs: false,
  },
  'rm:Artifacts_Coll': {
    '@id': 'rm:Artifacts_Coll',
    collConstr: 'rm:Artifacts_Coll',
    dataIntrnl: [],
    updPeriod: 300,
    lazy: true,
    lastSynced: 1723761063624,
    isLoading: false,
    pageSize: 500,
    resolveCollConstrs: false,
  },
};

export const viewKindArtifactsWithNoElements: TMstViewKindSnapshotIn = {
  '@id': 'rm:FormViewKind',
  '@type': 'aldkg:ViewKind',
  title: 'Small Form',
  description: 'Small form',
  // Query
  collsConstrs: [
    {
      '@id': 'rm:Artifacts_Coll',
      '@type': 'aldkg:CollConstr',
      entConstrs: [
        {
          '@id': 'rm:Artifacts_Coll_Ent',
          '@type': 'aldkg:EntConstr',
          schema: 'rm:ArtifactShape',
        },
      ],
    },
  ],
  // child ui elements configs
  elements: [],
};

export const viewDescrArtifactsWithNoElements: TMstViewDescrSnapshotIn = {
  '@id': 'rm:FormViewDescr',
  '@type': 'aldkg:ViewDescr',
  viewKind: 'rm:FormViewKind',
  title: 'FormViewDescr',
  description: 'FormViewDescr',
  collsConstrs: [],
  // child ui elements configs
  elements: [],
};

export const testDataCollectionArtifacts: JsObject[] = [
  {
    '@id': 'reqs:collect1',
    '@type': 'rm:Artifact', //clss:Document
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Collection',
    identifier: 20000,
    title: 'Requirement Collection 20000',
    description: 'Requirement Collection 20000 Description',
    creator: 'users:user1',
    created: '2017-02-22T15:58:30.675Z',
    modifiedBy: 'users:user1',
    modified: '2019-01-16T13:21:08.720Z',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_collection',
  },
  {
    '@id': 'reqs:req1',
    '@type': 'rm:Artifact', //clss:Info
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    identifier: 20001,
    title: 'Collection 20000 - Req 20001 - Title',
    xhtmlText:
      '<div xmlns="http://www.w3.org/1999/xhtml"><h1 style="text-align: center;">Collection 20000 - Req 20001 - Main Text</h1></div>',
    creator: 'users:user1',
    created: '2017-02-22T15:58:30.675Z',
    modifiedBy: 'users:user1',
    modified: '2019-01-16T13:21:08.720Z',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_collection',
  },
  {
    '@id': 'reqs:req2',
    '@type': 'rm:Artifact', //clss:Info
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    identifier: 20002,
    title: 'Collection 20000 - Req 20002 - Title',
    xhtmlText:
      '<div xmlns="http://www.w3.org/1999/xhtml"><h1 style="text-align: center;">Collection 20000 - Req 20002 - Main Text</h1></div>',
    creator: 'users:user1',
    created: '2017-02-22T15:58:30.675Z',
    modifiedBy: 'users:user1',
    modified: '2019-01-16T13:21:08.720Z',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_collection',
  },
  {
    '@id': 'reqs:req3',
    '@type': 'rm:Artifact', //clss:Info
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    identifier: 20003,
    title: 'Collection 20000 - Req 20003 - Title',
    xhtmlText:
      '<div xmlns="http://www.w3.org/1999/xhtml"><h1 style="text-align: center;">Collection 20000 - Req 20003 - Main Text</h1></div>',
    creator: 'users:user1',
    created: '2017-02-22T15:58:30.675Z',
    modifiedBy: 'users:user1',
    modified: '2019-01-16T13:21:08.720Z',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_collection',
  },
];

export const testDataModuleArtifacts = [
  {
    '@id': 'file:///myfile.xml',
    '@type': 'rm:Artifact', //clss:Classifier
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Module',
    identifier: 30000,
    title: 'Requirement Module 30000 Title',
    description: 'Requirement Module 30000 Description',
    creator: 'users:user1',
    created: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:user1',
    modified: '2014-02-10T10:12:16.000Z',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_module',
  },
  {
    '@id': 'clss:_tHAikozUEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact', //clss:Grouping
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    identifier: 30001,
    title: 'Requirement Module 30000 - Grouping 30001 Title',
    xhtmlText: 'Requirement Module 30000 - Grouping 30001 Text',
    creator: 'users:user1',
    created: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:user1',
    modified: '2014-02-10T10:12:16.000Z',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_module',
  },
  {
    '@id': 'clss:_zYXy8ozUEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact', //clss:Grouping
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    identifier: 30002,
    title: 'Requirement Module 30000 - Grouping 30002 Title',
    xhtmlText: 'Requirement Module 30000 - Grouping 30002 Text',
    creator: 'users:user1',
    created: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:user1',
    modified: '2014-02-10T10:12:16.000Z',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_module',
  },
  {
    '@id': 'clss:_3AP4kYzUEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact', //clss:Grouping
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    identifier: 30003,
    title: 'Requirement Module 30000 - Grouping 30003 Title',
    xhtmlText: 'Requirement Module 30000 - Grouping 30003 Text',
    modifiedBy: 'users:user1',
    modified: '2014-02-10T10:12:16.000Z',
    creator: 'users:user1',
    created: '2014-02-10T10:12:16.000Z',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_module',
  },
  {
    '@id': 'clss:_HmFCYozVEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact', //clss:Grouping
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    identifier: 30004,
    title: 'Requirement Module 30000 - Grouping 30004 Title',
    xhtmlText: 'Requirement Module 30000 - Grouping 30004 Text',
    creator: 'users:user1',
    created: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:user1',
    modified: '2014-02-10T10:12:16.000Z',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_module',
  },
  {
    '@id': 'clss:_L8Lf8YzVEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact', //clss:Grouping
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    identifier: 30005,
    title: 'Requirement Module 30000 - Grouping 30005 Title',
    xhtmlText: 'Requirement Module 30000 - Grouping 30005 Text',
    creator: 'users:user1',
    created: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:user1',
    modified: '2014-02-10T10:12:16.000Z',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_module',
  },
  {
    '@id': 'clss:_RxREAYzVEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact', //clss:Grouping
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    identifier: 30006,
    title: 'Requirement Module 30000 - Grouping 30006 Title',
    xhtmlText: 'Requirement Module 30000 - Grouping 30006 Text',
    creator: 'users:user1',
    created: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:user1',
    modified: '2014-02-10T10:12:16.000Z',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_module',
  },
  {
    '@id': 'clss:_TSp-QYzVEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact', //clss:Classifier
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    identifier: 30007,
    title: 'Requirement Module 30000 - Grouping 30007 Title',
    xhtmlText: 'Requirement Module 30000 - Grouping 30007 Text',
    creator: 'users:user1',
    created: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:user1',
    modified: '2014-02-10T10:12:16.000Z',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_module',
  },
  {
    '@id': 'clss:_OG314ozVEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact', //clss:Classifier
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    identifier: 30008,
    title: 'Requirement Module 30000 - Grouping 30008 Title',
    xhtmlText: 'Requirement Module 30000 - Grouping 30008 Text',
    creator: 'users:user1',
    created: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:user1',
    modified: '2014-02-10T10:12:16.000Z',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_module',
  },
  {
    '@id': 'clss:_Jdny0YzVEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact', //clss:Classifier
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    identifier: 30009,
    title: 'Requirement Module 30000 - Grouping 30009 Title',
    xhtmlText: 'Requirement Module 30000 - Grouping 30009 Text',
    creator: 'users:user1',
    created: '2014-02-10T10:12:16.000Z',
    modified: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:user1',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_module',
  },
  {
    '@id': 'clss:_Ep8ocYzVEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact', //clss:Classifier
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    identifier: 30010,
    title: 'Requirement Module 30000 - Grouping 30010 Title',
    xhtmlText: 'Requirement Module 30000 - Grouping 30010 Text',
    creator: 'users:user1',
    created: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:user1',
    modified: '2014-02-10T10:12:16.000Z',
    processArea: 'projects:defaultProject',
    assetFolder: 'folders:samples_module',
  },
];

export const testDataFolders = [
  {
    key: 'folders:root',
    '@id': 'folders:root',
    '@type': 'nav:folder',
    title: 'Requirement Project -- Root Folder -- Level 1',
    description: 'Requirement Project Description',
    children: [],
    creator: 'users:user1',
    created: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:user1',
    modified: '2019-01-16T13:21:08.720Z',
    processArea: 'projects:defaultProject',
  },
  {
    key: 'folders:imported',
    '@id': 'folders:imported',
    '@type': 'nav:folder',
    title: 'Imported from documents -- Level 2',
    description: 'Default folder for requirements, imported from documents',
    parent: 'folders:root',
    children: [],
    creator: 'users:user1',
    created: '2019-05-29T13:21:08.720Z',
    modifiedBy: 'users:user1',
    modified: '2019-05-29T13:21:08.720Z',
    processArea: 'projects:defaultProject',
  },
  {
    key: 'folders:samples',
    '@id': 'folders:samples',
    '@type': 'nav:folder',
    title: 'Examples -- Level 2',
    description: 'Examples, uploaded from files',
    parent: 'folders:root',
    children: [],
    creator: 'users:user4',
    created: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:user4',
    modified: '2019-01-16T13:21:08.720Z',
    processArea: 'projects:defaultProject',
  },
  {
    key: 'folders:samples_module',
    '@id': 'folders:samples_module',
    '@type': 'nav:folder',
    title: 'Module Example  -- Level 3',
    description: 'Module example, uploaded from file',
    parent: 'folders:samples',
    children: [],
    creator: 'users:user3',
    created: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:user3',
    modified: '2019-01-16T13:21:08.720Z',
    processArea: 'projects:defaultProject',
  },
  {
    key: 'folders:samples_collection',
    '@id': 'folders:samples_collection',
    '@type': 'nav:folder',
    title: 'Collection Example -- Level 3',
    description: 'Collection example, uploaded from file',
    parent: 'folders:samples',
    children: [],
    creator: 'users:user3',
    created: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:user3',
    modified: '2019-01-16T13:21:08.720Z',
    processArea: 'projects:defaultProject',
  },
  {
    key: 'folders:folder1',
    '@id': 'folders:folder1',
    '@type': 'nav:folder',
    title: 'Folder1 -- Level 2',
    description: 'Folder1',
    parent: 'folders:root',
    children: [],
    creator: 'users:user4',
    created: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:user4',
    modified: '2019-01-16T13:21:08.720Z',
    processArea: 'projects:defaultProject',
  },
  {
    key: 'folders:folder2',
    '@id': 'folders:folder2',
    '@type': 'nav:folder',
    title: 'Folder2 -- Level 2',
    description: 'Folder2',
    children: [],
    creator: 'users:user2',
    created: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:user2',
    modified: '2019-01-16T13:21:08.720Z',
    parent: 'folders:root',
    processArea: 'projects:defaultProject',
  },
  {
    key: 'folders:folder1_1',
    '@id': 'folders:folder1_1',
    '@type': 'nav:folder',
    title: 'Folder1_1 -- Level 3',
    description: 'Folder1_1',
    parent: 'folders:folder1',
    children: [],
    creator: 'users:user3',
    created: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:user3',
    modified: '2019-01-16T13:21:08.720Z',
    processArea: 'projects:defaultProject',
  },
];
