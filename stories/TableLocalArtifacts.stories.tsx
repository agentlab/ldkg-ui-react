/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import { SparqlClientImpl, MstRepository, rootModelInitialState } from '@agentlab/sparql-jsld-client';

import { artifactSchema } from '../test/schema/TestSchemas';
import { BaseTableControl } from '../src/table/BaseTableControl';

import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
  MstContextProvider,
  RendererRegistryEntry,
  tableRenderers,
} from '../src';

const fakeData = [
  {
    '@id': 'reqs:collect1',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Collection',
    assetFolder: 'folders:samples_collection',
    created: '2017-02-22T15:58:30.675Z',
    creator: 'users:amivanoff',
    description: 'Набор требований',
    identifier: 20000,
    modified: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: 'Набор требований',
    _id: 0,
  },
  {
    '@id': 'reqs:req1',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    assetFolder: 'folders:samples_collection',
    created: '2017-02-22T15:58:30.675Z',
    creator: 'users:amivanoff',
    identifier: 20001,
    modified: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: 'ОПИСАНИЕ БЛАНКА ПАСПОРТА ГРАЖДАНИНА РОССИЙСКОЙ ФЕДЕРАЦИИ',
    xhtmlText:
      '<div xmlns="http://www.w3.org/1999/xhtml"><h1 style="text-align: center;">	ОПИСАНИЕ<br></br>	БЛАНКА ПАСПОРТА ГРАЖДАНИНА РОССИЙСКОЙ ФЕДЕРАЦИИ<br></br></h1><p id="_1346242622491" style="text-align: center;">	<br></br>	(в ред. Постановлений Правительства РФ от 25.09.99 N 1091, от 22.01.2002 N 32, от 02.07.2003 N 392, от 20.12.2006 N 779)<br></br></p></div>',
    _id: 1,
  },
  {
    '@id': 'reqs:req2',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    assetFolder: 'folders:samples_collection',
    created: '2017-02-22T15:58:30.675Z',
    creator: 'users:amivanoff',
    identifier: 20002,
    modified: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: '	1. Бланк паспорта гражданина Российской Федерации (далее именуется - бланк паспорта) изготавливается...',
    xhtmlText:
      '<div xmlns="http://www.w3.org/1999/xhtml"><p>	1. Бланк паспорта гражданина Российской Федерации (далее именуется - бланк паспорта) изготавливается по единому образцу с указанием всех реквизитов на русском языке.<br></br>	Бланки паспорта, предназначенные для оформления в республиках, находящихся в составе Российской Федерации (далее именуются - республики), могут изготавливаться с дублированием текста реквизитов на пятой, шестой, седьмой, тринадцатой, четырнадцатой и семнадцатой страницах также на государственном языке (языках) этих республик (далее именуется - язык (языки) республики).<br></br>	(в ред. Постановления Правительства РФ от 25.09.99 N 1091)<br></br>	2. Бланк паспорта имеет размер 88 х 125 мм, состоит из обложки, приклеенных к обложке форзацев и содержит 20 страниц, из них 14 страниц имеют нумерацию в орнаментальном оформлении, продублированную в центре страницы в фоновой сетке.<br></br>	Бланк паспорта сшит по всей длине корешка двухцветной нитью с пунктирным свечением в ультрафиолетовом излучении.<br></br>	Бланк паспорта и вкладыш изготавливаются с использованием специальной бумаги, содержащей 3 вида защитных волокон.</p></div>',
    _id: 2,
  },
  {
    '@id': 'reqs:req3',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    assetFolder: 'folders:samples_collection',
    created: '2017-02-22T15:58:30.675Z',
    creator: 'users:amivanoff',
    identifier: 20003,
    modified: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: '	1. Бланк паспорта гражданина Российской Федерации (далее именуется - бланк паспорта) изготавливается...',
    xhtmlText:
      '<div xmlns="http://www.w3.org/1999/xhtml"><p>	1. Бланк паспорта гражданина Российской Федерации (далее именуется - бланк паспорта) изготавливается по единому образцу с указанием всех реквизитов на русском языке.<br></br>	Бланки паспорта, предназначенные для оформления в республиках, находящихся в составе Российской Федерации (далее именуются - республики), могут изготавливаться с дублированием текста реквизитов на пятой, шестой, седьмой, тринадцатой, четырнадцатой и семнадцатой страницах также на государственном языке (языках) этих республик (далее именуется - язык (языки) республики).<br></br>	(в ред. Постановления Правительства РФ от 25.09.99 N 1091)<br></br>	2. Бланк паспорта имеет размер 88 х 125 мм, состоит из обложки, приклеенных к обложке форзацев и содержит 20 страниц, из них 14 страниц имеют нумерацию в орнаментальном оформлении, продублированную в центре страницы в фоновой сетке.<br></br>	Бланк паспорта сшит по всей длине корешка двухцветной нитью с пунктирным свечением в ультрафиолетовом излучении.<br></br>	Бланк паспорта и вкладыш изготавливаются с использованием специальной бумаги, содержащей 3 вида защитных волокон.</p></div>',
    _id: 3,
  },
  {
    '@id': 'file:///urn-s2-iisvvt-infosystems-classifier-45950.xml',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Module',
    assetFolder: 'folders:samples_module',
    created: '2014-02-10T10:12:16.000Z',
    creator: 'users:amivanoff',
    description: 'ТН ВЭД ТС',
    identifier: 30000,
    modified: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: 'ТН ВЭД ТС',
    _id: 4,
  },
  {
    '@id': 'cpgu:///_tHAikozUEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    assetFolder: 'folders:samples_module',
    created: '2014-02-10T10:12:16.000Z',
    creator: 'users:amivanoff',
    identifier: 30001,
    modified: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: 'ТН ВЭД ТС',
    xhtmlText: 'ТН ВЭД ТС',
    _id: 5,
  },
  {
    '@id': 'cpgu:///_zYXy8ozUEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    assetFolder: 'folders:samples_module',
    created: '2014-02-10T10:12:16.000Z',
    creator: 'users:amivanoff',
    identifier: 30002,
    modified: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: 'Наименование раздела',
    xhtmlText: 'Наименование раздела',
    _id: 6,
  },
  {
    '@id': 'cpgu:///_3AP4kYzUEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    assetFolder: 'folders:samples_module',
    created: '2014-02-10T10:12:16.000Z',
    creator: 'users:amivanoff',
    identifier: 30003,
    modified: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: 'Код товарной группы',
    xhtmlText: 'Код товарной группы',
    _id: 7,
  },
  {
    '@id': 'cpgu:///_HmFCYozVEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    assetFolder: 'folders:samples_module',
    created: '2014-02-10T10:12:16.000Z',
    creator: 'users:amivanoff',
    identifier: 30004,
    modified: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: 'Код товарной позиции',
    xhtmlText: 'Код товарной позиции',
    _id: 8,
  },
  {
    '@id': 'cpgu:///_L8Lf8YzVEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    assetFolder: 'folders:samples_module',
    created: '2014-02-10T10:12:16.000Z',
    creator: 'users:amivanoff',
    identifier: 30005,
    modified: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: 'Код товарной субпозиции',
    xhtmlText: 'Код товарной субпозиции',
    _id: 9,
  },
  {
    '@id': 'cpgu:///_RxREAYzVEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    assetFolder: 'folders:samples_module',
    created: '2014-02-10T10:12:16.000Z',
    creator: 'users:amivanoff',
    identifier: 30006,
    modified: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: 'Код товара',
    xhtmlText: 'Код товара',
    _id: 10,
  },
  {
    '@id': 'cpgu:///_TSp-QYzVEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    assetFolder: 'folders:samples_module',
    created: '2014-02-10T10:12:16.000Z',
    creator: 'users:amivanoff',
    identifier: 30007,
    modified: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: 'Наименование товара',
    xhtmlText: 'Наименование товара',
    _id: 11,
  },
  {
    '@id': 'cpgu:///_OG314ozVEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    assetFolder: 'folders:samples_module',
    created: '2014-02-10T10:12:16.000Z',
    creator: 'users:amivanoff',
    identifier: 30008,
    modified: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: 'Наименование товарной субпозиции',
    xhtmlText: 'Наименование товарной субпозиции',
    _id: 12,
  },
  {
    '@id': 'cpgu:///_Jdny0YzVEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    assetFolder: 'folders:samples_module',
    created: '2014-02-10T10:12:16.000Z',
    creator: 'users:amivanoff',
    identifier: 30009,
    modified: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: 'Наименование товарной позиции',
    xhtmlText: 'Наименование товарной позиции',
    _id: 13,
  },
  {
    '@id': 'cpgu:///_Ep8ocYzVEeOiy8owVBW5pQ',
    '@type': 'rm:Artifact',
    artifactFormat: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text',
    assetFolder: 'folders:samples_module',
    created: '2014-02-10T10:12:16.000Z',
    creator: 'users:amivanoff',
    identifier: 30010,
    modified: '2014-02-10T10:12:16.000Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: 'Наименование товарной позиции',
    xhtmlText: 'Наименование товарной позиции',
    _id: 14,
  },
];

