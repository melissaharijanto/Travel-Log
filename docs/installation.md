---
layout: default
title: Installation
nav_order: 3
permalink: /
---

# Installation

{: .note-title}
> Important Note
>
> - This application customized for **Android devices**.
> - If you have a previously installed version of the apk, please uninstall it from your device before installing the current updated version.

We would be happy if you are interested to try our application out!

[Download TravelLog here!](https://drive.google.com/file/d/1btqUkEVeYYCeM1tJqklh7v3JmKq8REor/view?usp=sharing){: .btn-green }

If you do not have an Android device, you can try this way:

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
2. The app is customized for android and uses React Native CLI. If you do not have it set up yet, please refer to <a href="https://reactnative.dev/docs/environment-setup">this link</a> to set it up.

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
For more information on this method, please visit <a href="https://reactnative.dev/docs/running-on-device">React's official documentation</a>.

3. Have fun navigating through! If you face any troubles, please contact us through our Telegram handles:  @livmichelle / @melissaharijanto.
You can sign in with our placeholder account to try the app's features:
- Email: yeonjun@gmail.com
- Password: 300500

Or alternatively, if you want to test the 'Forget Password' function, please sign up with a new account with your
**real** email, as it will be sent via a password-reset email!
