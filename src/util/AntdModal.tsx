/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useContext, useState } from 'react';
import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';

import { SaveReqDialog } from './OnSaveDialog';
import { MstContext } from '../MstContext';
import { FormLayoutLocale, FormLayoutIRI } from '..';

export const AntdModal: React.FC<any> = observer<any>(
  ({ viewKind, viewKindElement, viewDescr, viewDescrElement, id, schema, enabled, cells, childrenId, Render }) => {
    const [visible, setVisible] = useState(false);
    const { store } = useContext(MstContext);
    const locale: FormLayoutLocale = store.getLocaleJs(FormLayoutIRI);

    const onCancel = () => {
      const editing = store.editingData.get(id);
      if (!editing) {
        store.setModalVisible(id, false);
      } else {
        setVisible(true);
      }
    };
    const onOk = () => {
      store.setEditing(id, false, true);
      store.setModalVisible(id, false);
      // save Data
    };
    return (
      <Modal
        title='Test'
        visible={store.modals[id]}
        onOk={onOk}
        onCancel={onCancel}
        cancelText={locale.btnCancel}
        width={1200}
        okText={locale.btnSave}>
        <Render
          viewKind={viewKind}
          viewKindElement={viewKindElement}
          viewDescr={viewDescr}
          viewDescrElement={viewDescrElement}
          schema={schema}
          enabled={enabled}
          cells={cells}
          id={childrenId}
        />
        <SaveReqDialog
          visible={visible}
          onOk={() => {
            store.setEditing(id, false, true);
            setVisible(false);
            store.setModalVisible(id, false);
          }}
          onCancel={() => setVisible(false)}
        />
      </Modal>
    );
  },
);
