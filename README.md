# Travel Log

Team name: ERC11PM

Level of Achievement: Apollo

Project Scope: Mobile application with a database back-end.
Aided by React Native and Firebase, we plan to make an app that provides user authentication and visuals with various features which will be listed in detail below.

## Overview
A mobile application built to assist users in making their travel itinerary.
Made with React Native combined with Firebase to assist user authentication.

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

To view the features of each page, please refer to this document: 
https://docs.google.com/document/d/1Rbl5xvDYa3nckiapXDep-_QBE1GBdg1VTyXYMsfY-6E/edit?usp=sharing (Last updated as of Milestone #2)

## Design of the App
Link to Figma: https://www.figma.com/file/CKGloIToiN5VlPJoaYpxCx/Travel-Log---Clean (Last updated as of Milestone #1)

## Development Plan and Concepts to Be Tackled
Development Plan & Project Log: https://docs.google.com/spreadsheets/d/1mYGnZncCnt-LIcZ3JnWp9C4aTH9PHHvQ91TdY70SNvM/edit?usp=sharing

Concepts to Be Tackled: https://docs.google.com/spreadsheets/d/1Y0crUXilsoeYeINNn7aszfTQVOCKPAFMgXpoaLp5qiQ/edit?usp=sharing

## Progress
As of submission of Milestone #1, only the front end for the Login and Sign Up pages are finished, along with the navigations.
As of submission of Milestone #2, the main features of the app are complete and ready to use.
    Design changes from Milestone #1:
    - We previously planned to use a drag-and-drop flatlist to rearrange the days activities, but the animation could not seem 
    to work on the emulator. Hence, we decided to change it so that it implements the time (based on one of the previous milestone's
    review) and set a function that automatically sorts based on the time.
    - Accommodation is now a property that the itinerary has, and the property of a single day.
    Changes have been reflected in both the app and the features doc.


## Testing
```
We would be happy if you are interested to try it out! Here are the steps to do so:
1. Please access our repository with this link https://github.com/melissaharijanto/Travel-Log and fork it.
2. Because the app is customized for android and uses React Native CLI, please use the following commands
inside the root directory of the project:  
```
npm start
npm install // to install the required dependencies of the project.
npx react-native run-android
```
to run the app.

3. Have fun navigating through!

