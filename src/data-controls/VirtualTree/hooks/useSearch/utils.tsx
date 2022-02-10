import React from 'react';
import { SearchEditFunction } from './types';
import { Key } from 'rc-tree/lib/interface';
import { FormattedTitle } from '../../components/FormattedTitle';
import { TreeItem } from '../../types';

export const searchEdit: SearchEditFunction = (dataSource, searchValue, titlePropName) =>
  dataSource.map((item) => {
    const title = (item as any)[titlePropName];
    const index = title.indexOf(searchValue);
    const beforeStr = title.substr(0, index);
    const afterStr = title.substr(index + searchValue.length);
    const foundTitle =
      index > -1 && searchValue !== '' ? (
        <FormattedTitle afterString={afterStr} beforeString={beforeStr} searchValue={searchValue} />
      ) : (
        title
      );

    if (item.children) {
      return {
        ...item,
        ...{ editedTitle: foundTitle, children: searchEdit(item.children, searchValue, titlePropName) },
      };
    }

    return {
      ...item,
      ...{ editedTitle: foundTitle },
    };
  });

type ReaturnShape = {
  expandedKeys: Key[];
  isAnyFit: boolean;
};
export function findExpandedKeys<T extends TreeItem<T>>(
  dataSource: T[],
  searchValue: string,
  titlePropName: string,
): ReaturnShape {
  let isAnyFit: boolean = false;
  let expandedKeys: Key[] = [];
  dataSource.forEach((item) => {
    let isAnyChildFit: boolean = false;
    if (item.children) {
      const ans = findExpandedKeys(item.children, searchValue, titlePropName);
      expandedKeys = expandedKeys.concat(ans.expandedKeys);
      isAnyChildFit = ans.isAnyFit;
    }

    if ((item as any)[titlePropName].indexOf(searchValue) > -1 || isAnyChildFit) {
      expandedKeys.push(item.key);
      isAnyFit = true;
    }
  });

  return { isAnyFit, expandedKeys };
}
