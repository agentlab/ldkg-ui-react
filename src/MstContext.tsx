/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { createContext, PropsWithChildren } from 'react';
import { CellRendererRegistryEntry, RendererRegistryEntry } from './renderers';
import { registerMstViewDescrSchema, registerMstViewKindSchema } from './models/MstViewDescr';
import { Actions } from './actions';
import { TFormMstRepository } from './models/FormMstRepository';

export interface MstContextProps {
  store: TFormMstRepository;
  renderers: RendererRegistryEntry[];
  cells: CellRendererRegistryEntry[];
  actions: Actions;
}

export const MstContext = createContext<MstContextProps>({
  store: undefined!,
  renderers: [],
  cells: [],
  actions: {},
});

export const MstContextProvider = ({
  store,
  renderers,
  cells = [],
  children,
  actions = {},
}: PropsWithChildren<{
  store: TFormMstRepository;
  renderers: RendererRegistryEntry[];
  cells?: CellRendererRegistryEntry[];
  actions?: Actions;
}>): JSX.Element => {
  renderers.forEach((r) => {
    const mstVkeType = (r as any).mstVkeType;
    if (mstVkeType) {
      registerMstViewKindSchema(mstVkeType, true);
    }
    const mstVdeType = (r as any).mstVdeType;
    if (mstVdeType) {
      registerMstViewDescrSchema(mstVdeType, true);
    }
  });
  cells.forEach((с) => {
    const mstVkeType = (с as any).mstVkeType;
    if (mstVkeType) {
      registerMstViewKindSchema(mstVkeType, true);
    }
    const mstVdeType = (с as any).mstVdeType;
    if (mstVdeType) {
      registerMstViewDescrSchema(mstVdeType, true);
    }
  });
  return <MstContext.Provider value={{ store, renderers, cells, actions }}>{children}</MstContext.Provider>;
};
