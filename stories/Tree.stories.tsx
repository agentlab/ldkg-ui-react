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
import { Meta, StoryObj } from '@storybook/react';

import { AntdDataLayout } from '../src/data-controls/DataControl';

import { artifactSchema } from '../test/schema/TestSchemas';
import { testDataFolders } from './TestData';

export default {
  title: 'Simple Controls/Tree',
  component: AntdDataLayout,
  render: (args: any) => (
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
        dataSource={testDataFolders}
      />
    </div>
  ),
} as Meta<typeof AntdDataLayout>;

type Story = StoryObj<any>; // StoryObj<typeof Form>;

export const Empty: Story = {};
