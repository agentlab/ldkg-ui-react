/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
export const regExpValidation = (data: any, propsToValidator: any) => {
  const re = new RegExp(propsToValidator.regExp);
  return re.test(data.toString());
};
