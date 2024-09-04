/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
export const createSort = (order: string[]) => (item1: any, item2: any) => {
  const idx1 = order.indexOf(item1.key);
  const idx2 = order.indexOf(item2.key);
  if (idx1 < idx2) return 1;
  if (idx1 > idx2) return -1;
  return 0;
};
