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
import { Component } from 'react';

/**
 * Props of an {@link UnknownRenderer}
 */
export interface UnknownRendererProps {
  /**
   * The type for which no renderer has been found.
   */
  type: 'renderer' | 'cell';
  elementId: string;
  elementType: string;
}

/**
 * A renderer that will be used in case no other renderer is applicable.
 */
export class UnknownRenderer extends Component<UnknownRendererProps, any> {
  render() {
    return (
      <div style={{ color: 'red' }}>
        No applicable {this.props.type} found for element with id={this.props.elementId} and type=
        {this.props.elementType}.
      </div>
    );
  }
}
