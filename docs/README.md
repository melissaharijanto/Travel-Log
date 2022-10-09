---
layout: default
title: Home
nav_order: 1
permalink: /
---
# Introduction

**Travel Log** is a mobile application built to assist users in making their travel itinerary. It is a **React Native** application with **Firebase** to provide a non-SQL database. This application also utilizes **Google Maps API** to show recommendations on where to go during your vacation trips.

This project is made for **ERC11PM's CP2106 Project (Apollo Level)** in the National University of Singapore. Our team consists of <a href="https://github.com/melissaharijanto">Melissa Anastasia Harijanto</a> and <a href="https://github.com/liviamil">Livia Michelle Iskandar Leo</a>. 

<img src="./gifs/HomeScreen.gif" width="24%">
<img src="./gifs/FeaturedScreen.gif" width="24%">
<img src="./gifs/MainItineraryScreen.gif" width="24%">
<img src="./gifs/ProfileScreen.gif" width="24%">

## Table of Contents
- [Motivation](#motivation)
- [User Stories](#user-stories)
- [Aim](#aim)
- [Initial Design Prototype](#initial-design-prototype)
- [Testing Methods](#testing-methods)

## Motivation
As avid travelers, we believe that planning your own trips would bring more freedom and flexibility in travelling as opposed to hopping in on tours. However, planning our own trip comes with a lot of hassle. Compounded with the lack of a proper trip-planning platform (opting for notes/google docs with limited planning features), detailing an itinerary might deter one’s enthusiasm of travelling.

## User Stories
1. As an avid traveler, I would like to be able to be flexible with planning my travel itinerary down to each activity, accommodation, and transport details so that I won’t waste any time.
2. As a first-time traveler, I would like to be guided on making a detailed travel itinerary.
3. As first-time travelers, we would find it easier to be guided in making my travel plans and have a place to store all the necessary documents in one place so that we won't forget them.

## Aim
We hope to provide a one-stop application that would not only ease, but also encourage people to plan their own travels – solo or in a group. Users could easily add their planned activities, transport, and accommodation by our built-in functions that guides them in filling in their travel details. We hope that users could spend less time making a visual, detailed travel itinerary.

## Initial Design Prototype
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FCKGloIToiN5VlPJoaYpxCx%2FTravel-Log---Clean%3Fnode-id%3D0%253A1" allowfullscreen></iframe>

## Testing methods
We used **React Native Testing Library** and **Jest** to test the components (Unit Testing). To run the test cases, run `npm test` on the root directory of the project.

Due to a few errors, we are not able to implement Integration Testing with the testing library (NativeEventError due to some packages used), so we decided to implement **user testing** by distributing our apk to 10 people (mainly university students) and asking them to fill in a form about its functionalities. The form is set to anonymous in an attempt to maintain objectivity of the responses. The results of the form can be seen <a href="https://docs.google.com/spreadsheets/d/1jWGdPQogBsgr9BT4jBwYNIArUPwaPlW-X3HUOd_Nt8I/edit?usp=sharing">here</a>.

The link to the form can be seen <a href="https://docs.google.com/forms/d/13HqR6ZaJr3cNKarSHqOrV8jqXvz_9OpZRbYv0hLqMGw/viewform?edit_requested=true">here</a>.
