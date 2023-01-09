# Footballpedia

Footballpedia is an app where you can find all the information related to footbal. The project is inspired by the definition of encyclopedia, a book or set of books giving information on many subjects or on many aspects of one subject and typically arranged alphabetically.

This project used an API created by [football-data](https://www.football-data.org/documentation/quickstart), at the moment this project using free tier and hence this app having a limitation.

## Limitation

While building this app, I am facing a CORS issue from the API. I emailed the creator, and I got an info that :

> "CORS is not available within the Free Tier.""

I did find the workarond by wrapping the API request using a proxy called [cors-anywhere](https://github.com/Rob--W/cors-anywhere), and the request URL going to be look like this :

> https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/teams/

It worked, but it's sounds too good to be true. Turn out there is a limitation too on cors-anywhere, where one domain/origin is limited to 60 request/60 mins.

If you are trying to run the app and an error occured while trying to fetch the API, I strongly suggest you to :

- Visit https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/teams/ or https://cors-anywhere.herokuapp.com/corsdemo and then click request.
- Try to reload the page couple times.
- If you are still getting an error, the domain/origin request probably got limited.
  - If you are running the app locally, try to change the port on **vite.config.ts**. And don't forget to setup the ENV variable **VITE_FOOTBALL_DATA_TOKEN**.
  - If you are accessing on the web, I have deployed the app on several subdomain :
    - https://footballpedia-2.naofalleoagusta.xyz
    - https://footballpedia.naofalleoagusta.xyz
- Or you can contact me on [email](mailto:naofal.leo.agusta98@gmail.com)

## Extra Features

- I built this app using typescript, typescript has becoming very essential in modern web development to ensure type-safety on our app to prevent the uncertainty data type on javascript. And development experience using typescript could never go wrong.
- I implemented virtualization on every possible large list item using library [@virtual-list/vue](https://www.npmjs.com/package/@virtual-list/vue). It's important to implement virtualization as rendering items on DOM individually cause significant perfomance lag for users, especially when they are trying to scrolling through large list. By using virtualization, we only render the item on current viewport. As user scroll down the page, new item will be rendered and the old item will be removed from the DOM.
- While virtualization is great for performance, the item/data that currently not rendered on viewport, is not accessible when you are using in browser's scanning feature (ctrl+f). I decided to build a searcbar feature on the list component, so user will be able to find the data they are looking for at ease.
- I implemented lazy load image on this app using [vue-lazyload](https://www.npmjs.com/package/vue-lazyload), to reduce network request when user trying to access the web initially.

## Wishlist Feature

Since time is very limited, and this is a take home test, I do wish to build these features :

- Since this app is inspired by encyclopedia, I want to build a marker feature, where user will be able to jump/scroll to the alphabet index they desired. It's challenging because every list on this app used virtualization, and if the data that the user desired not on viewport, it can't be accessed straight away, i need to calculate those. If it haven't been implemented I probably ran out of time :D.
- On lazy load image, there is a bug where the image keep blinking/glitching on scroll or the image not load properly at all. If its not fixed yet, i probably ran out of time :D.

## Project Setup

```sh
yarn install
```

### Setup your ENV variable (I strongly advised you to add in on .env.local)

```sh
VITE_FOOTBALL_DATA_TOKEN = <YOUR_FOOTBALL_API_KEY>
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

## Deployment

I deployed this app on [vercel](https://vercel.com), it's very straightforward, I just need to click a few button and my app is deployed on the web. :D
