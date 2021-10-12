/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useContext } from 'react';
import { Row, Button, Form } from 'antd';
import { observer } from 'mobx-react-lite';
import { AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

import { rankWith, uiTypeIs, RankedTester } from '../testers';
import { MstContext } from '../MstContext';
import { withStoreToFormProps } from '../util/ContextToProps';
import { AntdVerticalLayoutWithStore } from './AntdVerticalLayout';

import './form.css';

const ButtonGroup = Button.Group;

const divStyle: React.CSSProperties = {
  padding: '5px',
};

export const LogicalButton: React.FC<any> = observer<any>(({ form, onCancel, onSave }) => {
  const { store } = useContext(MstContext);
  //const onValidate = Symbol.for('onValidate');
  const activeSave = false;
  //if (store.onSaveData[form] && store.onSaveData[form][onValidate]) {
  //  activeSave = store.onSaveData[form][onValidate].length !== 0;
  //}
  return (
    <Row style={divStyle} justify='end'>
      <ButtonGroup>
        <Button
          key='cancel'
          disabled={!store.editingData.get(form)}
          size='small'
          onClick={(ev: any) => {
            ev.stopPropagation();
            onCancel();
          }}>
          Отмена
        </Button>
        <Button
          key='ok'
          size='small'
          disabled={!store.editingData.get(form) || activeSave}
          type='primary'
          onClick={async () => {
            await onSave();
            onCancel();
          }}>
          Сохранить
        </Button>
      </ButtonGroup>
    </Row>
  );
});

export const AntdFormLayout: React.FC<any> = ({
  viewKind,
  viewKindElement,
  viewDescr,
  viewDescrElement,
  enabled,
  title,
  visible,
  id,
  validation,
  editable,
  onSave,
  onCancel,
  onEdit,
  editing,
}) => {
  const { readOnly, style } = viewKindElement.options;
  return (
    <AutoSizer>
      {({ width, height }: any) => (
        <div style={{ width, height, overflow: 'auto', position: 'relative', ...style }} onClick={() => onEdit()}>
          <span style={{ padding: '7px', fontSize: '2em' }}>{title}</span>
          {readOnly ? null : <LogicalButton form={id} onSave={onSave} onCancel={onCancel} />}
          <Form labelAlign={'left'}>
            <AntdVerticalLayoutWithStore
              id={`${id}Layout`}
              viewKind={viewKind}
              viewKindElement={viewKindElement}
              viewDescr={viewDescr}
              viewDescrElement={viewDescrElement}
              schema={{}}
              enabled={enabled}
              form={id}
              readOnly={readOnly}
            />
          </Form>
        </div>
      )}
    </AutoSizer>
  );
};

export const antdFormLayoutTester: RankedTester = rankWith(2, uiTypeIs('aldkg:FormLayout'));
export const AntdFormLayoutWithStore = withStoreToFormProps(AntdFormLayout);
