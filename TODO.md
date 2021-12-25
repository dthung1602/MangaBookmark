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

- [x] Scale crawling
    - [x] filter mangas & push to queue
    - [x] fetch & crawl from queue
    - [x] add redis: queue, ...
    - [x] use queue in update multiple / update single API
    - [x] add query crawl result api
    - [x] change update multiple / update single frontend

- [x] Change loading icon

- [ ] Crawl new info:
    - [x] language
    - [ ] last released
    - [x] alternative name
    - [x] tag
    - [x] description
    - [x] author

- [ ] Improve search & filter:
    - [x] Create optimize index
    - [ ] Filter by
        - [x] tag
        - [ ] author
    - [x] Search by name, author, alternative name, ~~description, note~~
    - [x] Search by partial keywords. See [this](https://stackoverflow.com/a/54318581/7342188)
    - [ ] ~~Search language ?~~

- [x] Deactivate hocvientruyentranh

## Important

- [x] In case manga change 100% chapter link, detect using chapter name

- [x] Fix Facebook login

- [x] User avt
  - [X] Spike: where to host images Cloudimary
  - [x] Upload avt in setting page
  - ~~[ ] Show static welcome page after sign up~~

- [x] Change-site shelf: basically drop, but because the site updates too infrequently
    
- [x] Reread shelf
    - Still save current progress
    - Independent reread progress
    - Should be in Reading tab

- [x] Improve daily crawling report
    - [x] Use 3rd party log analyzer & visualizer
    - ~~[ ] Email?~~
    - ~~[ ] Admin notification?~~
    - ~~[ ] Admin page~~
      - ~~[ ] Set up basic FE + Admin account in BE~~
      - ~~[ ] Crawling report page~~
      - ~~Total number of pages crawl~~
      - ~~\#success, #fail~~
      - ~~View log~~
      - ~~[ ] Back up process status page~~
      - ~~[ ] Generic stats page~~
      
- [x] One master note for user -> take note everything

- [ ] Manga detail page
  - [x] Setup BE to query 1 manga info
  - [ ] Setup FE
    - [x] Design
    - [x] Fetch data
    - [x] Basic page layout
    - [x] Display data
    - [x] Update manga
    - [x] How to open manga detail page?
    - ~~[ ] Back button~~
    - [ ] Refactor
    - [ ] Polish FE

- [ ] Change page title

- [ ] Cross site search
  - [ ] Search in supported site
    - [ ] Setup FE
      - Cross site search vs search saved magna
      - Show results in dropdown (see github)
      - Preview result
      - Add manga from result
    - [ ] Setup basic BE
      - Crawl name, image, status?, latest chapter, last release?
      - Manga site priority?
    - [ ] Add custom search page parser
      - [ ] Mangakakalot
      - [ ] Manganelo
      - [ ] Fanfox
      - [ ] Mangadex
      - [ ] manga4life
      - [ ] Truyenqq
      - [ ] BlogTruyen
  - [ ] Search for manga in MAL
  - [ ] Add option view more result in Google

- [ ] Improve auth:
    - [ ] ~~confirm email~~
    - [ ] restore password
        - [ ] Forget password page
            - [ ] Enter email to restore
            - [ ] Cool down before resend
        - [ ] Backend
            - [ ] Spike: which email service to use?
            - [ ] Implement send email API
            - [ ] Implement send restore password API
        - [ ] Set new password page

## Random ideas

- [ ] Monthly update dropped / completed / finished mangas ?

- [ ] Manga expected next release ?

- [ ] In-site reading mode (for some src only)

- [ ] Toggle right panel

- [ ] Notification:
    - [ ] ~~Facebook chat bot~~
    - [ ] Email
    - [ ] Configurable notification options
    
- [ ] csrf token

- [ ] ~~Manga src from other languages~~

- [ ] ~~multi-language UI~~

- [ ] ?? saucenow image search

# Other improvement

- [x] git hook pre-commit lint only changed files
- [ ] replace convert api call by a local package 