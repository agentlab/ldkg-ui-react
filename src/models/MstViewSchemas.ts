/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { types } from 'mobx-state-tree';

import { MstViewKindElement } from './MstViewDescr';

export const MstVerticalLayout = types.compose(
  'MstVerticalLayout',
  MstViewKindElement,
  types.model({
    '@type': types.literal('aldkg:VerticalLayout'),
  }),
);
