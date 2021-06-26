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
import { Divider } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { JsObject } from '@agentlab/sparql-jsld-client';

//import './BaseTableMenu.css';

interface TreeContextMenuProps {
  node: JsObject;
  selection: any[];
  visible: boolean;
  x: number | string;
  y: number | string;
  onCreateDirectory: (o: any) => void;
  onDeleteDirectory: (o: any) => void;
}

export const TreeContextMenu: React.FC<TreeContextMenuProps> = ({
  node,
  selection,
  visible,
  x,
  y,
  onCreateDirectory,
  onDeleteDirectory,
}) => {
  if (visible) {
    return (
      <ul className='popup' style={{ left: `${x}px`, top: `${y}px`, position: 'fixed', zIndex: 1000 }}>
        <li onClick={() => onCreateDirectory(node.otherProps['@id'])}>
          <PlusOutlined />
          Создать
        </li>
        <Divider style={{ margin: '2px' }} />
        <li onClick={() => onDeleteDirectory(node.otherProps['@id'])}>
          <DeleteOutlined />
          Удалить
        </li>
        <Divider style={{ margin: '2px' }} />
        <li onClick={() => node.onRename()}>
          <EditOutlined />
          Переименовать
        </li>
      </ul>
    );
  } else {
    return null;
  }
};
