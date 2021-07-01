import React from 'react';

import { withStoreToCellProps } from '../util/ContextToProps';
import { Rate } from 'antd';

import { uiTypeIs, rankWith, RankedTester } from '../testers';

export const AntdCellRateWidget = (props: any /*: EnumCellProps & WithClassname*/) => {
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

/**
 * Default tester for enum controls.
 * @type {RankedTester}
 */
export const antdCellRateWidgetTester: RankedTester = rankWith(5, uiTypeIs('Rate'));

export const AntdCellRateWidgetWithStore = withStoreToCellProps(AntdCellRateWidget);
