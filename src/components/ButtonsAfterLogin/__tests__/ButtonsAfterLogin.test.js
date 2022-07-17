import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import * as ButtonsAfterLogin from '../ButtonsAfterLogin';

const mockOnPress = jest.fn();
const eventData = {
  nativeEvent: {
    pageX: 20,
    pageY: 30,
  },
};

describe('ButtonsAfterLogin', () => {
  describe('ReusableButton', () => {
    it('Test 1 - text shows properly', () => {
      const screen = render(
        <ButtonsAfterLogin.ReusableButton text="Reusable Button" />,
      );
      const button = screen.getByText('Reusable Button');
      expect(button).not.toBeNull();
      expect(button.props.children).toBe('Reusable Button');
    });

    it('Test 2 - style check', () => {
      const screen = render(
        <ButtonsAfterLogin.ReusableButton text="Reusable Button" />,
      );
      const button = screen.getByTestId('button');

      expect(button.props.style).toEqual({
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#70DAD3',
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 8,
      });

      const text = screen.getByText('Reusable Button');
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-Medium',
        color: 'white',
        paddingHorizontal: '2%',
        paddingTop: '1%',
      });
    });

    it('Test 3 - should be pressable', () => {
      const screen = render(
        <ButtonsAfterLogin.ReusableButton
          text="Reusable Button"
          onPress={mockOnPress}
        />,
      );

      const button = screen.getByText('Reusable Button');
      fireEvent.press(button, eventData);
      expect(mockOnPress).toHaveBeenCalledWith(eventData);
    });
  });

  describe('UploadFiles', () => {
    it('should render upload files', () => {
      const screen = render(
        <ButtonsAfterLogin.UploadFiles onPress={mockOnPress} />,
      );
      const text = screen.getByText('Upload Files');
      expect(text).not.toBeNull();
      expect(text.props.children).toBe('Upload Files');
    });

    it('check styles', () => {
      const screen = render(
        <ButtonsAfterLogin.UploadFiles onPress={mockOnPress} />,
      );
      const button = screen.getByTestId('button');
      expect(button.props.style).toEqual({
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#70DAD3',
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 8,
      });

      const text = screen.getByText('Upload Files');
      expect(text).not.toBeNull();
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-Medium',
        color: 'white',
        paddingHorizontal: '2%',
        paddingTop: '1%',
      });
    });

    it('should be pressable', () => {
      const screen = render(
        <ButtonsAfterLogin.UploadFiles onPress={mockOnPress} />,
      );
      const button = screen.getByText('Upload Files');
      fireEvent.press(button, eventData);
      expect(mockOnPress).toHaveBeenCalledWith(eventData);
    });
  });

  describe('UploadImages', () => {
    it('should render upload image', () => {
      const screen = render(
        <ButtonsAfterLogin.UploadImages onPress={mockOnPress} />,
      );
      const text = screen.getByText('Upload Image');
      expect(text).not.toBeNull();
      expect(text.props.children).toBe('Upload Image');
    });

    it('check styles', () => {
      const screen = render(
        <ButtonsAfterLogin.UploadImages onPress={mockOnPress} />,
      );
      const button = screen.getByTestId('button');
      expect(button.props.style).toEqual({
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#70DAD3',
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 8,
      });

      const text = screen.getByText('Upload Image');
      expect(text).not.toBeNull();
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-Medium',
        color: 'white',
        paddingHorizontal: '2%',
        paddingTop: '1%',
      });
    });

    it('should be pressable', () => {
      const screen = render(
        <ButtonsAfterLogin.UploadImages onPress={mockOnPress} />,
      );
      const button = screen.getByText('Upload Image');
      fireEvent.press(button, eventData);
      expect(mockOnPress).toHaveBeenCalledWith(eventData);
    });
  });

  describe('ViewFiles', () => {
    it('should render upload image', () => {
      const screen = render(
        <ButtonsAfterLogin.ViewFiles onPress={mockOnPress} />,
      );
      const text = screen.getByText('View file');
      expect(text).not.toBeNull();
      expect(text.props.children).toBe('View file');
    });

    it('check styles', () => {
      const screen = render(
        <ButtonsAfterLogin.ViewFiles onPress={mockOnPress} />,
      );
      const button = screen.getByTestId('button');
      expect(button).not.toBeNull();
      expect(button.props.style).toEqual({
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#70DAD3',
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 8,
        width: '25%',
      });

      const text = screen.getByText('View file');
      expect(text).not.toBeNull();
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-Medium',
        color: 'white',
        paddingHorizontal: '2%',
        paddingTop: '1%',
      });
    });

    it('should be pressable', () => {
      const screen = render(
        <ButtonsAfterLogin.ViewFiles onPress={mockOnPress} />,
      );
      const button = screen.getByText('View file');
      fireEvent.press(button, eventData);
      expect(mockOnPress).toHaveBeenCalledWith(eventData);
    });
  });
});
