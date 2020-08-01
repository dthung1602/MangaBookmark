# IMPROVE

## Backend
- [x] Update status + image
- [x] Add src field
- [x] Facebook + GG auth

## Frontend
- [x] Show hide manga on creation
- [x] Remove FE node_modules after build
- [x] Click on manga name -> open new tab
- [x] Infinite scroll

# MISCHIEVOUS

- [ ] ***Migrate from mLab -> mongodb atlass***
- [x] Patch changes from v2 -> v3
- [ ] ~~mongoose (DeprecationWarning: collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.~~

# REFACTOR

- [x] Restructure folder BE
    - [x] Move business logic to services
    - [x] Use HTTP method patch, delete, etc.
    - [ ] ~~Combine sub-service modules to one service class?~~
    - [x] Auth vs User
    - [x] Validation logic in middleware or in service?
    - [x] Error handling -> remove handlerWrapper
    - [x] Save newChapCount, unreadChapCount in schema?
    - [x] ~~App loaders~~ + set security headers
    - [x] Pagination 
    - [x] Test everything is working
    - [x] Filter by src -> where src from?  
    - [x] ?? Rework on API
    - [x] retire request-promise

- [x] Update dependencies to the latest

- [x] Add readme.md

- [x] Add API doc

# REWRITE FRONTEND

- [x] Basic setup
- [x] Design

- [ ] Split FE to small js chunk 
- [ ] Handle error
- [ ] Cancel old request when new one is sent
- [ ] Change URL when change filter

- [ ] Basic components:
    - [ ] Navbar
    - [ ] Footer
    - [ ] FAB
        - [ ] to top
        - [ ] add manga
        - [ ] update mangas
        - [ ] ~~dark mode~~ (not possible to toggle at runtime with antd)
    - [ ] Manga listing table
        - [ ] Use sources favicon
        - [ ] Merge status column
    - [ ] Basic Search & filter
            - [ ] status
            - [ ] shelf (rename from following status)
            - [ ] search by name
    - [ ] Right panel (manga detail panel)
        - [ ] display info
        - [ ] edit
        - [ ] delete
        - [ ] update
        - [ ] read
        - [ ] mark chapters
    - [ ] Advanced search & filter
        - [ ] created date
        - [ ] last updated date
        - [ ] last read date
        - [ ] src
        
- [ ] Add introduction page, legal notice 

# NEW FEATURES

- [ ] Toggle right panel

- [ ] Improve search & filter:
    - [ ] Create optimize index
    - [ ] Filter by
        - [ ] tag
        - [ ] author
    - [ ] Search by name, author, alternative name, description, note
    - [ ] Search by partial keywords. See [this](https://stackoverflow.com/a/54318581/7342188)
    - [ ] Search language ?

- [ ] Manga expected next release

- [ ] Crawl new info:
    - [ ] alternative name
    - [ ] tag
    - [ ] description
    - [ ] author

- [ ] Latest updated mangas view

- [ ] Reread shelf?

- [ ] Change loading icon

- [ ] New source. See [this](https://www.epubor.com/free-manga-sites-to-read-manga-online-for-free.html)

- [ ] One master note for user -> take note everything

- [ ] Improve account page UI

- [ ] In-site reading mode (for some src only)

- [ ] Notification:
    - [ ] Facebook chat bot
    - [ ] Email
    - [ ] Configurable notification options

- [ ] Improve auth:
    - [ ] confirm email
    - [ ] restore password
    - [ ] user avt

- [ ] csrf token

- [ ] Manga src from other languages

- [ ] multi-language UI

- [ ] ?? saucenow image search