import { Key } from 'rc-tree/lib/interface';

export type TreeItem<T> = { children?: T[]; key: Key };
