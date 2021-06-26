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
import { Modal } from 'antd';

import { withStoreToSaveDialogProps } from '../util/ContextToProps';

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
  return (
    <Modal
      title='Несохраненные изменения'
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      cancelText='Отмена'
      okText='Ок'>
      <p>Имеются несохраненные изменения! Нажав на кнопку Ок вы сбросите все изменения</p>
    </Modal>
  );
};

export const SaveReqDialoglWithStore = withStoreToSaveDialogProps(SaveReqDialog);
