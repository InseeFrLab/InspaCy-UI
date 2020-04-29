# Quick Start

## Install Dependencies

    npm install

## Set up environment

In the project's root, create a file `.env.local`, and copy in this file the content of the file `.env`.
Then, put the values you need after the caracters `=`.

Here is the list of description of each environment's variables :

| Variable title | Meaning | Example |
|--|--|--|
| REACT_APP_API_URL | URL of the API which willbe called for process | https://localhost:5000
| REACT_APP_DEFAULT_LANGUAGE| Default language | fr

## Run the project

By default, to run the project, you may just run this : 

	npm run start

It will launch the server in: http://localhost:3000/ .

# I18N

In this project, i18n is implemented, with the whole necessary configuration.

Below the most important things to know for using/editing it, are listed :
- There is a module for configurating and exporting the i18n module, located in i18n.js [here](./src/js/tools/i18n.js).
- A folder contains all the folders containing languages' dictionnary in a JSON file, located [here](./src/assets/languages).
- The pictures for these languages are located in the [public media folder](./public/media), whose name is the language's label.