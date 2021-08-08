/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
export const viewDescrCollConstr = {
  '@id': 'rm:Views_Coll',
  entConstrs: [
    {
      '@id': 'rm:Views_EntConstr0',
      schema: 'rm:ViewShape',
    },
  ],
};

export const viewKindCollConstr = {
  '@id': 'aldkg:ViewKinds_Coll',
  entConstrs: [
    {
      '@id': 'aldkg:ViewKinds_EntConstr0',
      schema: 'aldkg:ViewKindShape',
    },
  ],
};
