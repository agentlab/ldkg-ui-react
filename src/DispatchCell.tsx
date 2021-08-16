/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { isEqual, maxBy } from 'lodash-es';
import React, { useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { UnknownRenderer } from './UnknownRenderer';
import { ErrorFallback, DispatchCellProps, FormsCell, RenderCellProps } from './Form';
import { MstContext } from './MstContext';

/**
 * Dispatch renderer component for cells.
 */
export const DispatchCell: React.FC<DispatchCellProps> = React.memo(
  ({ data, onMeasureChange, uri, schema, viewKindElement, viewKind, enabled, id, CKey, rowData, ...rest }) => {
    const { cells } = useContext(MstContext);
    const renderer = maxBy(cells, (r) => r.tester(viewKindElement, schema));
    if (renderer === undefined || renderer.tester(viewKindElement, schema) === -1) {
      return (
        <td>
          <UnknownRenderer
            type={'renderer'}
            elementId={viewKindElement['@id']}
            elementType={viewKindElement['@type']}
          />
        </td>
      );
    } else {
      const Render: React.FC<RenderCellProps> = (renderer as FormsCell).cell;
      return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
          <Render
            CKey={CKey}
            data={data}
            rowData={rowData}
            onMeasureChange={onMeasureChange}
            schema={schema}
            viewKindElement={viewKindElement}
            uri={uri}
            enabled={enabled}
            viewKind={viewKind}
            id={id}
            {...rest}
          />
        </ErrorBoundary>
      );
    }
  },
  (prevProps: any, nextProps: any) => isEqual(prevProps, nextProps),
);
