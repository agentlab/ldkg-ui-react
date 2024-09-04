/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { Actions } from './types';
import { NoTitleProvided } from './constants';

type MapViewKindPropsToActionsProps = {
  actions: Actions;
  viewKindActionProps?: { '@id': string; '@type': string; title?: string; options: { [key: string]: unknown } }[];
  coll: unknown;
  root: any;
};

type ReturnShape = {
  title: string;
  action: (selection: unknown[]) => Promise<void> | void;
};
export const mapViewKindPropsToActions = ({
  actions,
  viewKindActionProps,
  coll,
  root,
}: MapViewKindPropsToActionsProps): ReturnShape[] | undefined =>
  viewKindActionProps &&
  viewKindActionProps.reduce((acc: ReturnShape[], props): ReturnShape[] => {
    const actionType = props['@type'];
    if (actionType in actions) {
      acc.push({
        title: props.title || NoTitleProvided,
        action: (selection: unknown[]) => actions[actionType]?.({ coll, options: props.options, selection, root }),
      });
    }
    return acc;
  }, [] as ReturnShape[]);
