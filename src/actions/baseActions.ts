/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { ActionFunctionProps } from './types';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';

export const addObjects = ({ root, coll, selection, options }: ActionFunctionProps) => {
  console.log('SELECTION', selection);
  //coll.testOnAddObjs([selection]);
};

export const addTreeObj = ({ root, coll, selection, options }: ActionFunctionProps) => {
  const node = selection[0] as any;
  const newObj = {
    [node.titlePropName]: 'New node',
    [node.parentKey]: node['@id'],
  };
  return coll.testOnAddObjs([newObj]);
};
export const deleteObjects = ({ root, coll, selection, options }: ActionFunctionProps) => {
  coll.testOnDeleteObjs(selection.map((obj: any) => obj['@id']));
};

export const addConnectionToTarget = ({ root, coll, selection, options }: ActionFunctionProps) => {
  const target = options?.target;
  if (target) {
    const targetColl = root.getColl(target);
    const targetData = targetColl?.data;
    if (targetData) {
      const snapData = getSnapshot(targetData) as any;
      const newData = [...snapData, ...selection];
      applySnapshot(targetData, newData);
    }
  }
};
