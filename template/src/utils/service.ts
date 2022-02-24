export function addIdToList(list: any[]): any[] {
  if (!Array.isArray(list)) throw new Error('转化数据不是数组');
  return list.map(
    // eslint-disable-next-line no-return-assign
    (item: { id: any }, index: number) => {
      item.id = index + 1;
      return item;
    }
  );
}
