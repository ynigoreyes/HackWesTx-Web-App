# HackWesTx Web App

#### Tech Stack
* React-Typescript
* Semantic UI
* Firebase
  * Store (???)
  * Auth
  * Functions
  * Hosting
* Yarn v1.7
* TSLint
* Jest
* NodeJS v10.4.1

#### Contributing
* Must be able to login to Firebase
* Install Yarn

You can use npm, but there maybe some issues as there are differences in installation
```
// Mac OS
$ brew install yarn

// Debian/Ubuntu
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

// then...
$ sudo apt-get update && sudo apt-get install yarn

// Windows

```

For Windows installation, visit their [website](https://yarnpkg.com/lang/en/docs/install/#windows-stable)

* Install dependencies for functions and source code
```
// Assuming you already have Node v10.4.1 or above
$ yarn install --without-node
$ cd functions && yarn install --without-node
```
* Install Firebase tooling and login to Firebase
```
$ yarn global add firebase-tools@^3.19.3
$ firebase login
```

* Run  test suite
```
$ yarn test
```

* Get started by editting files in the src folder. File structure is based off Angular
```
/src
/--components/
/  --Header
/  --Footer
/
/--pages/
/  --HomePage/
/    --components
/      {*child components*}
/    Home.spec.tsx
/    Home.scss
/    Home.tsx
/
/  --OtherPage/
/    --components
/      {*child components*}
/    Other.spec.tsx
/    Other.scss
/    Other.tsx
/
/  Layout.tsx
/
/--redux/
/  --reducers.tsx
/  --store.tsx
/  --actions.tsx
/
/--services/
/  --{*http/state*}
/
/index.tsx {*or App.tsx*}

$ yarn start
```
