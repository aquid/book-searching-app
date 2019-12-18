# This is a Book Searching App demo

This project is a simple demo for showcasing Express(Nodejs) and ReactJs. This project develops a basic backend and forntend application showcasing a Book Search App using [Gutenberg opensource book searching API](https://github.com/garethbjohnson/gutendex).

## Prerequisites

To run this application you need too have [NodeJs](https://nodejs.org/en/) installed. This project also uses [Docker](https://www.docker.com/) for creating a basic dcoker image for deployment. For react, this project uses [Create React App](https://github.com/facebook/create-react-app) for build and running react application.

## Installation

Before runing the app you need have your own database setup. This project uses Postgres for its database uses. [Here's](https://drive.google.com/file/d/1NJVtOs4Zxk3Go1S9oeurI3pBNH1YWN85/view) a dump of the database you can use to qucikly setup your local data.

### Using Docker

To run this app using docker, you can just clone the app and run the docker image. Before running the docker image you need to have some environment variables defined or passed while running the app.

```sh
## Build the docker image

docker build -t ${user}/${imagename} .

## Run the iamge

docker run -p 4000:4000 -e DATABASE_NAME -e DATABASE_HOST -e DATABASE_PORT -e DATABASE_USERNAME -e DATABASE_PASSWORD -e PORT ${user}/${imagename}

```

### Using NPM and YARN

```sh
# backend server start

cd book-searching-app
npm start

# Frontend server start

cd client
yarn start or npm start
```

#### ENV Variables

You need to have env defined for both frontend and backend code. Or you can create a .env file in root folder and inside client folder.

```sh
---- Backend ENV variables ----

export DATABASE_NAME= database name
export DATABASE_HOST= database host
export DATABASE_PORT= database port
export DATABASE_USERNAME= postgres db username
export DATABASE_PASSWORD= postgres db password
export PORT=3000
export NODE_ENV=development
export SEQUELIZE_DEBUG=false

---- Frontend ENV variiables (.env file in client folder) ----

SASS_PATH=node_modules:src
REACT_APP_API_URL= your backend api server url

```

> For Docker you just need the backend env vars defined.

## Backend Search API

The API supports follwing search apis and fiilter

- Book ID numbers specified as Project Gutenberg ID numbers.
- Language
- Topic. Topic filters on either ‘subject’ or ‘bookshelf’ or both. Case insensitive partial matches is supported. e.g ‘topic=child’ should among others, return books from the bookshelf ‘Children’s literature’ and from the
subject ‘Child education’.
- Author. Case insensitive partial matches is supported.
- Title. Case insensitive partial matches is supported.

>Multiple filter criteria should be permitted in each API call and multiple filter values should be allowed for each criteria. e.g. an API call should be able to filter
on ‘language=en,fr’ and ‘topic=child, infant`.

```js
/*

ID        - /api/books?ids=11,12,13

Languages - /api/books?languages=en

Search    - /api/books?search=dickens%20great

Topic     - /api/books?topic=children

Author    - /api/books?author=charles

Title     - /api/books?title=great

*/
```

## Frontend UI

The app has 2 distinct pages. The first page will have a title of the app and a list of buttons labeled by the category/genre of
books available.

Clicking on the buttons should transition the user to the next page, which would display the books matching the selected category. The books is displayed in an infinite scrolled
list (fetching more books as the user scrolls through the list). If the user enters any text in the search bar, the API is invoked again to search for all the books whose title or
author matches the given input text, while maintaining the currently selected category/genre filter.

## Author

Project developed by `Aquid Shahwar | aquid.shahwar@gmail.com`.
