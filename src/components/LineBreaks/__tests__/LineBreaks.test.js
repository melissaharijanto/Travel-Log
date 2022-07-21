import React from 'react';
import {render} from '@testing-library/react-native';
import * as LineBreaks from '../LineBreaks';

describe('LineBreaks', () => {
  describe('SmallLineBreak', () => {
    it('test 1', () => {
      const screen = render(<LineBreaks.SmallLineBreak />);
      const text = screen.getByTestId('text');
      expect(text).not.toBeNull();
    });
  });

  describe('FourLineBreaks', () => {
    it('test 1', () => {
      const screen = render(<LineBreaks.FourLineBreak />);
      const text = screen.getByTestId('text');
      expect(text.props.children).toEqual(['\n', '\n', '\n', '\n']);
    });
  });
});
