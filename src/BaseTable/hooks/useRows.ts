/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { useCallback, useMemo } from 'react';

export const useRows = ({
  selection,
  onSelect,
  closePopup,
  openPopup,
  setPopupCoords,
  isPopupVisible,
  multiselect,
}: any) => {
  const rowEventHandlers = useMemo(
    () => ({
      onContextMenu: ({ event }: any) => {
        event.preventDefault();
        if (!isPopupVisible) {
          document.addEventListener(`click`, function onClickOutside() {
            closePopup();
            document.removeEventListener(`click`, onClickOutside);
          });
        }
        openPopup();
        setPopupCoords({ x: event.clientX, y: event.clientY });
      },
      onClick: ({ rowData, event }: any) => {
        if (event.target.nodeName !== 'INPUT') {
          if (multiselect) {
            selection.toggleItem(rowData['@id']);
          } else {
            selection.deselectAll();
            selection.selectItem(rowData['@id']);
          }
          onSelect(selection.getSelectedItems());
        }
      },
    }),
    [closePopup, openPopup, isPopupVisible, setPopupCoords, selection, onSelect, multiselect],
  );

  const rowClassName = useCallback(
    ({ rowData }: any): string => {
      return selection.isItemSelected(rowData['@id']) ? 'row-selected' : '';
    },
    [selection],
  );

  return { rowEventHandlers, rowClassName };
};
