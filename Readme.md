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

### instruciones español

Para ejecutar la aplicación, siga estos pasos siguientes:

### Primera paso 
 Vaya a la consola de su equipo y ejecute:
 
-Ejecutar ´npm install´ para instalar dependencias del proyecto
-Ejecutar npm install -g ionicpara instalar la herramienta iónica como dependencia global

### Mostrar la aplicación como modo de depuración
Ejecutar ionic servedentro del directorio de la aplicación para ver su aplicación en el navegador
Mostrar la aplicación en el emulador o dispositivo físico
Ejecutar npm run buildpara compilar y generar / s-partner / www
Ejecutar npx cap update androidpara agregar un proyecto nativo de iOS o Android con Capacitor, o ejecutar ionic capacitor addpor primera vez
Ejecute ionic capacitor copy androidpara actualizar el proyecto de Android con Capacitor
Ejecutar gradlew assembleDebugsobre la carpeta de Android, para compilar Android y generar .apk
Genere el icono de su aplicación y las pantallas de bienvenida usando cordova-res --skip-config --copy
Copie el archivo google-services.json a / android / app / src
Abra Android Studio y ejecute la aplicación


