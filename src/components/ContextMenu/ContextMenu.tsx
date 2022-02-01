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

import './index.css';

interface ContextMenuProps {
  record: JsObject;
  selection: any[];
  visible: boolean;
  x: number | string;
  y: number | string;
  actionsMap?: { title: string; action: (selection: unknown[]) => Promise<void> | void }[];
  onClick: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ record, selection, visible, x, y, actionsMap, onClick }) => {
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
