import React from 'react';
import {render} from '@testing-library/react-native';
import AccommodationMainTab from '../AccommodationMainTab';

describe('AccommodationMainTab', () => {
  describe('should render the text Accommodation', () => {
    it('should render the text Accommodation', () => {
      const screen = render(<AccommodationMainTab />);
      const accommodationText = screen.getByText(/Accommodation/i);
      expect(accommodationText.props.children).not.toBeNull();
      expect(accommodationText.props.children).toBeDefined();
      expect(accommodationText.props.children).toBe('Accommodation');
    });

    it('should not render any other text besides Accommodation', () => {
      const screen = render(<AccommodationMainTab />);
      const randomText = screen.queryByText('Whatever this is');
      expect(randomText).not.toBe('Accommodation');
    });
  });

  describe('style check', () => {
    it('container style', () => {
      const screen = render(<AccommodationMainTab />);
      const container = screen.getByTestId('button');
      expect(container.props.style.backgroundColor).toBe('#FFFFFF');
      expect(container.props.style.borderRadius).toBe(10);
      expect(container.props.style.width).toBe('100%');
      expect(container.props.style.height).toBe(70);
      expect(container.props.style.padding).toBe(8);
      expect(container.props.style.marginTop).toBe(10);
      expect(container.props.style.marginBottom).toBe(5);
      expect(container.props.style.borderColor).toBe('#70D9D350');
      expect(container.props.style.borderWidth).toBe(2);
    });
  });
});
