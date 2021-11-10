export type ActionFunctionProps = {
  root: any;
  coll: unknown;
  selection: unknown[];
  options?: { [key: string]: unknown };
};

export type Actions = Partial<{ [key: string]: (args: ActionFunctionProps) => Promise<void> | void }>;
