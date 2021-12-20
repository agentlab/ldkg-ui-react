/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { RendererRegistryEntry } from '../renderers';
import { BaseTableArrayControlWithStore, tableArrayControlTester } from './BaseTableArrayControlRenderer';

export * from './basetable/BaseTableMenu';
export * from './basetable/ReactBaseTable';
//export * from './ForDelete';
export * from './basetable/TableCellsAndRows';
export * from './basetable/TableHeader';
export * from './basetable/TableSettingMenu';

export * from './BaseTableControl';
export * from './TableCell';

// deprecated for removal
/*export const tableRenderers: RendererRegistryEntry[] = [
  {
    tester: tableArrayControlTester,
    renderer: BaseTableArrayControlWithStore,
  },
];*/
