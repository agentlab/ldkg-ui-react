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
import { Modal } from 'antd';

import { withStoreToSaveDialogProps } from '../util/ContextToProps';
import { MstContext } from '../MstContext';

export const SaveReqDialogIRI = 'aldkg:SaveReqDialog';
export interface SaveReqDialogLocale {
  btnCancel: string;
  btnOK: string;
  unsavedDescr: string;
  unsavedTitle: string;
}

interface SaveReqDialogProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export const SaveReqDialog: React.FC<SaveReqDialogProps> = ({
  visible = true,
  onOk = () => {},
  onCancel = () => {},
}: SaveReqDialogProps) => {
  const { store } = useContext(MstContext);
  const locale: SaveReqDialogLocale = store.getLocaleJs(SaveReqDialogIRI);
  return (
    <Modal
      title={locale.unsavedTitle}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      cancelText={locale.btnCancel}
      okText={locale.btnOK}>
      <p>{locale.unsavedDescr}</p>
    </Modal>
  );
};

export const SaveReqDialogWithStore = withStoreToSaveDialogProps(SaveReqDialog);
