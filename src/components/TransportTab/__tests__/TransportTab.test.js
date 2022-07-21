import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TransportTab from '../TransportTab';
import Transport from '../../../../assets/images/Transport.png';

const onPressMock = jest.fn();
const pressed = 'pressed';

describe('TransportTab', () => {
  describe('should render text properly', () => {
    it('test 1', () => {
      const screen = render(
        <TransportTab
          onPress={onPressMock}
          text="MRT"
          subtext="Orchard >> Somerset"
        />,
      );

      const text = screen.getByText('MRT');
      expect(text).not.toBeNull();
      expect(text.props.children).toBe('MRT');

      const subtext = screen.getByText('Orchard >> Somerset');
      expect(subtext).not.toBeNull();
      expect(subtext.props.children).toBe('Orchard >> Somerset');
    });

    it('test 2', () => {
      const screen = render(
        <TransportTab
          onPress={onPressMock}
          text="Plane"
          subtext="Jakarta >> Singapore"
        />,
      );

      const text = screen.getByText('Plane');
      expect(text).not.toBeNull();
      expect(text.props.children).toBe('Plane');

      const subtext = screen.getByText('Jakarta >> Singapore');
      expect(subtext).not.toBeNull();
      expect(subtext.props.children).toBe('Jakarta >> Singapore');
    });

    it('test 3', () => {
      const screen = render(
        <TransportTab
          onPress={onPressMock}
          text="Car"
          subtext="Home >> University"
        />,
      );

      const text = screen.getByText('Car');
      expect(text).not.toBeNull();
      expect(text.props.children).toBe('Car');

      const subtext = screen.getByText('Home >> University');
      expect(subtext).not.toBeNull();
      expect(subtext.props.children).toBe('Home >> University');
    });
  });
  describe('should render Transport Icon properly', () => {
    it('test 1', () => {
      const screen = render(
        <TransportTab
          onPress={onPressMock}
          text="Car"
          subtext="Home >> University"
        />,
      );

      const image = screen.getByRole('image');
      expect(image).not.toBeNull();
      expect(image.props.source).toEqual(Transport);
    });
  });
  describe('should be pressable', () => {
    it('test 1', () => {
      const screen = render(
        <TransportTab
          onPress={onPressMock}
          text="Car"
          subtext="Home >> University"
        />,
      );

      const button = screen.getByTestId('button');
      expect(button).not.toBeNull();
      fireEvent.press(button, pressed);
      expect(onPressMock).toHaveBeenCalledWith(pressed);
    });
  });
  describe('style check', () => {
    it('test 1', () => {
      const screen = render(
        <TransportTab
          onPress={onPressMock}
          text="Car"
          subtext="Home >> University"
        />,
      );

      const text = screen.getByText('Car');
      expect(text).not.toBeNull();
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-SemiBold',
        color: '#000000',
        fontSize: 15,
      });
      const subtext = screen.getByText('Home >> University');
      expect(subtext.props.style).toEqual({
        fontFamily: 'Poppins-Regular',
        color: '#B1B1B1',
        fontSize: 15,
      });
      const image = screen.getByRole('image');
      expect(image.props.style).toEqual([
        {
          width: 50,
          height: 50,
          marginLeft: 5,
          marginRight: 13,
        },
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'flex-start',
        },
      ]);
      const button = screen.getByTestId('button');
      expect(button.props.style).toEqual({
        backgroundColor: '#70D9D320',
        borderRadius: 10,
        width: '100%',
        padding: 8,
        marginVertical: 5,
        opacity: 1,
      });
      const container = screen.getByTestId('container');
      expect(container.props.style).toEqual({
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-start',
      });
      const textContainer = screen.getByTestId('text container');
      expect(textContainer.props.style).toEqual({
        width: '75%',
      });
    });
  });
});
