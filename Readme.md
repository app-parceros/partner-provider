To run the app follow these next steps:

### First time

- Run `npm install` to install project dependencies 
- Run `npm install -g ionic` to install ionic tool as global dependency

### Show the application as debug mode 
- Run `ionic serve` within the app directory to see your app in the browser

### Show the application in the emulator o physical device 

- Run `npm run build` to compile and generate /s-partner/www
- Run `npx cap update android` to add a native iOS or Android project using Capacitor,or run `ionic capacitor add` for the first time
- Run `ionic capacitor copy android` to update Android project using Capacitor
- Run `gradlew assembleDebug` over android folder, to compile Android and generate .apk
- Generate your app icon and splash screens using `cordova-res --skip-config --copy`
- Copy file google-services.json to /android/app/src
- Open Android Studio and run the App


