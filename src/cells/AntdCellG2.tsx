/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';
import { Image } from 'antd';

import { uiTypeIs, rankWith, RankedTester } from '../testers';
import { withStoreToCellProps } from '../util/ContextToProps';

const template: any = {
  'https://www.wildberries.ru/catalog/15570386/detail.aspx': '/img/chart_1.png',
  'https://www.wildberries.ru/catalog/15622789/detail.aspx': '/img/chart_2.png',
  'https://www.wildberries.ru/catalog/16170086/detail.aspx': '/img/chart_3.png',
  'https://www.wildberries.ru/catalog/18247707/detail.aspx': '/img/chart_4.png',
};
export const AntdCellG2 = (props: any): JSX.Element => {
  return <Image style={{ height: '217px' }} src={template[props.data['@id']]} />;
};

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const antdCellG2Tester: RankedTester = rankWith(2, uiTypeIs('aldkg:G2'));

export const AntdCellG2WithStore = withStoreToCellProps(AntdCellG2);
