/********************************************************************************
 * Copyright (c) 2024 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, DatePicker, Form, Input, InputNumber, Typography } from 'antd';

import { MstContext } from '../../MstContext';
import { RankedTester, rankWith, uiTypeIs } from '../../testers';
import { processViewKindOverride } from '../../Form';
import { applySnapshot, getSnapshot } from 'mobx-state-tree';
import { JSONSchema7LDPropertyDefinition } from '@agentlab/sparql-jsld-client';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const rangeProps = ['amountValueMoving30', 'revenueMoving30', 'price', 'commentsCount', 'firstParsedAt', 'parsedAt'];

export type JSONSchema7LDPropertyDefinitionWithName = JSONSchema7LDPropertyDefinition & { name: string };

function isInteger(value: any) {
  return parseInt(value, 10).toString() === value;
}

function dispatchControl(p: JSONSchema7LDPropertyDefinitionWithName) {
  if (p.type === 'integer')
    return (
      <Form.Item key={`${p.name}`} label={p.title} tooltip={p.description}>
        <Form.Item
          key={`${p.name}-Min`}
          name={`${p.name}-Min`}
          rules={[
            {
              type: 'integer',
              message: 'Please input integer!',
              validator: (rule: any, value: string) =>
                new Promise(
                  (resolve, reject) =>
                    value === undefined || value === '' || (isInteger(value) ? resolve(value) : reject(rule.message)),
                ),
            },
          ]}
          style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
          <Input style={{ width: '100%' }} />
        </Form.Item>
        <span style={{ display: 'inline-block', width: '20px', lineHeight: '32px', textAlign: 'center' }}>-</span>
        <Form.Item
          key={`${p.name}-Max`}
          name={`${p.name}-Max`}
          rules={[
            {
              type: 'integer',
              message: 'Please input integer!',
              validator: (rule: any, value: string) =>
                new Promise(
                  (resolve, reject) =>
                    value === undefined || value === '' || (isInteger(value) ? resolve(value) : reject(rule.message)),
                ),
            },
          ]}
          style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
          <Input style={{ width: '100%' }} />
        </Form.Item>
      </Form.Item>
    );
  else if (p.type === 'string') {
    if (p.format === 'date-time') {
      return (
        <Form.Item key={`${p.name}`} label={p.title} tooltip={p.description}>
          <RangePicker
            id={{
              start: `${p.name}-Min`,
              end: `${p.name}-Max`,
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
      );
    }
    return (
      <Form.Item key={p.name} name={p.name} label={p.title} tooltip={p.description}>
        <Input />
      </Form.Item>
    );
  }
}

export const QueryFormIRI = 'aldkg:QueryForm';

export interface QueryFormLocale {
  searchBtnTitle: string;
}

export const QueryForm = observer<any>((props) => {
  const { store } = useContext(MstContext);
  const locale: QueryFormLocale = store.getLocaleJs(QueryFormIRI);
  const [id, collIri, collIriOverride, inCollPath, viewKindElement, viewDescrElement] = processViewKindOverride(
    props,
    store,
  );

  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('QueryForm Success:', values);
    if (!viewKindElement.options) return;
    const conn = viewKindElement.options.connections;
    if (!Array.isArray(conn) || conn.length == 0) return;
    const cond = conn[0]?.toObj;
    if (!cond) return;
    const coll = store.rep.getColl(collIri);
    console.log('QueryForm - coll', coll ? coll['@id'] : undefined);
    if (!coll) return;
    console.log('QueryForm - entConstrs', coll.collConstr?.entConstrs);
    if (!coll.collConstr) return;
    console.log('QueryForm - cond', coll.collConstr.entConstrs[0].conditions);
    const cond2: any = getSnapshot(coll.collConstr.entConstrs[0].conditions);
    const newCond: any = { '@id': cond2['@id'] };
    if (cond2['@type']) newCond['@type'] = cond2['@type'];
    //name prop
    if (values.name) {
      if (values.name === '') values.name = undefined;
      else newCond.name = { relation: 'contains', value: [values.name] };
    }
    //other range props
    rangeProps.forEach((prop) => {
      const minPropName = prop + 'Min';
      const maxPropName = prop + 'Max';
      if (values[minPropName] && values[maxPropName])
        newCond[prop] = {
          relation: 'between-incl-both',
          value: [values[minPropName], values[maxPropName]],
        };
      else if (values[minPropName])
        newCond[prop] = {
          relation: 'after',
          value: [values[minPropName]],
        };
      else if (values[maxPropName])
        newCond[prop] = {
          relation: 'before',
          value: [values[maxPropName]],
        };
    });
    console.log('QueryForm - newCond', newCond);
    applySnapshot(coll.collConstr.entConstrs[0].conditions, newCond);
  };

  const hiddenProperties: string[] = viewKindElement.options?.hiddenProperties || [];
  const coll = store.rep.getColl(collIri);
  const properties: JSONSchema7LDPropertyDefinitionWithName[] = coll?.collConstr?.entConstrs
    ? Object.entries(coll.collConstr.entConstrs[0].schema?.propertiesJs || {})
        .filter((e) => !hiddenProperties.includes(e[0]))
        .map((e) => ({
          name: e[0],
          ...e[1],
        }))
        .sort((e1, e2) => {
          if (e1.order === e2.order) return 0;
          if (e1.order === undefined) return 1;
          if (e2.order === undefined) return -1;
          if (e1.order < e2.order) return -1;
          return 1;
        })
    : [];
  //console.log('QueryForm', { properties });

  return (
    <div style={viewKindElement.options?.blockStyle || { margin: '10px' }}>
      {viewKindElement.options.title !== undefined && <Title level={4}>{viewKindElement.options.title}</Title>}
      <Form
        style={{ ...(viewKindElement.options?.formStyle || {}) }}
        layout={viewKindElement.options?.layout || 'vertical'}
        size={viewKindElement.options?.size || 'small'}
        form={form}
        initialValues={{ ...(viewKindElement.options?.initialValues || {}) }}
        onFinish={onFinish}>
        {properties.map((p) => dispatchControl(p))}

        <Form.Item style={{ marginTop: '16px' }}>
          <Button type='primary' htmlType='submit'>
            {locale.searchBtnTitle}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export const antdQueryFormTester: RankedTester = rankWith(2, uiTypeIs(QueryFormIRI));
