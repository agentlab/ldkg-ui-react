import React from 'react';
import { rankWith, RankedTester, uiTypeIs } from '../testers';
import { Image } from 'antd';
import { withStoreToControlProps } from '../util/ContextToProps';

export const AntdImageControl = (props: any): JSX.Element => {
  const { uiOptions, data } = props;
  return (
    <Image
      height={'80%'}
      src={Array.isArray(data) ? data[0] || '' : data && typeof data === 'string' ? data : ''}
      fallback={uiOptions.fallback}
    />
  );
};

export const antdImageControlTester: RankedTester = rankWith(3, uiTypeIs('aldkg:Image'));
export const AntdImageControlWithStore = withStoreToControlProps(AntdImageControl);
