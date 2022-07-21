import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import InputFieldAfterLogin from '../InputFieldAfterLogIn';

const onChangeTextMock = jest.fn();

describe('InputFieldAfterLogin', () => {
  describe('check placeholder text', () => {
    it('test 1', () => {
      const screen = render(
        <InputFieldAfterLogin placeholder="Insert your email here..." />,
      );
      const placeholder = screen.getByTestId('text input');
      expect(placeholder.props.placeholder).toBe('Insert your email here...');
    });

    it('test 2', () => {
      const screen = render(<InputFieldAfterLogin placeholder="Username" />);
      const placeholder = screen.getByTestId('text input');
      expect(placeholder.props.placeholder).toBe('Username');
    });

    it('test 3', () => {
      const screen = render(
        <InputFieldAfterLogin placeholder="Random Placeholder Text" />,
      );
      const placeholder = screen.getByTestId('text input');
      expect(placeholder.props.placeholder).toBe('Random Placeholder Text');
    });
  });

  describe('check input text', () => {
    it('test 1', () => {
      const screen = render(
        <InputFieldAfterLogin
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
        <InputFieldAfterLogin
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
        <InputFieldAfterLogin
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
        <InputFieldAfterLogin
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

  describe('style check', () => {
    it('test 1', () => {
      const screen = render(
        <InputFieldAfterLogin error="Username not valid!" placeholder="Test" />,
      );
      const input = screen.getByTestId('text input');
      expect(input.props.style).toEqual({
        fontFamily: 'Poppins-Medium',
        color: '#3B4949',
        fontSize: 15,
      });

      const container = screen.getByTestId('container');
      expect(container.props.style).toEqual({
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 8,
        borderColor: '#F1F1F1',
        borderWidth: 1.5,
      });
    });
  });
});
