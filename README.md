# FSE Chat Room Application
A simple chat room application.

## How to run
Install `npm` and `mongodb` first.
```bash
$ npm install
$ mkdir data
$ mongod --dbpath data
```

Then on a different tab
```bash
$ DEBUG=FSEChatRoom:* npm start
```
