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
import { Button, Row } from 'antd';

import { RankedTester, rankWith, uiTypeIs } from '../testers';
import { withStoreToSaveButtonProps } from '../util/ContextToProps';
import { FormLayoutLocale, FormLayoutIRI } from '../layouts';
import { MstContext } from '../MstContext';

const ButtonGroup = Button.Group;
const divStyle: React.CSSProperties = {
  padding: '5px',
};

export const SaveControl: React.FC<any> = (props) => {
  const { editing, setEditing, saveData } = props;
  const { store } = useContext(MstContext);
  const locale: FormLayoutLocale = store.getLocaleJs(FormLayoutIRI);
  const onCancel = () => {
    setEditing(false);
  };
  return (
    <div>
      <Row style={divStyle} justify='end'>
        <ButtonGroup>
          <Button key='cancel' disabled={!editing} onClick={() => onCancel()}>
            {locale.btnCancel}
          </Button>
          <Button key='ok' disabled={!editing} type='primary' onClick={saveData}>
            {locale.btnSave}
          </Button>
        </ButtonGroup>
      </Row>
    </div>
  );
};

export const saveControlTester: RankedTester = rankWith(1, uiTypeIs('aldkg:SaveControl'));
export const AntdSaveControlWithStore = withStoreToSaveButtonProps(SaveControl);
