import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import IndividualRecommendationTab from '../IndividualRecommendationTab';

const onPressMock = jest.fn();
const pressed = 'pressed';
const defaultImage =
  'https://firebasestorage.googleapis.com/v0/b/travellog-d79e2.appspot.com/o/defaultUser.png?alt=media&token=d56ef526-4058-4152-933b-b98cd0668392';

describe('IndividualRecommendationTab', () => {
  it('renders text and image properly', () => {
    const screen = render(
      <IndividualRecommendationTab
        name="Random Hotel"
        address="Lorem Ipsum Road"
        ratings="3.5"
        image={defaultImage}
        onPress={onPressMock}
      />,
    );
    const name = screen.getByText('Random Hotel');
    expect(name).not.toBeNull();

    const address = screen.getByText('Lorem Ipsum Road');
    expect(address).not.toBeNull();

    const ratings = screen.getByText('3.5');
    expect(ratings).not.toBeNull();

    const image = screen.getByRole('image');
    expect(image).not.toBeNull();
    expect(image.props.source).toEqual({uri: defaultImage});
  });

  it('style check', () => {
    const screen = render(
      <IndividualRecommendationTab
        name="Random Hotel"
        address="Lorem Ipsum Road"
        ratings="3.5"
        image={defaultImage}
        onPress={onPressMock}
      />,
    );
    const name = screen.getByText('Random Hotel');
    expect(name).not.toBeNull();
    expect(name.props.style).toEqual({
      fontFamily: 'Poppins-SemiBold',
      color: '#3B4949',
    });

    const address = screen.getByText('Lorem Ipsum Road');
    expect(address).not.toBeNull();
    expect(address.props.style).toEqual({
      fontFamily: 'Poppins-Regular',
      fontSize: 13,
      color: '#808080',
    });

    const ratings = screen.getByText('3.5');
    expect(ratings).not.toBeNull();
    expect(ratings.props.style).toEqual({
      color: '#3B4949',
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
    });

    const image = screen.getByRole('image');
    expect(image).not.toBeNull();
    expect(image.props.source).toEqual({uri: defaultImage});
    expect(image.props.style).toEqual({
      width: 75,
      height: 75,
    });

    const button = screen.getByTestId('button');
    expect(button).not.toBeNull();
    expect(button.props.style).toEqual([
      {backgroundColor: '#FFFFFF'},
      {
        height: 110,
        justifyContent: 'center',
        paddingHorizontal: '5%',
        borderBottomColor: '#94C2C630',
        borderBottomWidth: 1,
      },
    ]);
  });

  it('should be pressable', () => {
    const screen = render(
      <IndividualRecommendationTab
        name="Random Hotel"
        address="Lorem Ipsum Road"
        ratings="3.5"
        image={defaultImage}
        onPress={onPressMock}
      />,
    );

    const button = screen.getByTestId('button');
    fireEvent.press(button, pressed);
    expect(onPressMock).toHaveBeenCalledWith(pressed);
  });
});
