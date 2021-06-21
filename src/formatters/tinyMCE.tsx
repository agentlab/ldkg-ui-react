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
import { isEqual } from 'lodash-es';

export const TinyMCE: any = React.memo(
  ({ value, isScrolling, onMeasureChange, height }: any) => {
    return (
      <div
        className='mce-content-body'
        style={{ borderColor: 'rgba(0,0,0,0)' }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  },
  (prevProps: any, nextProps: any) => isEqual(prevProps, nextProps),
);
