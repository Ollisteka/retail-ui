import React from 'react';
import { isFirefox } from '../utils';
import { Nullable } from '../../typings/utility-types';

// Checkbox not checked in Firefox if key of modifier was active
// shift+click, ctrl+click on Win and cmd+click on Mac
// https://bugzilla.mozilla.org/show_bug.cgi?id=559506
export const fixFirefoxModifiedClickOnLabel = (
  input: Nullable<HTMLInputElement>,
  e: React.MouseEvent<HTMLLabelElement>,
) => {
  if (input && !input.disabled && isFirefox && (e.shiftKey || e.ctrlKey || e.metaKey)) {
    // Currently only valid for Radio and Checkbox
    input.checked = !input.checked;
    const type = input.type;
    input.type = 'text';
    e.persist();
    input.dispatchEvent(new MouseEvent('change', e.nativeEvent));
    input.type = type;
  }
};