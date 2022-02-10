import { loop } from './loop';
import { Key } from 'rc-tree/lib/interface';
import { TreeItem } from '../types';

export function onSortChildren<T extends TreeItem<T>>(
  key: Key,
  order: string,
  dataSource: T[],
  treeData: T[],
  titlePropName: string,
  setTreeData: (data: T[]) => void,
  sortBy: (data: T[], rules: any[]) => T[],
) {
  const data = [...treeData];
  loop(data, key, (item: T) => {
    if (item.children) {
      item.children.reverse();
      if (order === 'noSort') {
        loop(dataSource, key, (i: any) => {
          item.children = i.children;
        });
      } else if (order === 'ASC') {
        item.children = sortBy(item.children, [
          function (o: any) {
            return o[titlePropName];
          },
        ]);
      } else {
        item.children = sortBy(item.children, [
          function (o: any) {
            return o[titlePropName];
          },
        ]).reverse();
      }
    }
  });
  setTreeData(data);
}
