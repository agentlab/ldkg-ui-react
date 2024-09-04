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
import './index.css';

interface ContextMenuProps {
  selection: any;
  visible: boolean;
  x: number | string;
  y: number | string;
  actionsMap?: { title: string; action: (selection: unknown[]) => Promise<void> | void }[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ selection, visible, x, y, actionsMap }) => {
  return (
    (actionsMap && visible && (
      <ul className='popup' style={{ left: `${x}px`, top: `${y}px`, position: 'fixed' }}>
        {actionsMap.map(({ title, action }) => (
          <li
            key={title}
            onClick={() => {
              action(selection.getSelectedItems());
              selection.deselectAll();
            }}>
            {title}
          </li>
        ))}
      </ul>
    )) ||
    null
  );
};
