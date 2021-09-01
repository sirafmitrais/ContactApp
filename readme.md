<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/sirafmitrais/rizky-muhammad-faris-betest">
    <img src="[images/logo.png](https://upload.wikimedia.org/wikipedia/id/8/8d/Logo_BTPN.svg)" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">
    BTPN BACKEND TEST
  </h3>

  <p align="center">
    build backend microservice apps using node.js
    <br />
    <a href="https://github.com/sirafmitrais/rizky-muhammad-faris-betest"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#structure">Structure</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

BTPN BACKEND TEST

Backend test codebase based on the instruction


### Built With

* [typescript](typescriptlang.org/)
* [node.js](nodejs.org/)
* [Express.js](https://redis.com/)
* [mongodb](https://www.mongodb.com/)
* [mongodb Atlas](https://www.mongodb.com/)
* [redis](https://redis.com/)
* [RedisLab](https://redis.com/)
<!-- GETTING STARTED -->
## Getting Started

pull the repo from this master branch

### Prerequisites

You need to install npm (if you want to change the redis and mongo to be local you need to install it locally too)
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/sirafmitrais/rizky-muhammad-faris-betest.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the App
   ```sh
   npm start
   ```

Ps: No need to set the mongodb and redis locally since it is already using remote service (Mongo Atlas and RedisLab)



<!-- USAGE EXAMPLES -->
## Usage

Api Routes:
   - Auth Login [GET] : [baseUrl]/auth/login
   - Auth Register [GET] : [baseUrl]/auth/register
   - User Get All [GET] : [baseUrl]/users/
   - User Create [POST] : [baseUrl]/users/
   - User Update [PATCH] : [baseUrl]/users/:id
   - User Get by Account [GET] : [baseUrl]/users/account/:account_number
   - User Get by Identity [GET] : [baseUrl]/users/identity/:identity_number
<!-- ROADMAP -->
## Structure

Tree :
  - common (common setting)
    - database
    - middleware
    - redis
  - config (env config)
  - contract (data contract / type)
  - controllers (controller)
  - routes (route)
  - schemas (schema model)
  - services (service layer)
  - app.ts (app entry point)
  - server.ts (the runner)
  - index.ts

!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Rizky Muhammad Faris Prakoso - [mail:to](RizkyMuhammad.FarisPrakoso@mitrais.com)

Project Link: [https://github.com/sirafmitrais/rizky-muhammad-faris-betest](https://github.com/sirafmitrais/rizky-muhammad-faris-betest)


[![mitrais-logo]]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[mitrais-logo]: https://media.jobthai.com/v1/images/logo-pic-map/280252_logo_20210223113430.jpeg

