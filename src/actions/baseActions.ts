import { ActionFunctionProps } from './types';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';

export const addObjects = (props: ActionFunctionProps) => {};

export const deleteObjects = (props: ActionFunctionProps) => {};

export const addConectionToTarget = ({ root, coll, selection, options }: ActionFunctionProps) => {
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
