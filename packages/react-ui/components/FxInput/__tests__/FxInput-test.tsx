import React from 'react';
import { mount } from 'enzyme';

import { FxInput, FxInputProps } from '../FxInput';
import { buildMountAttachTarget, getAttachedTarget } from '../../../lib/__tests__/testUtils';

const render = (
  props: FxInputProps = {
    onValueChange: () => {
      /**/
    },
  },
) => mount<FxInput, FxInputProps>(<FxInput {...props} />, { attachTo: getAttachedTarget() });

describe('FxInput', () => {
  buildMountAttachTarget();

  it('render without crash', () => {
    render();
  });

  it('programmatically set focus and blur', () => {
    const wrapper = render();
    const input = wrapper.find('input');

    wrapper.instance().focus();

    expect(document.activeElement).toBe(input.instance());

    wrapper.instance().blur();

    expect(document.activeElement).toBe(document.body);
  });
});