export default {
  title: 'Table/LocalArtifacts',
  component: BaseTableControl,
} as Meta;

const Template: Story = (args: any) => {
  const antdRenderers: RendererRegistryEntry[] = [...antdControlRenderers, ...antdLayoutRenderers, ...tableRenderers];

  const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
  //@ts-ignore
  const rootStore = MstRepository.create(rootModelInitialState, { client });
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <div style={{ height: 'calc(100vh - 32px)' }}>
      <Provider store={store}>
        <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
          <BaseTableControl
            schema={artifactSchema}
            path=''
            data={fakeData}
            options={{
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
                dataToFormatter: { link: '@id' },
              },
              title: {
                formatter: 'artifactTitle',
                dataToFormatter: { type: 'artifactFormat' },
              },
              '@type': {
                width: 140,
                //formatter: 'dataFormatter',
                //query: 'rm:ProjectViewClass_ArtifactClasses_Query',
                formatter: 'link',
              },
              artifactFormat: {
                //formatter: 'dataFormatter',
                //query: 'rm:ProjectViewClass_ArtifactFormats_Query',
                formatter: 'link',
              },
              description: {
                //formatter: 'tinyMCE',
                sortable: true,
              },
              xhtmlText: {
                formatter: 'tinyMCE',
                tinyWidth: 'emptySpace', // emptySpace, content
                width: 300,
              },
              modified: {
                width: 140,
                formatter: 'dateTime',
                sortable: true,
              },
              modifiedBy: {
                //formatter: 'dataFormatter',
                //query: 'rm:ProjectViewClass_Users_Query',
                //key: 'name',
                formatter: 'link',
              },
              '@id': {
                width: 220,
              },
              assetFolder: {
                //formatter: 'dataFormatter',
                //query: 'rm:ProjectViewClass_Folders_Query',
                formatter: 'link',
              },
            }}
          />
        </MstContextProvider>
      </Provider>
    </div>
  );
};

export const LocalData = Template.bind({});
LocalData.args = {};
