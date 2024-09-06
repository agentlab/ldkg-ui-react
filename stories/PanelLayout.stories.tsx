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
import { Meta, StoryObj } from '@storybook/react';

import {
  antdControlRenderers,
  antdLayoutRenderers,
  Form,
  tableRenderers,
  TMstViewDescrSnapshotIn,
  TMstViewKindSnapshotIn,
} from '../src';
import { FormWithLocalStateDecorator, FormWrapper } from './FormWrappers';

import { viewDescrArtifactsWithNoElements, viewKindArtifactsWithNoElements } from './TestData';
import { cloneDeep } from 'lodash-es';
import { artifactSchema } from '../test/schema/TestSchemas';

export default {
  title: 'Local Single Control/Panel Layout',
  component: Form,
  parameters: {
    antdRenderers: [...antdControlRenderers, ...antdLayoutRenderers, ...tableRenderers],
  },
  decorators: [FormWithLocalStateDecorator],
  render: (args: any) => (
    <div style={{ height: 'calc(100vh - 32px)' }}>
      <FormWrapper {...args} />
    </div>
  ),
} as Meta<typeof Form>;

type Story = StoryObj<any>; // StoryObj<typeof Form>;

const baseStyle = {
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5em',
  boxSizing: 'border-box',
  borderRadius: '6px',
  boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
};

const formatMessage = (rowHeight: string | number, blockHeight: string | number, blockWidth: string | number) =>
  `RowHeight: ${rowHeight}
BoxHeight:${blockHeight}
BoxWidth:${blockWidth}`;

const viewKindNoFlex: TMstViewKindSnapshotIn = {
  ...cloneDeep(viewKindArtifactsWithNoElements),
  elements: [
    {
      '@id': 'mktp:_1',
      '@type': 'aldkg:PanelLayout',
      options: {
        style: { height: '100%', width: '100%' },
      },
      elements: [
        {
          '@id': 'mktp:_1_1',
          '@type': 'aldkg:TextPanel',
          options: {
            value: formatMessage('100%, vertical', '20%', '80%'),
            style: { ...baseStyle, height: '20%', width: '80%', marginBottom: '10px' },
          },
        },
        {
          '@id': 'mktp:_1_2',
          '@type': 'aldkg:PanelLayout',
          options: {
            flow: 'horizontal',
            style: {
              width: '100%',
              height: '300px',
              padding: '10px',
              overflow: 'scroll',
            },
          },
          elements: [
            {
              '@id': 'mktp:_1_2_1',
              '@type': 'aldkg:TextPanel',
              options: {
                value: formatMessage('80px, horizontal', '50%', '25%'),
                style: { ...baseStyle, height: '50%', width: '25%', margin: '10px' },
              },
            },
            {
              '@id': 'mktp:_1_2_2',
              '@type': 'aldkg:TextPanel',
              options: {
                height: '80%',
                width: '45%',
                value: formatMessage('80px, horizontal', '80%', '45%'),
                style: { ...baseStyle, height: '80%', width: '45%', margin: '10px' },
              },
            },
            {
              '@id': 'mktp:_1_2_3',
              '@type': 'aldkg:TextPanel',
              options: {
                height: '80%',
                width: '45%',
                value: formatMessage('80px, horizontal', '80%', '45%'),
                style: { ...baseStyle, height: '80%', width: '45%', margin: '10px' },
              },
            },
            {
              '@id': 'mktp:_1_2_4',
              '@type': 'aldkg:TextPanel',
              options: {
                height: '80%',
                width: '45%',
                value: formatMessage('80px, horizontal', '80%', '45%'),
                style: { ...baseStyle, height: '80%', width: '45%', margin: '10px' },
              },
            },
          ],
        },
        {
          '@id': 'mktp:_1_3',
          '@type': 'aldkg:PanelLayout',
          options: {
            width: '100%',
            flow: 'wrap',
            style: { overflow: 'scroll' },
          },
          elements: [
            {
              '@id': 'mktp:_2_2_1',
              '@type': 'aldkg:TextPanel',
              options: {
                value: formatMessage('-, wrap', '200px', '25%'),
                style: { ...baseStyle, height: '200px', width: '25%', margin: '10px' },
              },
            },
            {
              '@id': 'mktp:_2_2_2',
              '@type': 'aldkg:TextPanel',
              options: {
                height: '80%',
                width: '45%',
                value: formatMessage('-, wrap', '10em', '45%'),
                style: { ...baseStyle, height: '10em', width: '45%', margin: '10px' },
              },
            },
            {
              '@id': 'mktp:_2_2_3',
              '@type': 'aldkg:TextPanel',
              options: {
                height: '80%',
                width: '45%',
                value: formatMessage('-, wrap', '10em', '45%'),
                style: { ...baseStyle, height: '10em', width: '45%', margin: '10px' },
              },
            },
            {
              '@id': 'mktp:_2_2_4',
              '@type': 'aldkg:TextPanel',
              options: {
                height: '80%',
                width: '45%',
                value: formatMessage('-, wrap', '10em', '45%'),
                style: { ...baseStyle, height: '10em', width: '45%', margin: '10px' },
              },
            },
          ],
        },
        {
          '@id': 'mktp:_2_2_4',
          '@type': 'aldkg:TextPanel',
          options: {
            value: formatMessage('100%', '70%', '100%'),
            style: { ...baseStyle, height: '70%', width: '100%', margin: '10px' },
          },
        },
      ],
    },
  ],
};

