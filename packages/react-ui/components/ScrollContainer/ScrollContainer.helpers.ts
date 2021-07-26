import { Nullable } from '../../typings/utility-types';

import { MIN_SCROLL_SIZE } from './ScrollContainer.constants';
import { ScrollContainerScrollState, ScrollContainerScrollXState } from './ScrollContainer';

export const scrollSizeParametersNames = {
  x: {
    offset: 'offsetWidth',
    size: 'scrollWidth',
    pos: 'scrollLeft',
  },
  y: {
    offset: 'offsetHeight',
    size: 'scrollHeight',
    pos: 'scrollTop',
  },
} as const;

export const getScrollSizeParams = (inner: HTMLElement, axis: 'x' | 'y') => {
  const { offset, size, pos } = scrollSizeParametersNames[axis];

  const contentSize = inner[size];
  const scrollOffset = inner[pos];
  const containerSize = inner[offset];

  const scrollActive = containerSize < contentSize;

  let scrollSize = 0;
  let scrollPos = 0;

  if (scrollActive) {
    scrollSize = Math.max((containerSize / contentSize) * containerSize, MIN_SCROLL_SIZE);
    scrollPos = (scrollOffset / (contentSize - containerSize)) * (containerSize - scrollSize);
  }

  return {
    scrollActive,
    scrollSize,
    scrollPos,
  };
};

export const getScrollYOffset = (element: HTMLElement, container: HTMLElement) => {
  const elementOffset = element.offsetTop;

  if (container.scrollTop > elementOffset) {
    return elementOffset;
  }

  const offset = elementOffset + element.scrollHeight - container.offsetHeight;
  if (container.scrollTop < offset) {
    return offset;
  }

  return container.scrollTop;
};

export const getImmediateScrollYState = (inner: Nullable<HTMLElement>): ScrollContainerScrollState => {
  if (!inner || inner.scrollTop === 0) {
    return 'top';
  }

  if (inner.scrollTop === inner.scrollHeight - inner.clientHeight) {
    return 'bottom';
  }

  return 'scroll';
};

export const getImmediateScrollXState = (inner: Nullable<HTMLElement>): ScrollContainerScrollXState => {
  if (!inner || inner.scrollLeft === 0) {
    return 'left';
  }

  if (inner.scrollLeft === inner.scrollWidth - inner.clientWidth) {
    return 'right';
  }

  return 'scroll';
};