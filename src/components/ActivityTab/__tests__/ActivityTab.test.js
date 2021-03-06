import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import ActivityTab from '../ActivityTab';
import Activity from '../../../../assets/images/Activity.png';

const mockOnPress = jest.fn();
const eventData = {
  nativeEvent: {
    pageX: 20,
    pageY: 30,
  },
};

describe('ActivityTab', () => {
  describe('should render Activity Icon', () => {
    it('Test 1', () => {
      const screen = render(<ActivityTab />);
      const image = screen.getByRole('image');
      expect(image).not.toBeNull();
      expect(image.props.source).toEqual(Activity);
    });
  });

  describe('test styles', () => {
    it('container style', () => {
      const screen = render(<ActivityTab text="Hello" subtext="World" />);
      const button = screen.getByTestId('button');
      expect(button.props.style.backgroundColor).toBe('#70D9D320');
      expect(button.props.style.borderRadius).toBe(10);
      expect(button.props.style.padding).toBe(8);
      expect(button.props.style.marginVertical).toBe(5);
    });

    it('icon style', () => {
      const screen = render(<ActivityTab text="Hello" subtext="World" />);
      const image = screen.getByRole('image');
      expect(image.props.style[0].width).toBe(50);
      expect(image.props.style[0].height).toBe(50);
      expect(image.props.style[0].marginLeft).toBe(5);
      expect(image.props.style[0].marginRight).toBe(13);
    });

    it('text style', () => {
      const screen = render(<ActivityTab text="Hello" subtext="World" />);
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
        <ActivityTab
          text="Go Grocery Shopping"
          subtext="09:30 - Cold Storage@Bugis"
          onPress={mockOnPress}
        />,
      );
      fireEvent.press(screen.getByText('Go Grocery Shopping'), eventData);
      expect(mockOnPress).toHaveBeenCalledWith(eventData);
    });
  });

  describe('should render the correct text', () => {
    it('Test 1', () => {
      const screen = render(
        <ActivityTab
          text="Go Grocery Shopping"
          subtext="09:30 - Cold Storage@Bugis"
          onPress={mockOnPress}
        />,
      );
      const activityText = screen.getByText('Go Grocery Shopping');
      const activitySubtext = screen.getByText('09:30 - Cold Storage@Bugis');

      expect(activityText.props.children).not.toBeNull();
      expect(activityText.props.children).toBe('Go Grocery Shopping');
      expect(activityText.props.children).not.toBe('Random Text');
      expect(activityText.props.children).not.toBe('Go to Dog Caf??');

      expect(activitySubtext.props.children).not.toBeNull();
      expect(activitySubtext.props.children).toBe('09:30 - Cold Storage@Bugis');
      expect(activitySubtext.props.children).not.toBe('25/25/25 - 25/25/25');
      expect(activitySubtext.props.children).not.toBe('Some Random Text');
    });

    it('Test 2', () => {
      const screen = render(<ActivityTab text="" subtext="" />);
      const activityText = screen.queryByText('Random Accommodation Name');
      const activitySubtext = screen.queryByText('Random Subtext');
      expect(activityText).toBeNull();
      expect(activitySubtext).toBeNull();
    });
  });
});
