/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
export interface Relation {
  title: string;
  predicate: string;
  type?: string;
}

export interface FilterType {
  value: any[];
  valueName?: string[];
  title: string;
  property: string;
  relation: Relation;
}

export interface ValueOfFilter {
  value: any[];
  valueName?: string[];
}
