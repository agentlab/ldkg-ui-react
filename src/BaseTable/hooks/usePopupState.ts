/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { useState, useCallback } from 'react';

export const usePopupState = (initialState: any) => {
  const [isPopupVisible, setPopupVisibility] = useState(initialState);
  const [popupCoords, setPopupCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const toggle = useCallback(() => setPopupVisibility((value: any) => !value), [setPopupVisibility]);
  const close = useCallback(() => setPopupVisibility(false), [setPopupVisibility]);
  const open = useCallback(() => setPopupVisibility(true), [setPopupVisibility]);

  return { isPopupVisible, toggle, close, open, popupCoords, setPopupCoords };
};
