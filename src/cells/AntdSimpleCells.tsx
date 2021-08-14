/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { get } from 'lodash-es';

import React from 'react';
import { Button, Card, Image, Row, Col, Rate } from 'antd';

import {
  rankWith,
  RankedTester,
  isBooleanControl,
  isDateTimeControl,
  isEnumControl,
  isIntegerControl,
  isNumberControl,
  isStringControl,
  uiTypeIs,
} from '../testers';
import { withStoreToCellProps } from '../util/ContextToProps';

import { AntdCheckbox } from '../antd-controls/AntdCheckbox';
import { AntdInputDate } from '../antd-controls/AntdInputDate';
import { AntdInputNumber } from '../antd-controls/AntdInputNumber';
import { AntdInputText } from '../antd-controls/AntdInputText';
import { AntdSelect } from '../antd-controls/AntdSelect';
import { CellRenderer } from './CellRenderer';

import './cell.css';

/**
 * AntdBooleanCell
 */
export const AntdBooleanCell = (props: any) => {
  return <CellRenderer Cell={AntdCheckbox} {...props} />;
};
export const antdBooleanCellTester: RankedTester = rankWith(2, isBooleanControl);
export const AntdBooleanCellWithStore = withStoreToCellProps(AntdBooleanCell);

/**
 * AntdButtonCell
 */
export const AntdButtonCell = (props: any) => {
  const options = props.uiOptions;
  return (
    <Button size={'small'} style={options.style}>
      {options.label}
    </Button>
  );
};
export const antdButtonCellTester: RankedTester = rankWith(2, uiTypeIs('aldkg:Button'));
export const AntdButtonCellWithStore = withStoreToCellProps(AntdButtonCell);

/**
 * AntdEnumCell
 */
export const AntdEnumCell = (props: any /*: EnumCellProps & WithClassname*/) => <AntdSelect {...props} />;
export const antdEnumCellTester: RankedTester = rankWith(2, isEnumControl);
export const AntdEnumCellWithStore = withStoreToCellProps(AntdEnumCell);

/**
 * AntdNumberCell & AntdIntegerCell
 */
export const AntdNumberCell = (props: any) => {
  return <CellRenderer Cell={AntdInputNumber} {...props} />;
};

export const antdIntegerCellTester: RankedTester = rankWith(2, isIntegerControl);
export const AntdIntegerCellWithStore = withStoreToCellProps(AntdNumberCell);

export const antdNumberCellTester: RankedTester = rankWith(2, isNumberControl);
export const AntdNumberCellWithStore = withStoreToCellProps(AntdNumberCell);

/**
 * AntdImageCell
 */
export const AntdImageCell = (props: any) => {
  const { data } = props;
  return <Image style={{ height: '100%', width: '100%' }} src={data[0]} />;
};
export const antdImageCellTester: RankedTester = rankWith(2, uiTypeIs('aldkg:ImageCell'));
export const AntdImageCellWithStore = withStoreToCellProps(AntdImageCell);

/**
 * AntdRateCell
 */
export const AntdRateCell = (props: any /*: EnumCellProps & WithClassname*/) => {
  return (
    <React.Fragment>
      <Rate
        style={{ fontSize: '14px', color: 'rgb(255,140,0)', marginTop: '7px' }}
        allowHalf
        disabled
        defaultValue={props.data}
      />
      <span style={{ padding: '4px', fontSize: '12px', fontWeight: 500 }}>{`(${props.data})`}</span>
    </React.Fragment>
  );
};
export const antdRateCellTester: RankedTester = rankWith(5, uiTypeIs('aldkg:Rate'));
export const AntdRateCellWithStore = withStoreToCellProps(AntdRateCell);

/**
 * AntdTextCell
 */
export const AntdTextCell = (props: any) => {
  return <CellRenderer Cell={AntdInputText} {...props} />;
};
export const antdTextCellTester: RankedTester = rankWith(1, isStringControl);
export const AntdTextCellWithStore = withStoreToCellProps(AntdTextCell);

/**
 * AntdTimeCell
 */
export const AntdTimeCell = (props: any) => {
  return <CellRenderer Cell={AntdInputDate} {...props} />;
};
export const antdTimeCellTester: RankedTester = rankWith(2, isDateTimeControl);
export const AntdTimeCellWithStore = withStoreToCellProps(AntdTimeCell);
