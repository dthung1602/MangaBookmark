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

# REFACTOR

- [ ] Restructure folder BE
    - [x] Move business logic to services
    - [x] Use HTTP method patch, delete, etc.
    - [ ] Combine sub-service modules to one service class?
    - [ ] Auth vs User
    - [ ] Validation logic in middleware or in service?
    - [ ] Error handling -> remove handlerWrapper
    - [ ] Save newChapCount, unreadChapCount in schema?
    - [ ] App loaders + set security headers 
    - [ ] Test everything is working  
 
- [ ] Restructure folder FE

- [ ] Update dependencies to the latest

- [ ] Add readme.md

- [ ] Split FE to small js chunk 

- [ ] Handle error

- [ ] Cancel old request when new one is sent

- [ ] Change URL when change filter

# NEW FEATURES

- [ ] Right preview panel
    - [ ] Improve manga table:
        - [ ] Use sources favicon
        - [ ] Merge status column
    - [ ] Can by toggled
    - [ ] Summary of manga
    - [ ] Crawl: alternative name, author, description, tag
    - [ ] Expected next release
    
- [ ] Change loading icon

- [ ] Dark mode

- [ ] One master note for user -> take note everything

- [ ] Add introduction page, legal notice

- [ ] Improve account page UI

- [ ] Improve search & filter:
    - [ ] Filter by
        - [ ] created date
        - [ ] last updated date
        - [ ] last read date
        - [ ] src
        - [ ] tag
        - [ ] status
        - [ ] shelf (rename from following status)
    - [ ] Search by name, author, alternative name, description, note

- [ ] In-site reading mode (for some src only)

- [ ] Notification:
    - [ ] Facebook chat bot
    - [ ] Email
    - [ ] Configurable notification options

- [ ] Improve auth:
    - [ ] confirm email
    - [ ] restore password
    - [ ] user avt

- [ ] Manga src from other languages

- [ ] multi-language UI