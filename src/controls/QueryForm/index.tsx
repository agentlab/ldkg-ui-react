import { cloneDeep, isArray } from 'lodash-es';

import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, DatePicker, Form, Input, InputNumber } from 'antd';
import Title from 'antd/lib/typography/Title';

import { MstContext } from '../../MstContext';
import { RankedTester, rankWith, uiTypeIs } from '../../testers';
import { processViewKindOverride } from '../../Form';
import { applySnapshot, getSnapshot } from 'mobx-state-tree';

const rangeProps = ['amountValueMoving30', 'revenueMoving30', 'price', 'commentsCount', 'firstParsedAt', 'parsedAt'];

export const QueryForm = observer<any>((props) => {
  const { store } = useContext(MstContext);
  const [id, collIri, collIriOverride, inCollPath, viewKindElement, viewDescrElement] = processViewKindOverride(
    props,
    store,
  );

  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('QueryForm Success:', values);
    if (!viewKindElement.options) return;
    const conn = viewKindElement.options.connections;
    if (!isArray(conn) || conn.length == 0) return;
    const cond = conn[0]?.toObj;
    if (!cond) return;
    const coll = store.getColl(collIri);
    console.log('QueryForm - coll', coll.collConstr['@id']);
    if (!coll) return;
    console.log('QueryForm - entConstrs', coll.collConstr.entConstrs);
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

  return (
    <div style={{ margin: '10px 10px 0 10px' }}>
      <Title level={4}>Поиск товаров</Title>
      <Form
        layout={'vertical'}
        size={'small'}
        form={form}
        initialValues={{ amountValueMoving30Min: 20000, amountValueMoving30Max: 60000 }}
        onFinish={onFinish}>
        <Form.Item
          label='Название товара'
          name='name'
          tooltip='Фрагмент строки в названии для поиска на английском и/или китайском'>
          <Input />
        </Form.Item>

        <Form.Item
          label='Продажи на 30 дней'
          tooltip='Минимальный и максимальный объем продаж товара в шт или кв. метрах'>
          <Form.Item name='amountValueMoving30Min' style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <span style={{ display: 'inline-block', width: '20px', lineHeight: '32px', textAlign: 'center' }}>-</span>
          <Form.Item name='amountValueMoving30Max' style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Выручка на 30 дней' tooltip='Минимальная и максимальная выручка товара в юанях'>
          <Form.Item name='revenueMoving30Min' style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <span style={{ display: 'inline-block', width: '20px', lineHeight: '32px', textAlign: 'center' }}>-</span>
          <Form.Item name='revenueMoving30Max' style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Цена товара, юань' tooltip='Минимальная и максимальная цены товара в юанях'>
          <Form.Item name='priceMin' style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <span style={{ display: 'inline-block', width: '20px', lineHeight: '32px', textAlign: 'center' }}>-</span>
          <Form.Item name='priceMax' style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Кол-во комментариев' tooltip='Минимальное и максимальное количество отзывов о товаре'>
          <Form.Item name='commentsCountMin' style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <span style={{ display: 'inline-block', width: '20px', lineHeight: '32px', textAlign: 'center' }}>-</span>
          <Form.Item name='commentsCountMax' style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Добавлено' tooltip='Диапазон дат первого добавления товара в систему'>
          <Form.Item name='firstParsedAtMin' style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <span style={{ display: 'inline-block', width: '20px', lineHeight: '32px', textAlign: 'center' }}>-</span>
          <Form.Item name='firstParsedAtMax' style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Ообновлено' tooltip='Диапазон дат последнего обновления товара в системе'>
          <Form.Item name='parsedAtMin' style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <span style={{ display: 'inline-block', width: '20px', lineHeight: '32px', textAlign: 'center' }}>-</span>
          <Form.Item name='parsedAtMax' style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form.Item>

        <Form.Item style={{ marginTop: '16px' }}>
          <Button type='primary' htmlType='submit'>
            Искать товар
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export const antdQueryFormTester: RankedTester = rankWith(2, uiTypeIs('aldkg:QueryForm'));
