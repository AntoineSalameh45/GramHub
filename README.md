<div style="display: flex; justify-content: space-between;">
   <img src="screenshots/Screenshot_20240411-212040.png" alt="HomeScreen" width="200">
   <img src="screenshots/Screenshot_20240411-212048.png" alt="SearchScreen" width="200">
   <img src="screenshots/Screenshot_20240411-212054.png" alt="ProfileScreen" width="200">
   <img src="screenshots/Screenshot_20240411-212129.png" alt="[NotificationCenter" width="200">
   <img src="screenshots/Screenshot_20240411-212108.png" alt="EditProfile" width="200">
   <img src="screenshots/Screenshot_20240411-212059.png" alt="Favorites" width="200">
   <img src="screenshots/Screenshot_20240411-212147.png" alt="Comments" width="200">
   <img src="screenshots/Screenshot_20240411-212218.png" alt="Post" width="200">
</div>

# GramHub

GramHub is a [React Native](https://reactnative.dev/) application like [Instagram](https://www.instagram.com/) for users to showcase their profiles and posts.

## Profiling

Here are some screenshots of the profiling:

![Profiling1](screenshots/rndevtoolssc1.jpg)
![Profiling2](screenshots/rndevtoolssc2.jpg)
![Profiling3](screenshots/rndevtoolssc3.jpg)

## Features

- View user profile details including name, avatar, followers, following, and bio.
- Display user's posts with images and captions.
- Edit profile functionality (name and bio).
- Share profile functionality with deep linking support.
- Saving comments using redux state management.
- Authentication flow.
- Add to clipboard button to share profile.
- Like, save and comment functionnalities.
- Notification on like, dislike and from notification center on new posts (using a button).

## Installation

Make sure you have [Node.js](https://nodejs.org/) installed.

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/GramHub.git
   ```

2. Navigate to the project directory:

   ```bash
   cd GramHub
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the Metro server:

   ```bash
   npm start
   ```

2. Run the application on Android:

   ```bash
   npm run android
   ```

   Or run the application on iOS:

   ```bash
   npm run ios
   ```

3. Follow the on-screen instructions to interact with the application.

## Dependencies

- [@notifee/react-native](https://www.npmjs.com/package/@notifee/react-native): For displaying notifications.
- [@react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage): For asynchronous storage support.
- [@react-native-clipboard/clipboard](https://www.npmjs.com/package/@react-native-clipboard/clipboard): For accessing and modifying the clipboard contents.
- And more...

## Development Dependencies

- [@babel/core](https://www.npmjs.com/package/@babel/core): Babel compiler core.
- [@react-native/babel-preset](https://www.npmjs.com/package/@react-native/babel-preset): Babel preset for React Native applications.
- [@react-native/eslint-config](https://www.npmjs.com/package/@react-native/eslint-config): Eslint config for React Native.
- And more...

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any changes or improvements you'd like to make.

## License

This project is licensed under the [MIT License](LICENSE).
