export const formatWidth = (columns: any) => {
  let maxWidth = 0;

  columns.forEach((column: any) => {
    if (!column.width && typeof column.title === 'string') {
      let times = 20;
      if (column.title.length <= 2) times = 25;
      column.width = column.title.length * times;
    }

    maxWidth += column.width;
  });
  return [columns, maxWidth];
};
