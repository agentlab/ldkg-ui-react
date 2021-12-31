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
import { JsObject } from '@agentlab/sparql-jsld-client';

import './BaseTableMenu.css';

interface BaseTablrMenu {
  record: JsObject;
  selection: any[];
  visible: boolean;
  x: number | string;
  y: number | string;
  actionsMap?: { title: string; action: (selection: unknown[]) => Promise<void> | void }[];
  onClick: () => void;
}

/*const labelsRu: JsStrObj = {
  'table.menu.createArtifactBefore': 'Создать перед',
  'table.menu.createArtifactBefore0': 'Создать перед {{ count }}',
  'table.menu.createArtifactBefore1': 'Создать перед {{ count }}',
  'table.menu.createArtifactBefore2': 'Создать перед {{ count }}',
  'table.menu.createArtifactAfter': 'Создать после',
  'table.menu.createArtifactAfter0': 'Создать после {{ count }}',
  'table.menu.createArtifactAfter1': 'Создать после {{ count }}',
  'table.menu.createArtifactAfter2': 'Создать после {{ count }}',
  'table.menu.deleteArtifacts': 'Удалить',
  'table.menu.deleteArtifacts0': 'Удалить {{ count }}',
  'table.menu.deleteArtifacts1': 'Удалить {{ count }}',
  'table.menu.deleteArtifacts2': 'Удалить {{ count }}',
  'table.menu.linkArtifacts': 'Слинковать',
  'table.menu.linkArtifacts0': 'Слинковать {{ count }}',
  'table.menu.linkArtifacts1': 'Слинковать {{ count }}',
  'table.menu.linkArtifacts2': 'Слинковать {{ count }}',
};*/

export const BaseTableMenu: React.FC<BaseTablrMenu> = ({ record, selection, visible, x, y, actionsMap, onClick }) => {
  return (
    (actionsMap && visible && (
      <ul className='popup' style={{ left: `${x}px`, top: `${y}px`, position: 'fixed' }}>
        {actionsMap.map(({ title, action }) => (
          <li
            key={title}
            onClick={() => {
              action(selection);
              onClick();
            }}>
            {title}
          </li>
        ))}
      </ul>
    )) ||
    null
  );
};
