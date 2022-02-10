import { Key } from 'rc-tree/lib/interface';
import { TreeItem } from '../types';

export function loop<T extends TreeItem<T>>(data: T[], key: Key, callback: any, node?: T) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].key === key) {
      return callback(data[i], i, data, node);
    }
    if (data[i].children) {
      loop(data[i].children as T[], key, callback, data[i]);
    }
  }
}
