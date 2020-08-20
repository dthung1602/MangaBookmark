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

- [ ] Add readme.md

- [x] Add API doc

# REWRITE FRONTEND

- [x] Basic setup
- [x] Design

- [x] Split FE to small js chunk 
- [x] Handle error
- [ ] Cancel old request when new one is sent
- [x] Change URL when change filter

- [ ] Basic components:
    - [x] Navbar
    - [x] Footer
    - [ ] FAB
        - [x] to top
        - [x] add manga
        - [ ] update mangas
        - [ ] ~~dark mode~~ (not possible to toggle at runtime with antd)
    - [ ] Account page       
    - [ ] Manga listing table
        - [ ] Use sources favicon
        - [x] Merge status column
    - [ ] Basic Search & filter
        - [x] status
        - [x] shelf (rename from following status)
        - [x] search by name
        - [x] sort
    - [ ] Right panel (manga detail panel)
        - [ ] display info
        - [ ] edit
        - [ ] delete
        - [ ] update
        - [ ] read
        - [ ] mark chapters
    - [ ] Latest updated mangas view
    - [x] Advanced search & filter
        - [x] created date
        - [x] last released
        - [x] site
        - [x] is completed
        - [x] hidden
        
- [ ] Home page
- [ ] Legal notice page 
- [ ] Push notification
- [ ] Account page
    - [ ] Display info
    - [ ] Edit
        - [ ] basic info
        - [ ] change pass
        - [ ] link / unlink gg, fb
        - [ ] Delete account
    - [ ] Manage notification
- [ ] BG Image credit in login page 

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
    - [ ] language
    - [ ] last released
    - [ ] alternative name
    - [ ] tag
    - [ ] description
    - [ ] author

- [ ] Crawl error report

- [ ] Reread shelf?

- [ ] Change loading icon

- [ ] New sites. See [this](https://www.epubor.com/free-manga-sites-to-read-manga-online-for-free.html)

- [ ] One master note for user -> take note everything

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