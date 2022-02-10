import { TreeItem } from '../../types';

export type FormattedData<T> = T & {
  editedTitle?: React.ReactNode;
  children?: FormattedData<T>[];
};

export type SearchEditFunction = <T extends TreeItem<T>>(
  dataSource: T[],
  searchValue: string,
  titlePropName: string,
) => FormattedData<T>[];
