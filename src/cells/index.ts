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
import { antdBooleanCellTester, AntdBooleanCellWithStore } from './AntdBooleanCell';
import { antdEnumCellTester, AntdEnumCellWithStore } from './AntdEnumCell';
import {
  antdIntegerCellTester,
  AntdIntegerCellWithStore,
  antdNumberCellTester,
  AntdNumberCellWithStore,
} from './AntdNumberCell';
import { antdTextCellTester, AntdTextCellWithStore } from './AntdTextCell';
import { antdTimeCellTester, AntdTimeCellWithStore } from './AntdTimeCell';
import { tinyMCECellTester, TinyMCECellWithStore } from './TinyMCECell';
import { antdImageCellTester, AntdImageCellWithStore } from './AntdImageCell';
import { antdCellCardLayoutTester, AntdCellCardLayout } from './AntdCellCardLayout';
import { antdHorizontalLayoutTester, AntdHorizontalLayoutRenderer } from './AntdCellHorizontalLayout';
import { antdCellRateWidgetTester, AntdCellRateWidgetWithStore } from './AntdCellRateWidget';
import { antdCellG2Tester, AntdCellG2 } from './AntdCellG2';
import { antdButtonCellTester, AntdButtonCellWithStore } from './AntdButtonCell';

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
  { tester: antdHorizontalLayoutTester, cell: AntdHorizontalLayoutRenderer },
  { tester: antdCellRateWidgetTester, cell: AntdCellRateWidgetWithStore },
  { tester: antdCellG2Tester, cell: AntdCellG2 },
  { tester: antdButtonCellTester, cell: AntdButtonCellWithStore },
];

export * from './AntdBooleanCell';
export * from './AntdEnumCell';
export * from './AntdNumberCell';
export * from './AntdTextCell';
export * from './AntdTimeCell';
export * from './TinyMCECell';
