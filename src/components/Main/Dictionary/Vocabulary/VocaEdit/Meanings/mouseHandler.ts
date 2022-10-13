const mouseHandler =
  (
    condition: boolean,
    order: number,
    elem: HTMLElement | null,
    {
      add,
      remove
    }: {
      add?: string[];
      remove?: string[];
    }
  ) =>
  () => {
    if (!condition || !elem) {
      return;
    }
    [...elem.children]
      .filter((_, index) => index === order - 2 || index === order - 1)
      .forEach((child) => {
        child.classList.add(...(add ?? []));
        child.classList.remove(...(remove ?? []));
      });
  };

export default mouseHandler;
