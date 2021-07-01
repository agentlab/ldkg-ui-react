import React from 'react';

import { uiTypeIs, rankWith, RankedTester } from '../testers';
import { withStoreToCellProps } from '../util/ContextToProps';
import { Image } from 'antd';
import chart1 from './images/chart_1.png';
import chart2 from './images/chart_2.png';
import chart3 from './images/chart_3.png';
import chart4 from './images/chart_4.png';

const template: any = {
  'https://www.wildberries.ru/catalog/15570386/detail.aspx': chart1,
  'https://www.wildberries.ru/catalog/15622789/detail.aspx': chart2,
  'https://www.wildberries.ru/catalog/16170086/detail.aspx': chart3,
  'https://www.wildberries.ru/catalog/18247707/detail.aspx': chart4,
};

export const AntdCellG2 = (props: any) => {
  console.log('PROPS', props);
  return <Image src={template[props.data['@id']]} />;
};

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const antdCellG2Tester: RankedTester = rankWith(2, uiTypeIs('G2'));

export const AntdCellG2WithStore = withStoreToCellProps(AntdCellG2);
