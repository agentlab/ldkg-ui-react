/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { useEffect, useMemo } from 'react';
import { SelectionStore } from '../models/SelectionStore';

type Props = {
  sourceData: any;
};

export const useSelection = ({ sourceData }: Props) => {
  const selection = useMemo(() => SelectionStore.create({ selection: {} }), []);

  useEffect(() => selection.setItems(sourceData), [sourceData, selection]);

  return { selection };
};
