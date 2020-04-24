## Description

This app allows to user to get the latest updates about COVID-19. The interface counts with a single button with a microphone icon that when it is pressed start converting the user speech into text. When the app detects that the user stop talking the transcript is passed to Dialog Flow and the intent is returned. The server reply is given to the user via voice and while the app is replying all the input commands are disabled. Additionally, a functionality like "hey Siri" form Apple was implemented using the phrase "Hello doctor" that will trigger the app to recognize the user request.

### Tools Used

OS: macOS Catalina 10.15.4

Google Chrome: 81.0.4044.122 (Official Build) (64-bit)

JetBrains WebStorm: 2020.1

React

SemanticUI

ExpressJS


### Dependencies

#### React APP
```
"@testing-library/jest-dom": "^4.2.4",
"@testing-library/react": "^9.5.0",
"@testing-library/user-event": "^7.2.1",
"client-oauth2": "^4.2.5",
"cors": "^2.8.5",
"dialogflow": "^1.2.0",
"express": "^4.17.1",
"firebase-admin": "^8.10.0",
"google-auth-library": "^6.0.0",
"react": "^16.13.1",
"react-dom": "^16.13.1",
"react-native-pulse-animation": "^0.1.1",
"react-scripts": "3.4.1",
"react-speech-recognition": "^2.0.4",
"reactstrap": "^8.4.1",
"semantic-ui-css": "^2.4.1",
"semantic-ui-react": "^0.88.2",
"speak-tts": "^2.0.8"
```
#### Express Server

```
"cookie-parser": "~1.4.4",
"cors": "^2.8.5",
"debug": "~2.6.9",
"dialogflow": "^1.2.0",
"express": "~4.16.1",
"http-errors": "~1.6.3",
"jade": "~1.11.0",
"morgan": "~1.9.1",
"uuid": "^7.0.3"
```

### Compile
N/A

### How to run
It is require to start both servers the React that runs on port 3000 and the Express that runs on port 9000.

1- Running Express server: run ```"npm start"``` in ./cen4725-covid19/api/

2- Running React server: run ```"npm start"``` in ./cen4725-covid19/

3- Open web browser and enter url "http://localhost:3000/"
