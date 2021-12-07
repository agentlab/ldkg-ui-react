export const createSort = (order: string[]) => (item1: any, item2: any) => {
  const idx1 = order.indexOf(item1.key);
  const idx2 = order.indexOf(item2.key);
  if (idx1 < idx2) return 1;
  if (idx1 > idx2) return -1;
  return 0;
};
