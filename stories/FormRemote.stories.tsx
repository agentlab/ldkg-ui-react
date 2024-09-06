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

import { antdControlRenderers, antdLayoutRenderers, Form } from '../src';
import { FormWithRemoteStateDecorator, FormWrapper } from './FormWrappers';

import { EditableObject, ReadOnlyEmptyObject } from './FormLocal.stories';

export default {
  title: 'Remote/FormArtifact',
  component: Form,
  parameters: {
    antdRenderers: [...antdControlRenderers, ...antdLayoutRenderers],
    repId: 'reqs2',
    serverUrl: 'http://localhost:8181/rdf4j-server',
  },
  decorators: [FormWithRemoteStateDecorator],
  render: (args: any) => <FormWrapper {...args} />,
} as Meta<typeof Form>;

type Story = StoryObj<any>; // StoryObj<typeof Form>;

export const EditableData: Story = {
  args: {
    ...EditableObject.args,
    data: undefined,
  },
};

export const ReadOnlyData: Story = {
  args: {
    ...ReadOnlyEmptyObject.args,
    data: undefined,
  },
};

const viewDescrOverride = cloneDeep(EditableObject.args.viewDescr);
viewDescrOverride.collsConstrs = [
  {
    '@id': 'rm:FormView_Artifacts_Coll_ViewDescr',
    '@type': 'aldkg:CollConstr',
    '@parent': 'rm:Artifacts_Coll',
    entConstrs: [
      {
        '@id': 'rm:FormView_Artifacts_Coll_Ent0_ViewDescr',
        '@type': 'aldkg:EntConstr',
        '@parent': 'rm:Artifacts_Coll_Ent',
        conditions: {
          '@id': 'rm:_2Yud6',
          '@type': 'aldkg:EntConstrCondition',
          assetFolder: 'folders:samples_collection',
        },
      },
    ],
  },
];
export const ConditionsOverride: Story = {
  args: {
    ...EditableObject.args,
    viewDescr: viewDescrOverride,
    data: undefined,
  },
};
