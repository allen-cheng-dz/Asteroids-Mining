# Asteroids Mining Simulation

<detail>
<summry>Table of content</summary>
- [Asteroids Mining Simulation](#asteroids-mining-simulation)
  - [usage](#usage)
    - [Quick start](#quick-start)
    - [production](#production)
  - [structure](#structure)
  - [Ui Components](#ui-components)
  - [thinks](#thinks)
  - [defects](#defects)
  - [what I have learn from this project](#what-i-have-learn-from-this-project)
</detail>

## usage
This project is build on top of the `create-react-app` template.
### Quick start
clone this project to local work folder.
```shell
cd your_working_dir
npm install
npm start
```

### production 

to build the code for production 
```shell
npm run build
``` 

feel free to adding any new svg to build the webfont icon with this command
```shell
npm run font
```

## structure

```shell
├── App.js
├── App.scss
├── assets
....
│   └── images
│       └── space-background-image.png
├── components
│   ├── Button
│   │   ├── index.js
│   │   └── index.scss
│   └── Header
│       ├── index.js
│       └── index.scss
├── index.css
├── index.js
├── pages
│   └── DashBoard
│       ├── index.js
│       └── index.scss
├── utils
│   ├── history.js
│   ├── miners.js
│   └── request.js
└── views
    ├── AsteroidsTable
    │   ├── index.js
    │   └── index.scss
    ├── MinerCreateForm
    │   ├── index.js
    │   └── index.scss
    ├── MinersTable
    │   ├── index.js
    │   └── index.scss
    └── PlanetsTable
        ├── index.js
        └── index.scss
```

## Ui Components
This project contains ant design UI components.

## thinks
I haven't finished the bonus screens of this project. If any one get some great ideal please let me know.

## defects
1. Structure of this project seems messy. Since this is a tiny project for presentation, it acceptable.
2. Using Ui component for popup, table and form.
3. Error handling kind rough.
4. none adaptation for the Mobile devices.

## what I have learn from this project
1. built webfont from scretch