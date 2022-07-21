import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import RecommendationTab from '../RecommendationTab';

const onPressMock = jest.fn();
const pressed = 'pressed';
const placeholder =
  'https://firebasestorage.googleapis.com/v0/b/travellog-d79e2.appspot.com/o/itineraryImagePlaceholder.png?alt=media&token=5ebb4e2b-9305-48d2-927e-dc637197f2df';

describe('RecommendationTab', () => {
  describe('should be pressable', () => {
    it('test 1', () => {
      const screen = render(
        <RecommendationTab image={placeholder} onPress={onPressMock} />,
      );
      const button = screen.getByTestId('button');
      expect(button).not.toBeNull();
      fireEvent.press(button, pressed);
      expect(onPressMock).toHaveBeenCalledWith(pressed);
    });
  });

  describe('renders image properly', () => {
    it('test 1', () => {
      const screen = render(
        <RecommendationTab image={placeholder} onPress={onPressMock} />,
      );
      const image = screen.getByRole('image');
      expect(image).not.toBeNull();
      expect(image.props.source).toEqual({uri: placeholder});
    });
  });

  describe('style check', () => {
    it('test 1', () => {
      const screen = render(
        <RecommendationTab image={placeholder} onPress={onPressMock} />,
      );
      const image = screen.getByRole('image');
      expect(image).not.toBeNull();
      expect(image.props.style).toEqual({
        width: 350,
        height: 175,
        borderRadius: 11,
      });
    });
  });
});
