# Travel Log

Team name: ERC11PM

Level of Achievement: Apollo

Project Scope: Mobile application with a database back-end.
Aided by React Native and Firebase, we plan to make an app that provides user authentication and visuals with various features which will be listed in detail below.

## Overview

<p float="left">
    <img src="https://github.com/melissaharijanto/Travel-Log/blob/main/assets/gifs/HomeScreen.gif" width='23%'/>
    <img src="https://github.com/melissaharijanto/Travel-Log/blob/main/assets/gifs/FeaturedScreen.gif" width='23%'/>
    <img src="https://github.com/melissaharijanto/Travel-Log/blob/main/assets/gifs/MainItineraryScreen.gif" width='23%'/>
    <img src="https://github.com/melissaharijanto/Travel-Log/blob/main/assets/gifs/ProfileScreen.gif" width='23%'/>
</p>

A mobile application built to assist users in making their travel itinerary.
Made with React Native combined with Firebase to assist user authentication, as well as Google Maps API to show maps for 
some features.

## Motivation
As avid travelers, we believe that planning your own trips would bring more freedom and flexibility in travelling as opposed to hopping in on tours. However, planning our own trip comes with a lot of hassle. Compounded with the lack of a proper trip-planning platform (opting for notes/google docs with limited planning features), detailing an itinerary might deter one’s enthusiasm of travelling.

## User Stories
1. As an avid traveler, I would like to be able to be flexible with planning my travel itinerary down to each activity, accommodation, and transport details so that I won’t waste any time.
2. As a first-time traveler, I would like to be guided on making a detailed travel itinerary.
3. As first-time travelers, we would find it easier to be guided in making my travel plans and have a place to store all the necessary documents in one place so that we won't forget them.

## Aim
We hope to provide a one-stop application that would not only ease, but also encourage people to plan their own travels – solo or in a group. Users could easily add their planned activities, transport, and accommodation by our built-in functions that guides them in filling in their travel details. We hope that users could spend less time making a visual, detailed travel itinerary.

## Features
1. User authentication - sign up, log in and resetting your account password via a password reset email.
2. Setting up your own profile by changing your profile picture and setting up your display name.
3. Creating new itineraries and accessing/editing previous ones that have been made.
4. Automatically generate tabs for separate days upon creating a new itinerary.
5. Automatically sort each day's activities based on the time that is inputted upon adding new activities.
6. Editing the details of the itinerary, accommodation, activities and transport. 
7. Need references? Out of ideas on where to go? Access another person's itinerary by entering the itinerary's unique code (view-only).
8. Have too many itineraries? Search your itineraries based on their titles!
9. View recommendations and recommended itineraries from the app.
10. Set the location for your accommodations via Google Maps.

To view the features of each page, please refer to this document: 
https://docs.google.com/document/d/1Rbl5xvDYa3nckiapXDep-_QBE1GBdg1VTyXYMsfY-6E/edit?usp=sharing (Last updated as of Milestone #3)

## Design of the App
Link to Figma: https://www.figma.com/file/CKGloIToiN5VlPJoaYpxCx/Travel-Log---Clean (Last updated as of Milestone #1)

## Development Plan and Concepts to Be Tackled
Development Plan & Project Log: https://docs.google.com/spreadsheets/d/1mYGnZncCnt-LIcZ3JnWp9C4aTH9PHHvQ91TdY70SNvM/edit?usp=sharing

Concepts to Be Tackled: https://docs.google.com/spreadsheets/d/1Y0crUXilsoeYeINNn7aszfTQVOCKPAFMgXpoaLp5qiQ/edit?usp=sharing

## Progress
As of submission of Milestone #1, only the front end for the Login and Sign Up pages are finished, along with the navigations.

As of submission of Milestone #2, the main features of the app are complete and ready to use.

As of submission of Milestone #3, we added the implementation of Google Maps API, as well as a Featured screen where users can access itineraries recommended by the system and recommendations for accommodations, activities, and restaurants for several cities. We also added testing; more can be seen in the **Testing methods** block below.
    
Design changes from Milestone #1:
1. We previously planned to use a drag-and-drop flatlist to rearrange the days activities, but the animation could not seem to work on the emulator. Hence, we decided to change it so that it implements the time (based on one of the previous milestone's review) and set a function that automatically sorts based on the time.
2. Accommodation is now a property that the itinerary has, and the property of a single day. Changes have been reflected in both the app and the features doc.

## Testing methods
We used **React Native Testing Library** and **Jest** to test the components (Unit Testing). To run the test cases, run `npm test` on the root directory of the project.

Due to a few errors, we are not able to implement Integration Testing with the testing library (NativeEventError due to some packages used), so we decided to implement **user testing** by distributing our apk to 10 people (mainly university students) and asking them to fill in a form about its functionalities. The form is set to anonymous in an attempt to maintain objectivity of the responses. The results of the form can be seen in this link: 
https://docs.google.com/spreadsheets/d/1jWGdPQogBsgr9BT4jBwYNIArUPwaPlW-X3HUOd_Nt8I/edit?usp=sharing

The link to the form can be seen here: https://docs.google.com/forms/d/13HqR6ZaJr3cNKarSHqOrV8jqXvz_9OpZRbYv0hLqMGw/viewform?edit_requested=true

## Installation
We would be happy if you are interested to try it out! Here are the steps to do so:

**If you have a previously installed version of the apk, please uninstall it from your device before installing the current updated version.**

If you have an Android device, we have an apk release that you can use to test our app! Since most phones now use ARM processors, it is recommended to download the apk customized for ARM64, with the file name `app-arm64-v8a-release.apk` via this link: https://drive.google.com/drive/folders/1bRMKL1-gXEHCNQtm2PtWu83xwtcKCWV4?usp=sharing. 

Otherwise, you can try this way:

1. Please access our repository with this link https://github.com/melissaharijanto/Travel-Log and fork it, or
clone the repository to your local device by running this command.
```
git clone https://github.com/melissaharijanto/Travel-Log.git
```
If you have previously cloned the repository to your local device (from previous milestones), please run this
command instead. 
```
cd Travel-Log
git pull
npm install // to install the required dependencies of the project.
```
2. The app is customized for android and uses React Native CLI. If you do not have it set up yet, please refer to this link 
(https://reactnative.dev/docs/environment-setup) to set it up.

Please use the following commands in your terminal:
```
cd Travel-Log // go to the root directory of the project, if you're not in there yet.
npm install // to install the required dependencies of the project.
npm start
npx react-native run-android
```
to run the app.

Otherwise, if you have an Android device and would like to try it there instead of an emulator, you can do this instead.
- Go to Settings > About phone > Software information and tap on your Build number 7 times.
- Developer options will be enabled; go back to Settings > Developer options and enable 'USB Debugging'.
- To confirm whether your device has been connected or not, run 
```
adb devices
```
in your terminal. 
- Run the app by running 
```
npx react-native run-android
```
For more information on this method, please visit this link: https://reactnative.dev/docs/running-on-device.

3. Have fun navigating through! If you face any troubles, please contact us through our Telegram handles:  @livmichelle / @melissaharijanto.
You can sign in with our placeholder account to try the app's features:
- Email: yeonjun@gmail.com
- Password: 300500

Or alternatively, if you want to test the 'Forget Password' function, please sign up with a new account with your
**real** email, as it will be sent via a password-reset email!
