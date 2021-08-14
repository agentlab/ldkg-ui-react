import React from 'react';

import { uiTypeIs, rankWith, RankedTester } from '../testers';
import { withStoreToCellProps } from '../util/ContextToProps';
import { Image } from 'antd';

const template: any = {
  'https://www.wildberries.ru/catalog/15570386/detail.aspx': '/img/chart_1.png',
  'https://www.wildberries.ru/catalog/15622789/detail.aspx': '/img/chart_2.png',
  'https://www.wildberries.ru/catalog/16170086/detail.aspx': '/img/chart_3.png',
  'https://www.wildberries.ru/catalog/18247707/detail.aspx': '/img/chart_4.png',
};
export const AntdCellG2 = (props: any) => {
  return <Image style={{ height: '217px' }} src={template[props.data['@id']]} />;
};

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const antdCellG2Tester: RankedTester = rankWith(2, uiTypeIs('aldkg:G2'));

export const AntdCellG2WithStore = withStoreToCellProps(AntdCellG2);
