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
import { Col, Row, Form } from 'antd';

import { computeLabel, isPlainLabel } from '../renderers';
import { ControlComponent } from '../Form';
import { formatters } from '../formatters';

interface WithInput {
  input: any;
}

export const AntdInputControl: React.FC<ControlComponent & WithInput> = (props) => {
  const {
    id,
    errors,
    label,
    visible,
    required,
    input,
    form,
    formData,
    validateObj,
    onValidation,
    editing,
    uiOptions = {},
  } = props;
  const isValid = errors.length === 0;
  const appliedUiSchemaOptions: any = {};
  const InnerComponent = input;

  const formatterId = uiOptions.formatter || 'base';
  const readOnly = uiOptions.readOnly;
  const query = uiOptions.query;
  const specialProps: any = {};
  if (uiOptions.dataToFormatter) {
    const formatterProps = uiOptions.dataToFormatter;
    for (const key in formatterProps) {
      specialProps[key] = formData[formatterProps[key]];
    }
  }
  const Formatter = formatters[formatterId] || formatters['base'];

  return form ? (
    <Form.Item
      label={
        <span style={{ display: 'block', width: '100%' }}>
          {computeLabel(
            isPlainLabel(label) ? label : label.default,
            required as boolean,
            appliedUiSchemaOptions.hideRequiredAsterisk,
          )}
        </span>
      }
      validateStatus={validateObj.validateStatus}
      help={validateObj.help}>
      {editing && !readOnly ? (
        <InnerComponent
          {...props}
          onValidation={onValidation}
          id={id + '-input'}
          saveKey={id.split('/')[1]}
          isValid={isValid}
          visible={visible}
        />
      ) : (
        <Formatter query={query} propKey={uiOptions.key} value={props.data} {...specialProps} {...props} />
      )}
    </Form.Item>
  ) : (
    <Row style={{ width: '100%' }}>
      <Col span={8}>
        <label className={'label-nowrap'} htmlFor={id}>
          {computeLabel(
            isPlainLabel(label) ? label : label.default,
            required as boolean,
            appliedUiSchemaOptions.hideRequiredAsterisk,
          )}
          :
        </label>
      </Col>
      <Col span={16}>
        <div className={'input-margin'}>
          <InnerComponent
            {...props}
            id={id + '-input'}
            saveKey={id.split('/')[1]}
            isValid={isValid}
            visible={visible}
          />
        </div>
      </Col>
    </Row>
  );
};
