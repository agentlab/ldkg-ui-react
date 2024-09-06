/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { cloneDeep } from 'lodash-es';
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import {
  antdControlRenderers,
  antdLayoutRenderers,
  Form,
  TMstViewDescrSnapshotIn,
  TMstViewKindSnapshotIn,
} from '../src';
import { FormWithLocalStateDecorator, FormWrapper } from './FormWrappers';

import { artifactSchema } from '../test/schema/TestSchemas';
import {
  testDataCollectionArtifacts,
  viewDescrArtifactsWithNoElements,
  viewKindArtifactsWithNoElements,
} from './TestData';

export default {
  title: 'Local Single Control/Form',
  component: Form,
  parameters: {
    antdRenderers: [...antdControlRenderers, ...antdLayoutRenderers],
  },
  decorators: [FormWithLocalStateDecorator],
  render: (args: any) => <FormWrapper {...args} />,
} as Meta<typeof Form>;

type Story = StoryObj<any>; // StoryObj<typeof Form>;

const viewKind: TMstViewKindSnapshotIn = {
  ...cloneDeep(viewKindArtifactsWithNoElements),
  elements: [
    {
      '@id': 'rm:_21hd7f',
      '@type': 'aldkg:FormLayout',
      options: {
        readOnly: false,
      },
      elements: [
        {
          '@id': 'rm:_gdT67js',
          '@type': 'aldkg:Control',
          resultsScope: 'rm:Artifacts_Coll/identifier',
          options: {
            //ormatter: 'identifier',
          },
        },
        {
          '@id': 'rm:_83jYw63',
          '@type': 'aldkg:Control',
          resultsScope: 'rm:Artifacts_Coll/title',
          options: {
            formatter: 'artifactTitle',
          },
        },
        {
          '@id': 'rm:_934jHd67',
          '@type': 'aldkg:Control',
          resultsScope: 'rm:Artifacts_Coll/xhtmlText',
          options: {
            formatter: 'tinyMCE',
          },
          /*options: {
            validation: [
              {
                validator: 'RegExp',
                propsToValidator: {
                  regExp: 'bo*',
                },
                validateStatus: 'error',
                help: 'Working',
              },
            ],
          },*/
        },
        {
          '@id': 'rm:_17Gj78',
          '@type': 'aldkg:Control',
          resultsScope: 'rm:Artifacts_Coll/creator',
          options: {
            //formatter: 'link',
          },
        },
        {
          '@id': 'rm:_283jH88',
          '@type': 'aldkg:Control',
          resultsScope: 'rm:Artifacts_Coll/created',
          options: {
            formatter: 'dateTime',
          },
        },
        {
          '@id': 'rm:_297Hgf56',
          '@type': 'aldkg:Control',
          resultsScope: 'rm:Artifacts_Coll/assetFolder',
        },
      ],
    },
  ],
};

const viewDescr: TMstViewDescrSnapshotIn = cloneDeep(viewDescrArtifactsWithNoElements);

const readOnlyFormViewKind: TMstViewKindSnapshotIn = cloneDeep(viewKind);
if (!readOnlyFormViewKind.elements) readOnlyFormViewKind.elements = [];
readOnlyFormViewKind.elements[0].options = {
  ...readOnlyFormViewKind.elements[0].options,
  readOnly: true,
};

export const NoViewDescription: Story = {
  args: {},
};

export const EditableObject: Story = {
  args: {
    viewKind,
    viewDescr,
    schemas: [artifactSchema],
    data: [testDataCollectionArtifacts[2]],
  },
};

export const EditableObjectWithNullProperty: Story = {
  args: {
    viewKind,
    viewDescr,
    schemas: [artifactSchema],
    data: [
      {
        creator: null,
        assetFolder: null,
        description: 'TestDescr',
      },
    ],
  },
};

export const ReadOnlyObjectWithNullProperty: Story = {
  args: {
    viewKind: readOnlyFormViewKind,
    viewDescr,
    schemas: [artifactSchema],
    data: [
      {
        creator: null,
        assetFolder: null,
        description: 'TestDescr',
      },
    ],
  },
};

export const EditableEmptyObject: Story = {
  args: {
    viewKind,
    viewDescr,
    schemas: [artifactSchema],
    data: [{}],
  },
};

export const ReadOnlyEmptyObject: Story = {
  args: {
    viewKind: readOnlyFormViewKind,
    viewDescr,
    schemas: [artifactSchema],
    data: [{}],
  },
};

export const ReadOnlyNoObject: Story = {
  args: {
    viewKind, // form should be read-only even if viewKind is not read-only
    viewDescr,
    schemas: [artifactSchema],
    data: [],
  },
};
