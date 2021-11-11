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
