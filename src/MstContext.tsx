/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/
import React, { createContext, PropsWithChildren } from 'react';

export const MstContext = createContext<any>({});

export const MstContextProvider = ({ rootStore, children }: PropsWithChildren<any>) => {
  return <MstContext.Provider value={{ rootStore }}>{children}</MstContext.Provider>;
};