const viewDescr: TMstViewDescrSnapshotIn = cloneDeep(viewDescrArtifactsWithNoElements);

export const NoFlex: Story = {
  args: {
    viewKind: viewKindNoFlex,
    viewDescr,
    schemas: [artifactSchema],
  },
};

const viewKindFlex: TMstViewKindSnapshotIn = {
  ...cloneDeep(viewKindArtifactsWithNoElements),
  elements: [
    {
      '@id': 'mktp:_1',
      '@type': 'aldkg:PanelLayout',
      options: {
        style: { height: '100%', width: '100%' },
      },
      elements: [
        {
          '@id': 'mktp:_1_1',
          '@type': 'aldkg:TextPanel',
          options: {
            value: 'VerticalLayout, align: space-between',
            style: { ...baseStyle, height: '100px', width: '100%', marginBottom: '10px' },
          },
        },
        {
          '@id': 'mktp:_1_2',
          '@type': 'aldkg:PanelLayout',
          options: {
            style: {
              width: '100%',
              height: '700px',
              padding: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
          },
          elements: [
            {
              '@id': 'mktp:_1_2_1',
              '@type': 'aldkg:VerticalLayout',
              options: {
                style: {
                  width: '100%',
                  height: '100%',
                  padding: '10px',
                  justifyContent: 'space-between',
                },
              },
              elements: [
                {
                  '@id': 'mktp:_1_2_1',
                  '@type': 'aldkg:TextPanel',
                  options: {
                    height: '25%',
                    width: '100%',
                    value: formatMessage('25%', '90%', '100%'),
                    style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
                  },
                },
                {
                  '@id': 'mktp:_1_2_1',
                  '@type': 'aldkg:TextPanel',
                  options: {
                    height: '25%',
                    width: '100%',
                    value: formatMessage('25%', '90%', '100%'),
                    style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
                  },
                },
                {
                  '@id': 'mktp:_1_2_1',
                  '@type': 'aldkg:TextPanel',
                  options: {
                    height: '25%',
                    width: '100%',
                    value: formatMessage('25%', '90%', '100%'),
                    style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
                  },
                },
              ],
            },
          ],
        },
        {
          '@id': 'mktp:_1_1',
          '@type': 'aldkg:TextPanel',
          options: {
            value: 'VerticalLayout, align: 3 rows',
            style: { ...baseStyle, height: '100px', width: '100%', marginBottom: '10px' },
          },
        },
        {
          '@id': 'mktp:_1_2',
          '@type': 'aldkg:PanelLayout',
          options: {
            style: {
              width: '100%',
              height: '700px',
              padding: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
          },
          elements: [
            {
              '@id': 'mktp:_1_2_1',
              '@type': 'aldkg:VerticalLayout',
              options: {
                style: {
                  width: '100%',
                  height: '100%',
                  padding: '10px',
                },
              },
              elements: [
                {
                  '@id': 'mktp:_1_2_1',
                  '@type': 'aldkg:TextPanel',
                  options: {
                    width: '100%',
                    grow: '1',
                    value: formatMessage('grow 1', '90%', '100%'),
                    style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
                  },
                },
                {
                  '@id': 'mktp:_1_2_1',
                  '@type': 'aldkg:TextPanel',
                  options: {
                    width: '100%',
                    grow: '1',
                    value: formatMessage('grow 1', '90%', '100%'),
                    style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
                  },
                },
                {
                  '@id': 'mktp:_1_2_1',
                  '@type': 'aldkg:TextPanel',
                  options: {
                    width: '100%',
                    grow: '1',
                    value: formatMessage('grow 1', '90%', '100%'),
                    style: { ...baseStyle, height: '90%', width: '100%', margin: '10px' },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const Flex: Story = {
  args: {
    viewKind: viewKindFlex,
    viewDescr,
    schemas: [artifactSchema],
  },
};
