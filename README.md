<!-- README template from https://github.com/dthung1602/MangaBookmark -->


[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/dthung1602/MangaBookmark">
    <img src="logo.png" alt="MB" width="251" height="256">
  </a>

  <h3 align="center">Manga Bookmark</h3>

  <p align="center">
    A web app that allow users to bookmark mangas from scanlation sites.
    <br />
    <a href="https://mangabookmark.herokuapp.com/"><strong>Visit the website »</strong></a>
    <br />
    <br />
    <a href="https://github.com/dthung1602/MangaBookmark/issues">Report Bug</a>
    ·
    <a href="https://github.com/dthung1602/MangaBookmark/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

Let's face it. We all read ~~illegal~~ mangas from scanlation sites.
How many mangas are you currently reading? 1? 2? 10? 50? 100?

If that number is greater than a dozen, how do you keep track of them?
Take note in Excel? Write down to a paper? Or even remember them all?

`MangaBookmark` will take care of that for you!

[![Product Name Screen Shot][product-screenshot]](https://mangabookmark.herokuapp.com/)

With this web app, you can add a manga to your collection by 
clicking the `+` button and paste the link of the manga detail page.

`MangaBookmark` features include:
- Organizing mangas according to its status (to read, following, waiting, dropped, finished)
- Sorting mangas by name, status, etc
- Mark each chapter as read / unread
- Receive web push notifications when a new chapter is released
- Toggle hidden manga by double clicking the `to top` button



### Built With
* [MongoDB](https://www.mongodb.com/)
* [ExpressJS](https://expressjs.com/)
* [MaterialUI](https://material-ui.com/)



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Make sure you have the following installed on your system:
* `yarn`
* `node` ^12.16.1
* `mongo` ^3.6.8

### Installation

1. Setup [Google Login](https://developers.google.com/identity/protocols/oauth2)
and [Facebook Login](https://developers.facebook.com/docs/facebook-login/).
Make sure you have the API key and secret.
2. Clone the repo
```sh
git clone https://github.com/dthung1602/MangaBookmark
```
3. Install NPM packages
```sh
yarn install
cd react-mb-client
yarn install
```
4. Copy file `.env.example` to `.env` and add your Google & Facebook API key
```JS
cp .env.example .env
```

### Start the development server

To start dev mode for both backend & front end:

```sh
# run backend on port 3000
yarn run dev &

# run frontend on port 3001
cd react-mb-client
yarn run start &
```

Now you can go to [http://localhost:3001](http://localhost:3001) to see the page.

APIs are served both at `localhost:3000` and `localhost:3001` (which forwards to port 3000).
API documentaion can be found at [http://localhost:3001/api/docs](http://localhost:3001/api/docs).

If you only wish to make changes only to the backend, you can build the frontend and let the BE serve it.

```sh
cd react-mb-client
yarn run build
cd ..
yarn run dev
```

Everything now runs at [http://localhost:3000](http://localhost:3000)

If you make changes to the Swagger js doc, run `yarn run gendoc` to update the API doc.

<!-- ROADMAP -->
## Roadmap

See the file `TODO.md` and [open issues](https://github.com/dthung1602/MangaBookmark/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Duong Thanh Hung - [dthung1602@gmail.com](mailto:dthung1602@gmail.com)

Project Link: [https://github.com/dthung1602/MangaBookmark](https://github.com/dthung1602/MangaBookmark)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Best README template](https://github.com/othneildrew/Best-README-Template)
* [Img Shields](https://shields.io)
* [Looka](https://looka.com/)
* [Iconmonstr](https://iconmonstr.com/)






<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/dthung1602/MangaBookmark.svg?style=flat-square
[contributors-url]: https://github.com/dthung1602/MangaBookmark/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/dthung1602/MangaBookmark.svg?style=flat-square
[forks-url]: https://github.com/dthung1602/MangaBookmark/network/members
[stars-shield]: https://img.shields.io/github/stars/dthung1602/MangaBookmark.svg?style=flat-square
[stars-url]: https://github.com/dthung1602/MangaBookmark/stargazers
[issues-shield]: https://img.shields.io/github/issues/dthung1602/MangaBookmark.svg?style=flat-square
[issues-url]: https://github.com/dthung1602/MangaBookmark/issues
[license-shield]: https://img.shields.io/github/license/dthung1602/MangaBookmark.svg?style=flat-square
[license-url]: https://github.com/dthung1602/MangaBookmark/blob/master/LICENSE
[product-screenshot]: screenshot.png
