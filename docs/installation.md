---
layout: default
title: Installation
nav_order: 4
---

# Installation
{: .no_toc }

We would be happy if you are interested to try our application out!
{: .fs-6 .fw-300 }

[Download TravelLog here!](https://drive.google.com/file/d/1btqUkEVeYYCeM1tJqklh7v3JmKq8REor/view?usp=sharing){: .btn .btn-green }

{: .note-title}
> Before You Install...
>
> - This application customized for **Android devices**.
> - If you have a previously installed version of the apk, please uninstall it from your device before installing the current updated version.

## Table of contents
{: .no_toc .text-delta }

- TOC
{:toc}

<hr>

## Install via React Native's Android Emulator

1. Please clone the repository to your local device by running this command.
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
2. The app uses React Native CLI. If you do not have it set up yet, please refer to <a href="https://reactnative.dev/docs/environment-setup">React Native's official documentation</a> to set it up.

3. Please use the following commands in your terminal:
```
cd Travel-Log // go to the root directory of the project if you are not in there yet.
npm install // to install the required dependencies of the project.
npm start
npx react-native run-android
```

<hr>

## Install via USB Debugging

{: .highlight}
Slight knowledge of Command-Line Interface (CLI) is required for this method.

1. Go to Settings > About phone > Software information and tap on your Build number 7 times.
2. Developer options will be enabled; go back to Settings > Developer options and enable 'USB Debugging'.
3. To confirm whether your device has been connected or not, run 
```
adb devices
```
in your terminal. 
4. Run the app by running 
```
npx react-native run-android
```
5. For more information on this method, please visit <a href="https://reactnative.dev/docs/running-on-device">React Native's official documentation</a>.

6. Have fun navigating through!

<hr>

## Facing any issues?

Please raise an issue in our <a href="https://github.com/melissaharijanto/Travel-Log/issues">GitHub repository</a>.
