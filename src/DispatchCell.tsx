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

import { CellRendererRegistryEntry } from './renderers';
import { UnknownRenderer } from './UnknownRenderer';
import { ErrorFallback, DispatchCellProps, RenderCellProps } from './Form';
import { MstContext } from './MstContext';

/**
 * Dispatch renderer component for cells.
 */
export const DispatchCell: React.FC<DispatchCellProps> = React.memo(
  ({
    viewKind,
    viewKindElement,
    viewDescr,
    viewDescrElement,
    schema,
    data,
    onMeasureChange,
    uri,
    enabled,
    id,
    CKey,
    rowData,
    ...rest
  }) => {
    const { cells } = useContext(MstContext);
    if (schema && schema.items) schema = { ...schema, ...schema.items };
    const renderer: CellRendererRegistryEntry | undefined = maxBy(cells, (r: CellRendererRegistryEntry) =>
      r.tester(viewKindElement, schema),
    );
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
      const Render: React.FC<RenderCellProps> = renderer.cell;
      return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
          <Render
            viewKind={viewKind}
            viewKindElement={viewKindElement}
            viewDescr={viewDescr}
            viewDescrElement={viewDescrElement}
            schema={schema}
            CKey={CKey}
            data={data}
            rowData={rowData}
            onMeasureChange={onMeasureChange}
            uri={uri}
            enabled={enabled}
            id={id}
            {...rest}
          />
        </ErrorBoundary>
      );
    }
  },
  (prevProps: any, nextProps: any) => isEqual(prevProps, nextProps),
);
