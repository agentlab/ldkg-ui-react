/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';
import { Divider } from 'antd';
import { PlusOutlined, DeleteTwoTone, LinkOutlined } from '@ant-design/icons';
import { JsObject, JsStrObj } from '@agentlab/sparql-jsld-client';

import './BaseTableMenu.css';

import { tt } from '../ForDelete';

interface BaseTablrMenu {
  record: JsObject;
  selection: any[];
  target?: string;
  addDataToTarget: (data: any) => void;
  visible: boolean;
  x: number | string;
  y: number | string;
  onCreateArtifactBefore: (o: any) => void;
  onCreateArtifactAfter: (o: any) => void;
  onDeleteArtifacts: (o: any) => void;
  onLinkArtifacts: (o: JsObject | any[]) => void;
}

const labelsRu: JsStrObj = {
  'table.menu.createArtifactBefore': 'Создать перед',
  'table.menu.createArtifactBefore0': 'Создать перед {{ count }} требованием',
  'table.menu.createArtifactBefore1': 'Создать перед {{ count }} требованиями',
  'table.menu.createArtifactBefore2': 'Создать перед {{ count }} требованиями',
  'table.menu.createArtifactAfter': 'Создать после',
  'table.menu.createArtifactAfter0': 'Создать после {{ count }} требованием',
  'table.menu.createArtifactAfter1': 'Создать после {{ count }} требований',
  'table.menu.createArtifactAfter2': 'Создать после {{ count }} требований',
  'table.menu.deleteArtifacts': 'Удалить требование',
  'table.menu.deleteArtifacts0': 'Удалить {{ count }} требование',
  'table.menu.deleteArtifacts1': 'Удалить {{ count }} требования',
  'table.menu.deleteArtifacts2': 'Удалить {{ count }} требований',
  'table.menu.linkArtifacts': 'Слинковать',
  'table.menu.linkArtifacts0': 'Слинковать {{ count }} требование',
  'table.menu.linkArtifacts1': 'Слинковать {{ count }} требования',
  'table.menu.linkArtifacts2': 'Слинковать {{ count }} требований',
};

export const BaseTableMenu: React.FC<BaseTablrMenu> = ({
  record,
  selection,
  visible,
  x,
  y,
  target,
  addDataToTarget,
  onCreateArtifactBefore,
  onCreateArtifactAfter,
  onDeleteArtifacts,
  onLinkArtifacts,
}) => {
  const t = (id: string, o?: JsObject) => tt(labelsRu, id, o);
  if (visible) {
    return (
      <ul className='popup' style={{ left: `${x}px`, top: `${y}px`, position: 'fixed' }}>
        <li
          onClick={() => (selection.length === 0 ? onCreateArtifactBefore(record) : onCreateArtifactBefore(selection))}>
          <PlusOutlined />
          {selection.length === 0
            ? t('table.menu.createArtifactBefore')
            : t('table.menu.createArtifactBefore', { count: selection.length })}
        </li>
        <li onClick={() => (selection.length === 0 ? onCreateArtifactAfter(record) : onCreateArtifactAfter(selection))}>
          <PlusOutlined />
          {selection.length === 0
            ? t('table.menu.createArtifactAfter')
            : t('table.menu.createArtifactAfter', { count: selection.length })}
        </li>
        <Divider style={{ margin: '2px' }} />
        <li
          onClick={() =>
            selection.length === 0 ? onDeleteArtifacts([record.identifier]) : onDeleteArtifacts(selection)
          }>
          <DeleteTwoTone twoToneColor='red' />
          {selection.length === 0
            ? t('table.menu.deleteArtifacts')
            : t('table.menu.deleteArtifacts', { count: selection.length })}
        </li>
        <Divider style={{ margin: '2px' }} />
        <li onClick={() => (selection.length === 0 ? onLinkArtifacts(record) : onLinkArtifacts(selection))}>
          <LinkOutlined style={{ color: '#08c' }} />
          {selection.length === 0
            ? t('table.menu.linkArtifacts')
            : t('table.menu.linkArtifacts', { count: selection.length })}
        </li>
        {selection.length != 0 && target ? (
          <React.Fragment>
            <Divider style={{ margin: '2px' }} />
            <li onClick={() => addDataToTarget(selection)}>
              <LinkOutlined style={{ color: '#08c' }} />
              {`Добавить в ${target}`}
            </li>
          </React.Fragment>
        ) : null}
      </ul>
    );
  } else {
    return null;
  }
};
