export type ActionFunctionProps = {
  root: any;
  coll: any;
  selection: unknown[];
  options?: { [key: string]: unknown };
};

export type Actions = Partial<{ [key: string]: (args: ActionFunctionProps) => Promise<void> | void }>;
