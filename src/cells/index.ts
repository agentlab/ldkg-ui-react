/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { CellRendererRegistryEntry } from '../renderers';
import {
  antdBooleanCellTester,
  AntdBooleanCellWithStore,
  antdButtonCellTester,
  AntdButtonCellWithStore,
  antdEnumCellTester,
  AntdEnumCellWithStore,
  antdIntegerCellTester,
  AntdIntegerCellWithStore,
  antdImageCellTester,
  AntdImageCellWithStore,
  antdNumberCellTester,
  AntdNumberCellWithStore,
  antdRateCellTester,
  AntdRateCellWithStore,
  antdTextCellTester,
  AntdTextCellWithStore,
  antdTimeCellTester,
  AntdTimeCellWithStore,
} from './AntdSimpleCells';
import { tinyMCECellTester, TinyMCECellWithStore } from './TinyMCECell';
import { antdCellCardLayoutTester, AntdCellCardLayout } from './AntdCellCardLayout';
import { antdCellHorizontalLayoutTester, AntdCellHorizontalLayoutRenderer } from './AntdCellHorizontalLayout';
import { antdCellG2Tester, AntdCellG2 } from './AntdCellG2';

export const antdCells: CellRendererRegistryEntry[] = [
  { tester: antdBooleanCellTester, cell: AntdBooleanCellWithStore },
  { tester: antdEnumCellTester, cell: AntdEnumCellWithStore },
  { tester: antdIntegerCellTester, cell: AntdIntegerCellWithStore },
  { tester: antdNumberCellTester, cell: AntdNumberCellWithStore },
  { tester: antdTextCellTester, cell: AntdTextCellWithStore },
  { tester: antdTimeCellTester, cell: AntdTimeCellWithStore },
  { tester: tinyMCECellTester, cell: TinyMCECellWithStore },
  { tester: antdImageCellTester, cell: AntdImageCellWithStore },
  { tester: antdCellCardLayoutTester, cell: AntdCellCardLayout },
  { tester: antdCellHorizontalLayoutTester, cell: AntdCellHorizontalLayoutRenderer },
  { tester: antdRateCellTester, cell: AntdRateCellWithStore },
  { tester: antdCellG2Tester, cell: AntdCellG2 },
  { tester: antdButtonCellTester, cell: AntdButtonCellWithStore },
];

export * from './AntdSimpleCells';
export * from './TinyMCECell';
export * from './AntdCellCardLayout';
export * from './AntdCellHorizontalLayout';
export * from './AntdCellG2';
