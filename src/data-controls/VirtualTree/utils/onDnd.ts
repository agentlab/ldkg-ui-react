import { loop } from './loop';
import { Key } from 'rc-tree/lib/interface';
import { TreeItem } from '../types';

export function onDrop<T extends TreeItem<T>>(
  info: any,
  treeData: T[],
  setTreeData: (data: T[]) => void,
  onDnD: (obj: any) => void,
) {
  const dropKey = info.node.props.eventKey;
  const dragKey = info.dragNode.props.eventKey;
  const dropPos = info.node.props.pos.split('-');
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
  const data = [...treeData];
  let parent = info.node['@id'];

  let dragObj: any;
  loop(data, dragKey, (item: T, index: number, arr: T[]) => {
    arr.splice(index, 1);
    dragObj = item;
  });

  if (!info.dropToGap) {
    loop(data, dropKey, (item: T) => {
      item.children = item.children || [];
      item.children.push(dragObj);
    });
  } else if ((info.node.props.children || []).length > 0 && info.node.props.expanded && dropPosition === 1) {
    loop(data, dropKey, (item: T) => {
      item.children = item.children || [];
      item.children.unshift(dragObj);
    });
  } else {
    let ar: any;
    let i: any;
    loop(data, dropKey, (item: T, index: number, arr: T[], node: any) => {
      ar = arr;
      i = index;
      parent = node['@id'];
    });
    if (dropPosition === -1) {
      ar.splice(i, 0, dragObj);
    } else {
      ar.splice(i + 1, 0, dragObj);
    }
  }
  onDnD({ childId: info.dragNode['@id'], parentId: parent });
  setTreeData(data);
}
