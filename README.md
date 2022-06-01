# Prosjekt beskrivelse
Dette repositoret er alt av kode som skal kjøre/ligger på Raspberry Pi-en. Repositoret består av 2 deler server og ui. Server delen ligger da i server mappen og resten ligger i root mappen. UI delen er et react prosjekt og server delen er en node.js application som hoster ui-en og håndterer web requests lokalt på Raspberry Pi-en.

**PS: Server delen vil bare kjøre på Raspberry Pi på grunn av packages som ikke funker / kan lastes ned på Windows.** 

# Installer dependancies

Requirements:
- [Node.js](https://nodejs.org) (Anbefaller LTS)
- yarn (Kommando lengere ned)

For å laste ned yarn må du ha [Node.js](https://nodejs.org) (installeres globalt på pcen):
```bash
npm i yarn -g
```

Installer packagene som prosjektet bruker:
```bash
yarn install:all
```

Generer prisma types:
```bash
yarn install:all
```

# Start / build prosjektet
For å starte UI-en for testing (http://127.0.0.1:42069, localhost (http://localhost) vil ikke funke med API-en på grunn av cors):
```bash
yarn dev
```

For å builde UI-en for production deployment:
```bash
yarn build
```

For å starte serveren:
```bash
yarn start
```
