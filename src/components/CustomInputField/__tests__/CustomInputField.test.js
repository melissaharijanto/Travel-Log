import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import CustomInputField from '../CustomInputField';

const onChangeTextMock = jest.fn();

describe('CustomInputField', () => {
  describe('check placeholder text', () => {
    it('test 1', () => {
      const screen = render(
        <CustomInputField placeholder="Insert your email here..." />,
      );
      const placeholder = screen.getByTestId('text input');
      expect(placeholder.props.placeholder).toBe('Insert your email here...');
    });

    it('test 2', () => {
      const screen = render(<CustomInputField placeholder="Username" />);
      const placeholder = screen.getByTestId('text input');
      expect(placeholder.props.placeholder).toBe('Username');
    });

    it('test 3', () => {
      const screen = render(
        <CustomInputField placeholder="Random Placeholder Text" />,
      );
      const placeholder = screen.getByTestId('text input');
      expect(placeholder.props.placeholder).toBe('Random Placeholder Text');
    });
  });

  describe('check input text', () => {
    it('test 1', () => {
      const screen = render(
        <CustomInputField
          placeholder="Insert your email here..."
          setValue={onChangeTextMock}
          value=""
        />,
      );
      const placeholder = screen.getByTestId('text input');
      fireEvent.changeText(placeholder, 'random@email.com');
      expect(onChangeTextMock).toBeCalledWith('random@email.com');
    });

    it('test 2', () => {
      const screen = render(
        <CustomInputField
          placeholder="Username"
          setValue={onChangeTextMock}
          value=""
        />,
      );
      const placeholder = screen.getByTestId('text input');
      fireEvent.changeText(placeholder, 'randomusername');
      expect(onChangeTextMock).toBeCalledWith('randomusername');
    });

    it('test 3', () => {
      const screen = render(
        <CustomInputField
          placeholder="Name"
          setValue={onChangeTextMock}
          value=""
        />,
      );
      const placeholder = screen.getByTestId('text input');
      fireEvent.changeText(placeholder, 'Ada Lovelace');
      expect(onChangeTextMock).toBeCalledWith('Ada Lovelace');
    });

    it('test 4', () => {
      const screen = render(
        <CustomInputField
          placeholder="Insert a random keysmash!"
          setValue={onChangeTextMock}
          value=""
        />,
      );
      const placeholder = screen.getByTestId('text input');
      fireEvent.changeText(placeholder, 'skjDJSD7dSSJd$^%AS');
      expect(onChangeTextMock).toBeCalledWith('skjDJSD7dSSJd$^%AS');
    });
  });

  describe('error message showing', () => {
    it('test 1', () => {
      const screen = render(
        <CustomInputField error="Username not valid!" placeholder="Test" />,
      );
      const error = screen.getByText('Username not valid!');
      expect(error).not.toBeNull();
      expect(error.props.children).toBe('Username not valid!');
    });

    it('test 2', () => {
      const screen = render(<CustomInputField placeholder="Test" />);
      const error = screen.queryByTestId('error');
      expect(error).toBeNull();
    });
  });

  describe('style check', () => {
    it('test 1', () => {
      const screen = render(
        <CustomInputField error="Username not valid!" placeholder="Test" />,
      );
      const input = screen.getByTestId('text input');
      expect(input.props.style).toEqual({
        fontFamily: 'Poppins-Regular',
        color: '#3B4949',
      });

      const error = screen.getByText('Username not valid!');
      expect(error.props.style).toEqual({
        color: '#a3160b',
        fontFamily: 'Poppins-Italic',
        fontSize: 12,
        paddingLeft: 10,
      });

      const container = screen.getByTestId('container');
      expect(container.props.style).toEqual({
        backgroundColor: '#E8F3F4',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
      });
    });
  });
});
