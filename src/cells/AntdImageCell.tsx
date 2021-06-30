import React from 'react';

import { uiTypeIs, rankWith, RankedTester } from '../testers';
import { withStoreToCellProps } from '../util/ContextToProps';
import { Image } from 'antd';

export const AntdImageCell = (props: any) => {
  const { data } = props;
  console.log('data', data);
  return <Image src={data} />;
};

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const antdImageCellTester: RankedTester = rankWith(2, uiTypeIs('ImageCell'));

export const AntdImageCellWithStore = withStoreToCellProps(AntdImageCell);
