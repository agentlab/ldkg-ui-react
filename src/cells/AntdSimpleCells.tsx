/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useEffect, useState, useRef } from 'react';
import { Button, Image, Rate } from 'antd';

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
export const AntdBooleanCell = (props: any): JSX.Element => {
  return <CellRenderer Cell={AntdCheckbox} {...props} />;
};
export const antdBooleanCellTester: RankedTester = rankWith(2, isBooleanControl);
export const AntdBooleanCellWithStore = withStoreToCellProps(AntdBooleanCell);

/**
 * AntdButtonCell
 */
export const AntdButtonCell = (props: any): JSX.Element => {
  const options = props.uiOptions;
  const [fontSize, setFontSize] = useState<number>();
  const cellRef = useRef<any>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setFontSize(entries[0].contentRect.width * options.relativeFont);
    });

    if (options.relativeFont) {
      const antRow = cellRef.current.parentNode.parentNode;
      resizeObserver.observe(antRow);
    }

    return () => resizeObserver.disconnect();
  }, []);
  return (
    <button ref={cellRef} style={{ fontSize, verticalAlign: 'middle', ...options.style }}>
      {options.label}
    </button>
  );
};
export const antdButtonCellTester: RankedTester = rankWith(2, uiTypeIs('aldkg:Button'));
export const AntdButtonCellWithStore = withStoreToCellProps(AntdButtonCell);

/**
 * AntdEnumCell
 */
export const AntdEnumCell = (props: any /*: EnumCellProps & WithClassname*/): JSX.Element => <AntdSelect {...props} />;
export const antdEnumCellTester: RankedTester = rankWith(2, isEnumControl);
export const AntdEnumCellWithStore = withStoreToCellProps(AntdEnumCell);

/**
 * AntdNumberCell & AntdIntegerCell
 */
export const AntdNumberCell = (props: any): JSX.Element => {
  return <CellRenderer Cell={AntdInputNumber} {...props} />;
};

export const antdIntegerCellTester: RankedTester = rankWith(2, isIntegerControl);
export const AntdIntegerCellWithStore = withStoreToCellProps(AntdNumberCell);

export const antdNumberCellTester: RankedTester = rankWith(2, isNumberControl);
export const AntdNumberCellWithStore = withStoreToCellProps(AntdNumberCell);

/**
 * AntdImageCell
 */
export const AntdImageCell = (props: any): JSX.Element => {
  const { data } = props;
  return (
    <Image width={'100%'} src={Array.isArray(data) ? data[0] || '' : data && typeof data === 'string' ? data : ''} />
  );
};
export const antdImageCellTester: RankedTester = rankWith(2, uiTypeIs('aldkg:ImageCell'));
export const AntdImageCellWithStore = withStoreToCellProps(AntdImageCell);

/**
 * AntdRateCell
 */
export const AntdRateCell = (props: any /*: EnumCellProps & WithClassname*/): JSX.Element => {
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
export const AntdTextCell = (props: any): JSX.Element => {
  return <CellRenderer Cell={AntdInputText} {...props} />;
};
export const antdTextCellTester: RankedTester = rankWith(1, isStringControl);
export const AntdTextCellWithStore = withStoreToCellProps(AntdTextCell);

/**
 * AntdTimeCell
 */
export const AntdTimeCell = (props: any): JSX.Element => {
  return <CellRenderer Cell={AntdInputDate} {...props} />;
};
export const antdTimeCellTester: RankedTester = rankWith(2, isDateTimeControl);
export const AntdTimeCellWithStore = withStoreToCellProps(AntdTimeCell);
