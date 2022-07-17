import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import CustomButton from '../CustomButton';

const mockOnPress = jest.fn();
const eventData = {
  nativeEvent: {
    pageX: 20,
    pageY: 30,
  },
};

describe('CustomButton', () => {
  describe('should be pressable', () => {
    it('Test 1', () => {
      const screen = render(
        <CustomButton text="Custom Button" onPress={mockOnPress} />,
      );

      const button = screen.getByText('Custom Button');
      fireEvent.press(button, eventData);
      expect(mockOnPress).toHaveBeenCalledWith(eventData);
    });
  });

  describe('style check', () => {
    it('primary button', () => {
      const screen = render(
        <CustomButton
          text="Custom Button"
          onPress={mockOnPress}
          type="PRIMARY"
        />,
      );

      const button = screen.getByTestId('button');
      expect(button.props.style[0]).toEqual({
        width: '100%',
        borderRadius: 50,
        padding: 12,
        marginVertical: 5,
        alignItems: 'center',
      });
      expect(button.props.style[1]).toEqual({
        backgroundColor: '#17A8A0',
      });

      const text = screen.getByText('Custom Button');
      expect(text.props.style[0]).toEqual({});
      expect(text.props.style[1]).toEqual({
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
      });
    });

    it('secondary button', () => {
      const screen = render(
        <CustomButton
          text="Custom Button"
          onPress={mockOnPress}
          type="SECONDARY"
        />,
      );

      const button = screen.getByTestId('button');
      expect(button.props.style[0]).toEqual({
        width: '100%',
        borderRadius: 50,
        padding: 12,
        marginVertical: 5,
        alignItems: 'center',
      });
      expect(button.props.style[1]).toEqual({});

      const text = screen.getByText('Custom Button');
      expect(text.props.style[1]).toEqual({
        color: '#3B4949',
        fontFamily: 'Poppins-Regular',
        marginVertical: 5,
      });
    });
  });
});
