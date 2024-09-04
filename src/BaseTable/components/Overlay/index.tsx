/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';
import { Spin } from 'antd';
import './index.css';

type Props = {
  isLoading: boolean;
};

export const Overlay = ({ isLoading }: Props) => {
  return isLoading ? (
    <div className='overlay'>
      <Spin className='spin' />
    </div>
  ) : null;
};
