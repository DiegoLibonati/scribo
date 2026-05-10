# Scribo

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Scribo** is a mobile note-taking application built with React Native and Expo, designed to help users quickly capture, organize, and review their thoughts from any Android or iOS device.

### Core features

- **Create notes** — Each note is composed of a title, a body (content), and an automatically assigned creation date, so you always know when an idea was recorded.
- **Browse your notes** — The home screen displays the full list of existing notes in a clean, scrollable list. Each item shows enough information at a glance to identify the note without opening it.
- **Read a note in full** — Tapping any note opens a dedicated detail screen where the title, content, and creation date are presented without distractions.
- **Delete a note** — While viewing a note, a single tap on the remove button permanently deletes it from the store and returns you to the list.
- **Filter notes** — A filter dialog powered by a custom checkbox component lets you narrow down the list by one or more criteria: date, title, or content. Only notes that match the active filters and the current search input are shown, making it easy to find a specific entry even in a large collection.

### Architecture highlights

The application state is managed with Redux Toolkit, keeping the note list and UI state (search query, active filters) predictable and easy to extend. Navigation is handled by Expo Router, which provides file-based routing similar to Next.js. The codebase is written entirely in TypeScript and covered by a Jest + React Native Testing Library test suite.

## Technologies used

The application is built on top of the following core technologies:

1. React Native
2. TypeScript
3. Expo SDK 54
4. expo-router

## Libraries used

These are the runtime and development packages declared in `package.json`:

#### Dependencies

```
"@expo/vector-icons": "^15.0.2"
"@reduxjs/toolkit": "^2.5.0"
"expo": "~54.0.0"
"expo-constants": "~18.0.13"
"expo-linking": "~8.0.12"
"expo-router": "~6.0.23"
"expo-status-bar": "~3.0.9"
"expo-asset": "~12.0.9"
"expo-font": "~14.0.9"
"react": "19.1.0"
"react-native": "0.81.5"
"react-native-safe-area-context": "~5.6.0"
"react-native-screens": "~4.16.0"
"react-redux": "^9.2.0"
```

#### devDependencies

```
"@babel/core": "^7.20.0"
"@eslint/js": "^9.0.0"
"@testing-library/react-native": "^12.1.2"
"@types/jest": "~29.5.14"
"@types/node": "^22.0.0"
"@types/react": "~19.1.10"
"babel-plugin-module-resolver": "^5.0.2"
"babel-preset-expo": "~54.0.1"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "~29.7.0"
"jest-expo": "~54.0.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"react-test-renderer": "19.1.0"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
```

## Getting Started

With the stack in place, follow these steps to run the app locally:

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm start`

Install **Expo Go** on your device ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)) and scan the QR code that appears in the terminal.

## Testing

Once the project is running locally, you can verify the codebase with the included Jest + React Native Testing Library test suite:

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security Audit

Beyond functional tests, the project ships with two health checks for dependencies and configuration.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### Expo Doctor

Run a full health check on the project (dependency versions, SDK compatibility, configuration):

```bash
npm run doctor
```

## Known Issues

The following issues surface when running the audits above and are documented here so they don't block development.

### npm audit reports 18 vulnerabilities (4 low, 14 moderate)

Running `npm audit` reports vulnerabilities in `@tootallnate/once`, `postcss`, and `uuid`. All of them are transitive dependencies of Expo's internal toolchain — specifically `jest-expo`, `@expo/cli`, `@expo/metro-config`, and `@expo/config-plugins`. None of these packages are included in the app bundle delivered to end users; they run exclusively on the developer's machine during build and test.

The suggested fix (`npm audit fix --force`) would downgrade `expo` to v49 and `jest-expo` to v47, both of which are incompatible with the current SDK. Do not run it.

This is a known limitation of the Expo ecosystem tracked upstream. The vulnerabilities will be resolved when Expo updates its internal dependencies. No action is required on the project side.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/scribo`](https://www.diegolibonati.com.ar/#/project/scribo)
