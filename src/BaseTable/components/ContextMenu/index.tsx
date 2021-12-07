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
