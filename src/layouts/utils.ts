/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { CSSProperties } from 'react';

export const convertSizeOptionToStyle = ({
  width,
  height,
}: {
  width: string | number;
  height: string | number;
}): CSSProperties => {
  const style: CSSProperties = {};
  if (height === 'all-empty-space') {
    style.flexGrow = 1;
  } else {
    style.height = height;
  }
  if (width === 'all-empty-space') {
    style.width = '100%';
  } else {
    style.width = width;
  }
  return style;
};
