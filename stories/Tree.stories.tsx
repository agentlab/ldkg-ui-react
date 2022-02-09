/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { AntdDataLayout } from '../src/data-controls/DataControl';
import { artifactSchema } from '../test/schema/TestSchemas';

const data = [
  {
    '@id': 'folders:samples_module',
    '@type': 'nav:folder',
    children: [],
    created: '2019-01-16T13:21:08.720Z',
    creator: 'users:strenin',
    description: 'Загруженный из файла пример данных модуля',
    key: 'folders:samples_module',
    modified: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:strenin',
    parent: 'folders:samples',
    processArea: 'projects:gishbbProject',
    title: 'Пример модуля',
  },
  {
    '@id': 'folders:samples_collection',
    '@type': 'nav:folder',
    children: [],
    created: '2019-01-16T13:21:08.720Z',
    creator: 'users:strenin',
    description: 'Загруженный из файла пример данных набора',
    key: 'folders:samples_collection',
    modified: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:strenin',
    parent: 'folders:samples',
    processArea: 'projects:gishbbProject',
    title: 'Пример набора',
  },
  {
    '@id': 'folders:root',
    '@type': 'nav:folder',
    children: [],
    created: '2019-01-16T13:21:08.720Z',
    creator: 'users:amivanoff',
    description: 'Проект разработки требований к элементам ЕМД и пакетам обмена',
    key: 'folders:root',
    modified: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:amivanoff',
    processArea: 'projects:gishbbProject',
    title: 'Проект Требования ЕМД',
  },
  {
    '@id': 'folders:imported',
    '@type': 'nav:folder',
    children: [],
    created: '2019-05-29T13:21:08.720Z',
    creator: 'users:amivanoff',
    description: 'Папка по-умолчанию для импорта документов',
    key: 'folders:imported',
    modified: '2019-05-29T13:21:08.720Z',
    modifiedBy: 'users:amivanoff',
    parent: 'folders:root',
    processArea: 'projects:gishbbProject',
    title: 'Импортировано из документов',
  },
  {
    '@id': 'folders:samples',
    '@type': 'nav:folder',
    children: [],
    created: '2019-01-16T13:21:08.720Z',
    creator: 'users:dimonia',
    description: 'Загруженные из файлов примеры данных',
    key: 'folders:samples',
    modified: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:dimonia',
    parent: 'folders:root',
    processArea: 'projects:gishbbProject',
    title: 'Примеры',
  },
  {
    '@id': 'folders:folder1',
    '@type': 'nav:folder',
    children: [],
    created: '2019-01-16T13:21:08.720Z',
    creator: 'users:dimonia',
    description: 'Folder1',
    key: 'folders:folder1',
    modified: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:dimonia',
    parent: 'folders:root',
    processArea: 'projects:gishbbProject',
    title: 'Folder1',
  },
  {
    '@id': 'folders:folder2',
    '@type': 'nav:folder',
    children: [],
    created: '2019-01-16T13:21:08.720Z',
    creator: 'users:doshkalo',
    description: 'Folder2',
    key: 'folders:folder2',
    modified: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:doshkalo',
    parent: 'folders:root',
    processArea: 'projects:gishbbProject',
    title: 'Folder2',
  },
  {
    '@id': 'folders:folder1_1',
    '@type': 'nav:folder',
    children: [],
    created: '2019-01-16T13:21:08.720Z',
    creator: 'users:strenin',
    description: 'Folder1_1',
    key: 'folders:folder1_1',
    modified: '2019-01-16T13:21:08.720Z',
    modifiedBy: 'users:strenin',
    parent: 'folders:folder1',
    processArea: 'projects:gishbbProject',
    title: 'Folder1_1',
  },
];

export default {
  title: 'Controls/Tree',
  component: AntdDataLayout,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta;

export const Empty: Story<{}> = () => (
  <div style={{ height: '1000px' }}>
    <AntdDataLayout
      viewKindElement={{
        options: {
          renderType: 'tree',
        },
      }}
      schema={artifactSchema}
      viewKind={{} as any}
      id={'test'}
      enabled={true}
      dataSource={data}
    />
  </div>
);
