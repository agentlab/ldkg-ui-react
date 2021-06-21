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
import { FormsCell, FormsRenderer } from './Form';

export interface MstContextProps {
  store: any;
  renderers: FormsRenderer[];
  cells: FormsCell[];
}

export const MstContext = createContext<MstContextProps>({
  store: {},
  renderers: [],
  cells: [],
});

export const MstContextProvider = ({ store, renderers, cells = [], children }: PropsWithChildren<any>): JSX.Element => {
  return <MstContext.Provider value={{ store, renderers, cells }}>{children}</MstContext.Provider>;
};
