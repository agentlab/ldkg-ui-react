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
