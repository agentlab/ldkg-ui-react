import React from 'react';

import { uiTypeIs, rankWith, RankedTester } from '../testers';
import { withStoreToCellProps } from '../util/ContextToProps';
import { Image } from 'antd';

export const AntdCellG2 = (props: any) => {
  return (
    <Image
      src={
        'https://lh3.googleusercontent.com/proxy/uz_yL8cj6Fu63l9018tT6gJhcdFloEGfiIOV5AM2uR0pjJ4q05uTnOsXtEJrGErxrc_35_rb_-_jqlXF0bNbVrJr01nb2CyZn0qx5fYdBW6D'
      }
    />
  );
};

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const antdCellG2Tester: RankedTester = rankWith(2, uiTypeIs('G2'));

export const AntdCellG2WithStore = withStoreToCellProps(AntdCellG2);
