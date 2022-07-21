import React from 'react';
import {render} from '@testing-library/react-native';
import * as CustomTextStyles from '../CustomTextStyles';

describe('CustomTextStyles', () => {
  describe('FieldName', () => {
    it('renders text properly', () => {
      const screen = render(<CustomTextStyles.FieldName text="random" />);
      const text = screen.getByText('random');
      expect(text.props.children).toBe('random');
    });

    it('renders text properly 2', () => {
      const screen = render(<CustomTextStyles.FieldName text="Hello!" />);
      const text = screen.getByText('Hello!');
      expect(text.props.children).toBe('Hello!');
    });

    it('style check', () => {
      const screen = render(<CustomTextStyles.FieldName text="Hello!" />);
      const text = screen.getByText('Hello!');
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-Medium',
        color: '#333333',
        paddingTop: 2,
      });
    });
  });

  describe('ErrorMessage', () => {
    it('renders text properly', () => {
      const screen = render(
        <CustomTextStyles.ErrorMessage text="Username invalid." />,
      );
      const text = screen.getByText('Username invalid.');
      expect(text.props.children).toBe('Username invalid.');
    });

    it('renders text properly 2', () => {
      const screen = render(
        <CustomTextStyles.ErrorMessage text="Email invalid." />,
      );
      const text = screen.getByText('Email invalid.');
      expect(text.props.children).toBe('Email invalid.');
    });

    it('style check', () => {
      const screen = render(<CustomTextStyles.ErrorMessage text="Hello!" />);
      const text = screen.getByText('Hello!');
      expect(text.props.style).toEqual({
        color: '#a3160b',
        fontFamily: 'Poppins-Italic',
        fontSize: 12,
        paddingLeft: 10,
      });
    });
  });

  describe('HomeSubtitle', () => {
    it('renders text properly', () => {
      const screen = render(<CustomTextStyles.HomeSubtitle text="Welcome." />);
      const text = screen.getByText('Welcome.');
      expect(text.props.children).toBe('Welcome.');
    });

    it('renders text properly 2', () => {
      const screen = render(
        <CustomTextStyles.HomeSubtitle text="Random text." />,
      );
      const text = screen.getByText('Random text.');
      expect(text.props.children).toBe('Random text.');
    });

    it('style check', () => {
      const screen = render(
        <CustomTextStyles.HomeSubtitle text="Hello!" style={{marginTop: 10}} />,
      );
      const text = screen.getByText('Hello!');
      expect(text.props.style[0]).toEqual({
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        color: '#000000',
        paddingBottom: '1%',
      });

      expect(text.props.style[1]).toEqual({
        marginTop: 10,
      });
    });
  });

  describe('FeaturedTitle', () => {
    it('renders text properly', () => {
      const screen = render(<CustomTextStyles.FeaturedTitle text="Test." />);
      const text = screen.getByText('Test.');
      expect(text.props.children).toBe('Test.');
    });

    it('renders text properly 2', () => {
      const screen = render(
        <CustomTextStyles.FeaturedTitle text="Random text." />,
      );
      const text = screen.getByText('Random text.');
      expect(text.props.children).toBe('Random text.');
    });

    it('style check', () => {
      const screen = render(
        <CustomTextStyles.FeaturedTitle
          text="Hello!"
          style={{marginTop: 10, padding: 8}}
        />,
      );
      const text = screen.getByText('Hello!');
      expect(text.props.style[0]).toEqual({
        color: 'white',
        fontFamily: 'Poppins-Bold',
        fontSize: 36,
      });

      expect(text.props.style[1]).toEqual({
        marginTop: 10,
        padding: 8,
      });
    });
  });

  describe('FeaturedSubtitle', () => {
    it('renders text properly', () => {
      const screen = render(<CustomTextStyles.FeaturedSubtitle text="Test." />);
      const text = screen.getByText('Test.');
      expect(text.props.children).toBe('Test.');
    });

    it('renders text properly 2', () => {
      const screen = render(
        <CustomTextStyles.FeaturedSubtitle text="Random text." />,
      );
      const text = screen.getByText('Random text.');
      expect(text.props.children).toBe('Random text.');
    });

    it('style check', () => {
      const screen = render(
        <CustomTextStyles.FeaturedSubtitle text="Hello!" />,
      );
      const text = screen.getByText('Hello!');
      expect(text.props.style).toEqual({
        color: '#3B4949',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
      });
    });
  });

  describe('LocationName', () => {
    it('renders text properly', () => {
      const screen = render(<CustomTextStyles.LocationName text="Test." />);
      const text = screen.getByText('Test.');
      expect(text.props.children).toBe('Test.');
    });

    it('renders text properly 2', () => {
      const screen = render(
        <CustomTextStyles.LocationName text="Random text." />,
      );
      const text = screen.getByText('Random text.');
      expect(text.props.children).toBe('Random text.');
    });

    it('style check', () => {
      const screen = render(<CustomTextStyles.LocationName text="Hello!" />);
      const text = screen.getByText('Hello!');
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        paddingTop: 15,
        color: '#3B4949',
      });
    });
  });

  describe('LocationName', () => {
    it('renders text properly', () => {
      const screen = render(<CustomTextStyles.LocationName text="Test." />);
      const text = screen.getByText('Test.');
      expect(text.props.children).toBe('Test.');
    });

    it('renders text properly 2', () => {
      const screen = render(
        <CustomTextStyles.LocationName text="Random text." />,
      );
      const text = screen.getByText('Random text.');
      expect(text.props.children).toBe('Random text.');
    });

    it('style check', () => {
      const screen = render(<CustomTextStyles.LocationName text="Hello!" />);
      const text = screen.getByText('Hello!');
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        paddingTop: 15,
        color: '#3B4949',
      });
    });
  });

  describe('LocationAddress', () => {
    it('renders text properly', () => {
      const screen = render(<CustomTextStyles.LocationAddress text="Test." />);
      const text = screen.getByText('Test.');
      expect(text.props.children).toBe('Test.');
    });

    it('renders text properly 2', () => {
      const screen = render(
        <CustomTextStyles.LocationAddress text="Random text." />,
      );
      const text = screen.getByText('Random text.');
      expect(text.props.children).toBe('Random text.');
    });

    it('style check', () => {
      const screen = render(<CustomTextStyles.LocationAddress text="Hello!" />);
      const text = screen.getByText('Hello!');
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        paddingLeft: 4,
        color: '#3B494990',
      });

      const container = screen.getByTestId('container');
      expect(container.props.style).toEqual({
        flexDirection: 'row',
        paddingTop: 3,
      });
    });
  });

  describe('Ratings', () => {
    it('renders text properly', () => {
      const screen = render(<CustomTextStyles.Ratings text="★" />);
      const text = screen.getByText('★');
      expect(text.props.children).toEqual('★');
    });

    it('renders text properly 2', () => {
      const screen = render(<CustomTextStyles.Ratings text="☆" />);
      const text = screen.getByText('☆');
      expect(text.props.children).toEqual('☆');
    });

    it('style check', () => {
      const screen = render(<CustomTextStyles.Ratings text="Hello!" />);
      const text = screen.getByText('Hello!');
      expect(text.props.style).toEqual({
        fontFamily: 'Poppings-Regular',
        fontSize: 20,
        paddingBottom: 5,
        lineHeight: 23,
        color: '#FFCA28',
      });
    });
  });

  describe('PriceTag', () => {
    it('renders text properly', () => {
      const screen = render(<CustomTextStyles.PriceTag text="Test." />);
      const text = screen.getByText('Test.');
      expect(text.props.children).toBe('Test.');
    });

    it('renders text properly 2', () => {
      const screen = render(<CustomTextStyles.PriceTag text="Random text." />);
      const text = screen.getByText('Random text.');
      expect(text.props.children).toBe('Random text.');
    });

    it('style check', () => {
      const screen = render(<CustomTextStyles.PriceTag text="Hello!" />);
      const text = screen.getByText('Hello!');
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        paddingLeft: 4,
        color: '#3B494990',
      });

      const container = screen.getByTestId('container');
      expect(container.props.style).toEqual({
        flexDirection: 'row',
      });
    });
  });

  describe('WebsiteLink', () => {
    it('renders text properly', () => {
      const screen = render(
        <CustomTextStyles.WebsiteLink text="www.google.com" />,
      );
      const text = screen.getByText('www.google.com');
      expect(text.props.children).toBe('www.google.com');
    });

    it('renders text properly 2', () => {
      const screen = render(
        <CustomTextStyles.WebsiteLink text="randomsite.org" />,
      );
      const text = screen.getByText('randomsite.org');
      expect(text.props.children).toBe('randomsite.org');
    });

    it('style check', () => {
      const screen = render(<CustomTextStyles.WebsiteLink text="Hello!" />);
      const text = screen.getByText('Hello!');
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        paddingLeft: 4,
        color: '#3B494990',
      });

      const container = screen.getByTestId('container');
      expect(container.props.style).toEqual({
        flexDirection: 'row',
        paddingTop: 3,
      });
    });
  });

  describe('Description', () => {
    it('renders text properly', () => {
      const screen = render(<CustomTextStyles.Description text="Test" />);
      const text = screen.getByText('Test');
      expect(text.props.children).toBe('Test');
    });

    it('renders text properly 2', () => {
      const screen = render(<CustomTextStyles.Description text="random" />);
      const text = screen.getByText('random');
      expect(text.props.children).toBe('random');
    });

    it('style check', () => {
      const screen = render(<CustomTextStyles.Description text="Hello!" />);
      const text = screen.getByText('Hello!');
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: '#808080',
        textAlign: 'justify',
        lineHeight: 20,
      });
    });
  });
});
