import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import ItineraryTab from '../ItineraryTab';
import {Dimensions} from 'react-native';

const onPressMock = jest.fn();
const pressed = 'pressed';
const placeholder =
  'https://firebasestorage.googleapis.com/v0/b/travellog-d79e2.appspot.com/o/itineraryImagePlaceholder.png?alt=media&token=5ebb4e2b-9305-48d2-927e-dc637197f2df';

describe('ItineraryTab', () => {
  describe('should render text properly', () => {
    it('test 1', () => {
      const screen = render(
        <ItineraryTab
          image={placeholder}
          onPress={onPressMock}
          text="Random Itinerary"
        />,
      );

      const text = screen.getByText('Random Itinerary');
      expect(text).not.toBeNull();
      expect(text.props.children).toBe('Random Itinerary');
    });

    it('test 2', () => {
      const screen = render(
        <ItineraryTab
          image={placeholder}
          onPress={onPressMock}
          text="Test Itinerary"
        />,
      );

      const text = screen.getByText('Test Itinerary');
      expect(text).not.toBeNull();
      expect(text.props.children).toBe('Test Itinerary');
    });
  });

  describe('should be pressable', () => {
    it('test 1', () => {
      const screen = render(
        <ItineraryTab
          image={placeholder}
          onPress={onPressMock}
          text="Random Itinerary"
        />,
      );

      const button = screen.getByTestId('button');
      fireEvent.press(button, pressed);
      expect(onPressMock).toHaveBeenCalledWith(pressed);
    });
  });

  describe('style check', () => {
    it('test 1', () => {
      const screen = render(
        <ItineraryTab
          image={placeholder}
          onPress={onPressMock}
          text="Random Itinerary"
        />,
      );

      const button = screen.getByTestId('button');
      expect(button.props.style).toEqual({
        marginBottom: 15,
        opacity: 1,
      });

      const text = screen.getByText('Random Itinerary');
      expect(text).not.toBeNull();
      expect(text.props.children).toBe('Random Itinerary');
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-Bold',
        color: '#FFFFFF',
        fontSize: 16,
        elevation: 10,
        shadowOpacity: 1,
        shadowRadius: 1,
        paddingLeft: 13,
        paddingBottom: 5,
      });

      const image = screen.getByRole('image');
      expect(image).not.toBeNull();
      expect(image.props.source).toEqual({uri: placeholder});
      expect(image.props.style).toEqual([
        {position: 'absolute', left: 0, right: 0, top: 0, bottom: 0},
        {
          width:
            Dimensions.get('window').width -
            2 * 0.07 * Dimensions.get('window').width,
          height: Dimensions.get('window').width / 2,
        },
        {borderRadius: 11},
      ]);
    });
  });
});
