/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { addObjects, deleteObjects, addConnectionToTarget, addTreeObj } from './baseActions';
import { Actions } from './types';
export * from './types';
export * from './utils';

export const actions: Actions = {
  'ldkg:addObjects': addObjects,
  'ldkg:deleteObjects': deleteObjects,
  'ldkg:addConnectionToTarget': addConnectionToTarget,
  'ldkg:addTreeObj': addTreeObj,
};
