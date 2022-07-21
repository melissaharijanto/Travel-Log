import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import AccommodationTab from '../AccommodationTab';
import Accommodation from '../../../../assets/images/Accommodation.png';

const mockOnPress = jest.fn();
const eventData = {
  nativeEvent: {
    pageX: 20,
    pageY: 30,
  },
};

describe('AccommodationTab', () => {
  describe('should render Accommodation Icon', () => {
    it('Test 1', () => {
      const screen = render(<AccommodationTab />);
      const image = screen.getByRole('image');
      expect(image).not.toBeNull();
      expect(image.props.source).toEqual(Accommodation);
    });
  });

  describe('test styles', () => {
    it('container style', () => {
      const screen = render(<AccommodationTab text="Hello" subtext="World" />);
      const button = screen.getByTestId('button');
      expect(button.props.style.backgroundColor).toBe('#70D9D320');
      expect(button.props.style.borderRadius).toBe(10);
      expect(button.props.style.padding).toBe(8);
      expect(button.props.style.marginVertical).toBe(5);
    });

    it('icon style', () => {
      const screen = render(<AccommodationTab text="Hello" subtext="World" />);
      const image = screen.getByRole('image');
      expect(image.props.style[0].width).toBe(50);
      expect(image.props.style[0].height).toBe(50);
      expect(image.props.style[0].marginLeft).toBe(5);
      expect(image.props.style[0].marginRight).toBe(13);
    });

    it('text style', () => {
      const screen = render(<AccommodationTab text="Hello" subtext="World" />);
      const text = screen.getByText('Hello');
      const subtext = screen.getByText('World');

      expect(text.props.style.fontFamily).toBe('Poppins-SemiBold');
      expect(text.props.style.fontSize).toBe(15);
      expect(text.props.style.color).toBe('#000000');

      expect(subtext.props.style.fontFamily).toBe('Poppins-Regular');
      expect(subtext.props.style.fontSize).toBe(15);
      expect(subtext.props.style.color).toBe('#B1B1B1');
    });
  });

  describe('should be pressable', () => {
    it('Test 1', () => {
      const screen = render(
        <AccommodationTab
          text="Hilton Hotel"
          subtext="09/25/2022 - 12/29/22"
          onPress={mockOnPress}
        />,
      );
      fireEvent.press(screen.getByText('Hilton Hotel'), eventData);
      expect(mockOnPress).toHaveBeenCalledWith(eventData);
    });
  });

  describe('should render the correct text', () => {
    it('Test 1', () => {
      const screen = render(
        <AccommodationTab
          text="Hilton Hotel"
          subtext="09/25/2022 - 12/29/22"
        />,
      );
      const accommodationText = screen.getByText(/Hilton Hotel/i);
      const accommodationSubtext = screen.getByText('09/25/2022 - 12/29/22');

      expect(accommodationText.props.children).not.toBeNull();
      expect(accommodationText.props.children).toBe('Hilton Hotel');
      expect(accommodationText.props.children).not.toBe('Four Seasons Hotel');
      expect(accommodationText.props.children).not.toBe(
        'Some Random Accommodation Name',
      );

      expect(accommodationSubtext.props.children).not.toBeNull();
      expect(accommodationSubtext.props.children).toBe('09/25/2022 - 12/29/22');
      expect(accommodationText.props.children).not.toBe('25/25/25 - 25/25/25');
      expect(accommodationText.props.children).not.toBe('Some Random Text');
    });

    it('Test 2', () => {
      const screen = render(<AccommodationTab text="" subtext="" />);
      const accommodationText = screen.queryByText('Random Accommodation Name');
      const accommodationSubtext = screen.queryByText('Random Subtext');
      expect(accommodationText).toBeNull();
      expect(accommodationSubtext).toBeNull();
    });
  });
});
