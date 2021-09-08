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
  viewDescrCollConstr,
  viewKindCollConstr,
} from '../src';

const viewKinds = [
  {
    '@id': 'rm:TimeSeriesViewKind',
    '@type': 'rm:ViewKind',
    type: 'TimeSeriesChart', // control type
    options: {
      // TODO: primary/secondary properties? links to collsConstrs? Pass the entire options to the to-be rendered component?
    },
    mappings: {
      type: {
        type: 'pointer',
        value: '/type',
      },
      xField: 'resultTime',
      yField: {
        type: 'expr',
        value: '(v) => v.replace(/^[^#]*#/, "")',
        applyTo: '$.observedProperty',
        dataProperty: 'hasSimpleResult',
      },
      colorField: 'observedProperty',
      adjust: {
        type: 'object',
        properties: {
          type: 'dodge',
          marginRatio: 0,
        },
      },
      legend: {
        type: 'object',
        properties: {
          link: { type: 'pointer', value: '/hasFeatureOfInterest' },
          dataField: 'hasFeatureOfInterest',
          color: { type: 'pointer', value: '/options/color' },
          text: { type: 'pointer', value: '/options/label' },
        },
        wrapper: { type: 'pointer', value: '/hasFeatureOfInterest', options: true },
      },
      mapping: {
        type: 'object',
        properties: {
          style: {
            type: 'object',
            properties: {
              lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
              stroke: { type: 'pointer', value: '/options/stroke' },
            },
            wrapper: { type: 'pointer', value: '/observedProperty' },
          },
          shape: {
            type: 'pointer',
            value: '/options/shape',
          },
          color: {
            type: 'pointer',
            value: '/options/color',
            wrapper: { type: 'pointer', value: '/observedProperty' },
          },
        },
      },
    },
  },
];

const viewDescrs = [
  {
    '@id': 'mh:ChartView',
    '@type': 'rm:View',
    title: 'ProductAnalysis',
    description: 'Marketplace Product Analysis Time-series Charts',
    viewKind: 'rm:TimeSeriesViewKind',
    type: 'Chart', // control type
    // child ui elements configs
    options: {
      dateFormat: 'DD.MM.YYYY',
      timeUnit: 'day',
      axes: { yAxis: { primary: ['price'], secondary: ['volume'], ratio: 0.5 } },
    },
    elements: [
      /**
       * Product 1
       */
      {
        '@id': 'rm:line_11', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'line', // TODO: +'Bar'/'Pie' (auxillary bars, auxillary lines)
        resultsScope: 'sosa:Observations_11_CollConstr', // reference to data
        options: {
          label: 'Продукт 1', // TODO: in future should be a data-binding
          color: '#4EEC1F',
          lineWidth: 2,
          shape: 'hvh',
          // lineDash: '',
        },
      },
      {
        '@id': 'rm:line_12', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'interval', // TODO: +'Bar' (auxillary bars, auxillary lines)
        resultsScope: 'sosa:Observations_12_CollConstr', // reference to data
        options: {
          label: 'Продукт 1', // TODO: in future should be a data-binding
          color: '#4EEC1F',
          lineWidth: 2,
          // lineDash: '',
        },
      },
      /**
       * Product 2
       */
      {
        '@id': 'rm:line_21', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'line',
        resultsScope: 'sosa:Observations_21_CollConstr', // reference to data
        options: {
          label: 'Продукт 2', // TODO: in future should be a data-binding
          color: '#0B49F2',
          lineWidth: 2,
          shape: 'hvh',
          // lineDash: '',
        },
      },
      {
        '@id': 'rm:line_22', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'interval',
        resultsScope: 'sosa:Observations_22_CollConstr', // reference to data
        options: {
          label: 'Продукт 2', // TODO: in future should be a data-binding
          color: '#0B49F2',
          lineWidth: 2,
          // lineDash: '',
        },
      },
      /**
       * Product 3
       */
      {
        '@id': 'rm:line_31', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'line',
        resultsScope: 'sosa:Observations_31_CollConstr', // reference to data
        options: {
          label: 'Продукт 3', // TODO: in future should be a data-binding
          color: '#F20B93',
          lineWidth: 2,
          shape: 'hvh',
          // lineDash: '',
        },
      },
      {
        '@id': 'rm:line_32', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'interval',
        resultsScope: 'sosa:Observations_32_CollConstr', // reference to data
        options: {
          label: 'Продукт 3', // TODO: in future should be a data-binding
          color: '#F20B93',
          lineWidth: 2,
          // lineDash: '',
        },
      },
    ],
    // datasets constraints, specific to this view (UML aggregation)
    collsConstrs: [
      /**
       * Product 1
       */
      {
        '@id': 'sosa:Observations_11_CollConstr', // machine-generated random UUID
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'sosa:Observations_11_EntConstr_0', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'sosa:Observations_11_EntConstr_0_Condition', // machine-generated random UUID
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
            },
          },
        ],
      },
      {
        '@id': 'sosa:Observations_12_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'sosa:Observations_12_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'sosa:Observations_12_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
            },
          },
        ],
      },
      /**
       * Product 2
       */
      {
        '@id': 'sosa:Observations_21_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'sosa:Observations_21_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'sosa:Observations_21_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
            },
          },
        ],
      },
      {
        '@id': 'sosa:Observations_22_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'sosa:Observations_22_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'sosa:Observations_22_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
            },
          },
        ],
      },
      /**
       * Product 3
       */
      {
        '@id': 'sosa:Observations_31_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'sosa:Observations_31_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'sosa:Observations_31_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
            },
          },
        ],
      },
      {
        '@id': 'sosa:Observations_32_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'sosa:Observations_32_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'sosa:Observations_32_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
            },
          },
        ],
      },
    ],
  },
];

