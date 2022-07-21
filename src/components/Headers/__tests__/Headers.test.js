import React from 'react';
import {render} from '@testing-library/react-native';
import * as Headers from '../Headers';
import Logo from '../../../../assets/images/logo3.png';

const defaultImage =
  'https://firebasestorage.googleapis.com/v0/b/travellog-d79e2.appspot.com/o/defaultUser.png?alt=media&token=d56ef526-4058-4152-933b-b98cd0668392';

describe('Headers', () => {
  describe('HeadersWithoutDeleteIcon', () => {
    it('renders text properly', () => {
      const screen = render(
        <Headers.HeaderWithoutDeleteIcon text="Test Header" />,
      );
      const text = screen.getByText('Test Header');
      expect(text).not.toBeNull();
      expect(text.props.children).toBe('Test Header');
    });

    it('checks style', () => {
      const screen = render(
        <Headers.HeaderWithoutDeleteIcon text="Test Header" flexValue={3.5} />,
      );
      const text = screen.getByText('Test Header');
      expect(text).not.toBeNull();
      expect(text.props.style).toEqual([
        {
          fontFamily: 'Poppins-Bold',
          fontSize: 26,
          color: '#3B4949',
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          paddingTop: 9,
        },
        {flex: 3.5},
      ]);
      const container = screen.getByTestId('header container');
      expect(container).not.toBeNull();
      expect(container.props.style).toEqual({
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 65,
        width: '100%',
        paddingLeft: 10,
        elevation: 15,
        shadowColor: '#70D9D3',
        shadowOpacity: 1,
      });
    });
  });

  describe('HeadersWithDeleteIcon', () => {
    it('renders text properly', () => {
      const screen = render(
        <Headers.HeaderWithDeleteIcon text="Test Header" />,
      );
      const text = screen.getByText('Test Header');
      expect(text).not.toBeNull();
      expect(text.props.children).toBe('Test Header');
    });

    it('checks style', () => {
      const screen = render(
        <Headers.HeaderWithDeleteIcon text="Test Header" flexValue={3.5} />,
      );
      const text = screen.getByText('Test Header');
      expect(text).not.toBeNull();
      expect(text.props.style).toEqual([
        {
          fontFamily: 'Poppins-Bold',
          fontSize: 26,
          color: '#3B4949',
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          paddingTop: 9,
        },
        {flex: 3.5},
      ]);
      const container = screen.getByTestId('header container');
      expect(container).not.toBeNull();
      expect(container.props.style).toEqual({
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 65,
        width: '100%',
        paddingLeft: 10,
        elevation: 15,
        shadowColor: '#70D9D3',
        shadowOpacity: 1,
      });
    });
  });

  describe('HomeHeader', () => {
    it('renders text and image properly', () => {
      const screen = render(
        <Headers.HomeHeader name="Ada Lovelace" uri={{uri: defaultImage}} />,
      );
      const text = screen.getByText('Welcome back to Travel Log,');
      expect(text).not.toBeNull();
      const name = screen.getByText('Ada Lovelace!');
      expect(name.props.children).toEqual(['Ada Lovelace', '!']);
      const image = screen.getByRole('image');
      expect(image).not.toBeNull();
    });

    it('style check', () => {
      const screen = render(
        <Headers.HomeHeader name="Ada Lovelace" uri={{uri: defaultImage}} />,
      );
      const text = screen.getByText('Welcome back to Travel Log,');
      expect(text).not.toBeNull();
      expect(text.props.style).toEqual({
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        color: '#6C6C6C',
      });

      const name = screen.getByText('Ada Lovelace!');
      expect(name.props.children).toEqual(['Ada Lovelace', '!']);
      expect(name.props.style).toEqual({
        fontFamily: 'Poppins-SemiBold',
        fontSize: 26,
        color: '#3B4949',
      });

      const image = screen.getByRole('image');
      expect(image).not.toBeNull();
      expect(image.props.style).toEqual({
        borderRadius: 60 / 2,
        width: 60,
        height: 60,
      });

      const container = screen.getByTestId('container');
      expect(container).not.toBeNull();
      expect(container.props.style).toEqual({
        paddingRight: 30,
      });

      const headerAlign = screen.getByTestId('align');
      expect(headerAlign).not.toBeNull();
      expect(headerAlign.props.style).toEqual({
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingBottom: '3%',
        paddingHorizontal: '7%',
      });
    });

    describe('LogoOnlyHeader', () => {
      it('renders everything properly', () => {
        const screen = render(<Headers.LogoOnlyHeader borderBottomWidth={3} />);
        const image = screen.getByRole('image');
        expect(image.props.source).toEqual(Logo);
        expect(image.props.style).toEqual({
          width: '50%',
          maxWidth: 700,
          maxHeight: 200,
        });

        const container = screen.getByTestId('container');
        expect(container.props.style).toEqual([
          {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            height: 65,
            width: '100%',
            paddingLeft: 10,
            elevation: 15,
            shadowColor: '#70D9D3',
            shadowOpacity: 1,
            borderBottomColor: '#BBC6D0',
          },
          {borderBottomWidth: 3},
        ]);
      });
    });
  });
});
