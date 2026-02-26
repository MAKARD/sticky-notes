# Sticky notes mini app

Boilerplated from CRA.

## How to run

You will need 2 terminals.

In tje first terminal run
```sh
npm run start:backend
```

In the second terminal run
```sh
npm start
```

## How to interact with the app

Press `+` to add a new sticky note. 

You can drag it all over the screen. When you drag it over `trash` zone, upon pressing out the note will be deleted. You will see visual indicator suggesting the item is going to be deleted over the `trash` zone.

You can edit the text as necessary.

By pressing on `arrow` icon, the given note will bring forward over all other notes.

## Architecture

The app is build by leveraging feature/domain-driven development.

The application consists of 5 namespaces:

- app: assembles all the building blocks into an actual app
- domain: declares all the communication channels and entities of the system
- features: implements features of the application
- infrastructure: glues different parts of the system
- ui: declares all the ui-only related modules

## Backend

The backend is located in the root of the project. It's a basic express app with in-memory sticky notes storage. That means the storage is emptying every time you stop the service.
