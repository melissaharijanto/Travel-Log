import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import DayTab from '../DayTab';

const mockOnPress = jest.fn();
const pressed = 'pressed';

describe('DayTab', () => {
  describe('renders text properly', () => {
    it('test 1', () => {
      const screen = render(<DayTab subtext="25 August 2022" text="Day 1" />);
      const text = screen.getByText('Day 1');
      expect(text.props.children).toBe('Day 1');
      const subtext = screen.getByText('25 August 2022');
      expect(subtext.props.children).toBe('25 August 2022');
    });

    it('test 2', () => {
      const screen = render(
        <DayTab subtext="20 September 2021" text="Day 10" />,
      );
      const text = screen.getByText('Day 10');
      expect(text.props.children).toBe('Day 10');
      const subtext = screen.getByText('20 September 2021');
      expect(subtext.props.children).toBe('20 September 2021');
    });
  });

  describe('is pressable', () => {
    it('Test 1', () => {
      const screen = render(
        <DayTab text="test" subtext="button" onPress={mockOnPress} />,
      );
      const button = screen.getByText('test');
      fireEvent.press(button, pressed);
      expect(mockOnPress).toHaveBeenCalledWith(pressed);
    });
  });

  describe('style check', () => {
    it('Test 1', () => {
      const screen = render(
        <DayTab text="test" subtext="button" onPress={mockOnPress} />,
      );
      const button = screen.getByTestId('container');
      expect(button.props.style).toEqual({
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        width: '100%',
        height: 70,
        padding: 8,
        marginVertical: 5,
        borderColor: '#70D9D350',
        borderWidth: 2,
      });

      const text = screen.getByText('test');
      expect(text.props.children).toBe('test');
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-ExtraBold',
        color: '#3B4949',
        fontSize: 24,
        paddingTop: 5,
      });

      const subtext = screen.getByText('button');
      expect(subtext.props.children).toBe('button');
      expect(subtext.props.style).toEqual({
        fontFamily: 'Poppins-Bold',
        color: '#3B4949',
        fontSize: 14,
        paddingLeft: 15,
        paddingTop: 5,
      });

      const textAlign = screen.getByTestId('text align');
      expect(textAlign.props.style[0]).toEqual({
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#70D9D350',
      });
      expect(textAlign.props.style[1]).toEqual({
        width: '25%',
      });
      const subtextAlign = screen.getByTestId('subtext align');
      expect(subtextAlign.props.style).toEqual({
        justifyContent: 'center',
        width: '75%',
      });
    });
  });
});
