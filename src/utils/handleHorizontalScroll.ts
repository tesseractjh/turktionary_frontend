import { WheelEvent } from 'react';

const handleHorizontalScroll = (event: Event) => {
  const { deltaY, currentTarget } = event as unknown as WheelEvent<HTMLElement>;
  const { offsetWidth, scrollWidth, scrollLeft } = currentTarget;
  if (offsetWidth + scrollLeft >= scrollWidth && deltaY > 0) return;
  if (scrollLeft === 0 && deltaY < 0) return;
  event.preventDefault();
  currentTarget.scrollLeft += deltaY > 0 ? 10 : -10;
};

export default handleHorizontalScroll;
