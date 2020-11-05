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

- [x] ***Migrate from mLab -> mongodb atlass***
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

- [x] Split FE to small js chunk 
- [x] Handle error
- [x] Change URL when change filter

- [x] Basic components:
    - [x] Navbar
    - [x] Footer
    - [x] FAB
        - [x] to top
        - [x] add manga
        - [x] update mangas
        - [ ] ~~dark mode~~ (not possible to toggle at runtime with antd)    
    - [x] Manga listing table
        - [ ] ~~Use sources favicon~~
        - [x] Merge status column
    - [x] Basic Search & filter
        - [x] status
        - [x] shelf (rename from following status)
        - [x] search by name
        - [x] sort
    - [x] Right panel (manga detail panel)
        - [x] display info
        - [x] edit
        - [x] delete
        - [x] update
        - [x] read
        - [x] mark chapters
    - [x] Advanced search & filter
        - [x] created date
        - [x] last released
        - [x] site
        - [x] is completed
        - [x] hidden
        
- [x] Home page
- [x] Legal notice page 
- [x] Push notification
- [x] Account page
    - [x] Display info
    - [x] Edit
        - [x] basic info
        - [x] change pass
        - [x] link / unlink gg, fb
        - [x] Delete account
    - [x] Manage notification
- [x] Latest updated mangas page
- [x] BG Image credit in login page 

# POLISH 

- [x] **Fix GG & FB auth**
- [x] Improve background loading:
    - [ ] ~~Host images on another server~~
    - [ ] ~~Reduce image size~~
    - [x] Cache by service worker
- [x] Fix bug can only access FE homepage
- [x] After login -> quick-access 
- [x] FE 404 page
- [x] Right panel when image not found, set height
- [x] Manga table break line for long titles    
- [x] Set right panel null when manga table changes
- [x] Reset all filters ~~+ reload btn~~
- [x] More info in error boundary -> add issue tracker link + show user error
- [x] Cancel old request when new one is sent

# NEW FEATURES

- [x] New sites
    - [x] http://fanfox.net
    - [x] https://www.mangaread.org
    - [x] https://kissmanga.org/
    - [x] https://mangahub.io/
    - [x] https://www.readm.org/
    - [x] https://mangafast.net
    - [x] http://mangahasu.se

- [ ] Shutdown gracefully [link](https://help.heroku.com/D5GK0FHU/how-can-my-node-app-gracefully-shutdown-when-receiving-sigterm)

- [ ] Refactor crawling:
    - Reading, Waiting shelf: twice a day
    - ToRead: once a day
    - Dropped: once a week
    - Finished: once a month
    - Tasks:
        - [ ] Setup producer
            - [ ] Setup rabbitmq
            - [ ] Implement Consumer
            - [ ] Implement Strategies
        - [ ] Setup consumer
            - [ ] Refactor parsers
            - [ ] Message format & Pipeline (abstract)
            - [ ] Setup redis
        - [ ] Build pipeline
            - [ ] Schedule update
                - [ ] pipeline
                - [ ] Re-setup schedule infra
            - [ ] Multiple adhoc update
                - [ ] pipeline
                - [ ] integrate with API
                - [ ] FE
            - [ ] Single adhoc update
                - [ ] pipeline
                - [ ] integrate with API
                - [ ] FE
            - [ ] Info adhoc
                - [ ] pipeline
                - [ ] integrate with API
                - [ ] FE

- [ ] Enhance scheduled job report

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

- [ ] Reread shelf? Switch to shelf?

- [ ] Change loading icon

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