/**
 * Product 1 https://www.wildberries.ru/catalog/15570386/detail.aspx?targetUrl=ST
 */
const viewDataObservations11 = [
  {
    '@id': 'Observation/10011',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 3599,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/10012',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1295,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/10013',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1245,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/10014',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1395,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/10015',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1495,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

const viewDataObservations12 = [
  {
    '@id': 'Observation/10021',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 10000,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/10022',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 16000,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/10023',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 18000,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/10024',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 14000,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/10025',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 12800,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

/**
 * Product 2 https://www.wildberries.ru/catalog/16170086/detail.aspx?targetUrl=SG
 */
const viewDataObservations21 = [
  {
    '@id': 'Observation/20011',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 4499,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/20012',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1259,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/20013',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1478,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/20014',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1478,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/20015',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1350,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

const viewDataObservations22 = [
  {
    '@id': 'Observation/20021',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 3000,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/20022',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 5900,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/20023',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 4800,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/20024',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 4700,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/20025',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 2700,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

/**
 * Product 3 https://www.wildberries.ru/catalog/15622789/detail.aspx?targetUrl=ST
 */
const viewDataObservations31 = [
  {
    '@id': 'Observation/30011',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1465,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/30012',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1195,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/30013',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 2020,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/30014',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 2300,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/30015',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 2350,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

const viewDataObservations32 = [
  {
    '@id': 'Observation/30021',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 4400,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/30022',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 6600,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/30023',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 7000,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/30024',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 6500,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/30025',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 6100,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

const rootModelState = {
  ...rootModelInitialState,
  colls: {
    // ViewDescr
    [viewDescrCollConstr['@id']]: {
      '@id': viewDescrCollConstr['@id'],
      collConstr: viewDescrCollConstr,
      dataIntrnl: viewDescrs,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    // ViewKindDescr
    [viewKindCollConstr['@id']]: {
      '@id': viewKindCollConstr['@id'],
      collConstr: viewKindCollConstr,
      dataIntrnl: viewKinds,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },

    // Data
    /**
     * Product 1
     */
    [viewDescrs[0].collsConstrs?.[0]['@id'] || '']: {
      '@id': viewDescrs[0].collsConstrs?.[0]['@id'],
      collConstr: viewDescrs[0].collsConstrs?.[0]['@id'], // reference by @id
      dataIntrnl: viewDataObservations11,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    [viewDescrs[0].collsConstrs?.[1]['@id'] || '']: {
      '@id': viewDescrs[0].collsConstrs?.[1]['@id'],
      collConstr: viewDescrs[0].collsConstrs?.[1]['@id'], // reference by @id
      dataIntrnl: viewDataObservations12,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    /**
     * Product 2
     */
    [viewDescrs[0].collsConstrs?.[2]['@id'] || '']: {
      '@id': viewDescrs[0].collsConstrs?.[2]['@id'],
      collConstr: viewDescrs[0].collsConstrs?.[2]['@id'], // reference by @id
      dataIntrnl: viewDataObservations21,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },

    [viewDescrs[0].collsConstrs?.[3]['@id'] || '']: {
      '@id': viewDescrs[0].collsConstrs?.[3]['@id'],
      collConstr: viewDescrs[0].collsConstrs?.[3]['@id'], // reference by @id
      dataIntrnl: viewDataObservations22,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    /**
     * Product 3
     */
    [viewDescrs[0].collsConstrs?.[4]['@id'] || '']: {
      '@id': viewDescrs[0].collsConstrs?.[4]['@id'],
      collConstr: viewDescrs[0].collsConstrs?.[4]['@id'], // reference by @id
      dataIntrnl: viewDataObservations31,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    [viewDescrs[0].collsConstrs?.[5]['@id'] || '']: {
      '@id': viewDescrs[0].collsConstrs?.[5]['@id'],
      collConstr: viewDescrs[0].collsConstrs?.[5]['@id'], // reference by @id
      dataIntrnl: viewDataObservations32,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
  },
};

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
  const rootStore = MstRepository.create(rootModelState, { client });
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <Provider store={store}>
      <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
        <div style={{ height: '1000px' }}>
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
        </div>
      </MstContextProvider>
    </Provider>
  );
};

export const LocalData = Template.bind({});
LocalData.args = {};
