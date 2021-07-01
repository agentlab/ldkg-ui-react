import React from 'react';

import { uiTypeIs, rankWith, RankedTester } from '../testers';
import { withStoreToCellProps } from '../util/ContextToProps';
import { Image } from 'antd';
import { useEffect } from '@storybook/addons';
import './cell.css';

export const AntdImageCell = (props: any) => {
  const { data } = props;
  return <Image style={{ height: '100%', width: '100%' }} src={data[0]} />;
};

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const antdImageCellTester: RankedTester = rankWith(2, uiTypeIs('ImageCell'));

export const AntdImageCellWithStore = withStoreToCellProps(AntdImageCell);
