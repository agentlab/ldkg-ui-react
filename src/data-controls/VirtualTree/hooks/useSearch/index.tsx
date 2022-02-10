import React, { useState, useCallback, useMemo } from 'react';
import { Key } from 'rc-tree/lib/interface';
import { searchEdit, findExpandedKeys } from './utils';
import { FormattedData } from './types';
import { TreeItem } from '../../types';

type ReturnShape<T> = {
  formattedData: FormattedData<T>[];
  searchValue: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchValue: (value: string) => void;
};

type Props<T> = {
  dataSource: T[];
  baseExpandedKeys: Key[];
  titlePropName: string;
  setExpandedKeys: (keys: Key[]) => void;
};

export function useSearch<T extends TreeItem<T>>({
  baseExpandedKeys,
  dataSource,
  titlePropName,
  setExpandedKeys,
}: Props<T>): ReturnShape<T> {
  const [searchValue, setSearchValue] = useState<string>('');

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value) {
        const { expandedKeys } = findExpandedKeys(dataSource, value, titlePropName);
        setExpandedKeys(expandedKeys);
      } else {
        setExpandedKeys(baseExpandedKeys);
      }
      setSearchValue(value);
    },
    [baseExpandedKeys, dataSource, titlePropName, setExpandedKeys, setSearchValue],
  );

  const formattedData = useMemo(
    () => searchEdit(dataSource, searchValue, titlePropName),
    [dataSource, searchValue, titlePropName],
  );

  return { formattedData, searchValue, onSearch, setSearchValue };
}
