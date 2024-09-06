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
import { testDataModuleArtifacts, viewDescrArtifactsWithNoElements, viewKindArtifactsWithNoElements } from './TestData';

export default {
  title: 'Local Single Control/Query',
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
  collsConstrs: [
    {
      '@id': 'rm:Artifacts_Coll',
      '@type': 'aldkg:CollConstr',
      entConstrs: [
        {
          '@id': 'rm:Artifacts_Coll_Ent',
          '@type': 'aldkg:EntConstr',
          schema: 'rm:ArtifactShape',
          conditions: {
            '@id': 'rm:Artifacts_Coll_Ent_Cond',
            amountValueMoving30: {
              relation: 'between-incl-both',
              value: [20000, 60000],
            },
          },
        },
      ],
      //orderBy: [{ expression: factory.variable('identifier0'), descending: false }],
    },
  ],
  elements: [
    {
      '@id': 'mktp:QueryComponent',
      '@type': 'aldkg:QueryForm',
      resultsScope: 'rm:Artifacts_Coll',
      options: {
        title: 'Artifact Search',
        connections: [{ toObj: 'rm:Artifacts_Coll_Ent_Cond' }],
        hiddenProperties: ['@id'],
        blockStyle: { margin: '10px' },
        formStyle: {},
        layout: 'vertical',
        size: 'small',
        initialValues: { amountValueMoving30Min: 20000, amountValueMoving30Max: 60000 },
      },
    },
  ],
};

const viewDescr: TMstViewDescrSnapshotIn = cloneDeep(viewDescrArtifactsWithNoElements);

export const NoViewDescription: Story = {
  args: {},
};

export const FullData: Story = {
  args: {
    viewKind,
    viewDescr,
    schemas: [artifactSchema],
    data: testDataModuleArtifacts,
  },
};
