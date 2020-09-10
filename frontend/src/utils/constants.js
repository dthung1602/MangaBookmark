// ------------------------------------------
//       General
// ------------------------------------------
export const FRONTEND_VERSION = "3.0-beta";
export const ANY = "any";
export const MANGA_PER_PAGE = 5;
export const WAITING_MG_UNREAD_CHAP_THRESHOLD = 5;
export const TOP_TO_READ_MG_COUNT = 10;
export const SERVER_VAPID_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY;
export const EMBED_QUICK_TOUR_VIDEO_LINK = "https://www.youtube.com/embed/kxbIQr31LIU";

// ------------------------------------------
//       Manga shelves
// ------------------------------------------
export const TO_READ = "to read";
export const READING = "reading";
export const WAITING = "waiting";
export const DROPPED = "dropped";
export const FINISHED = "finished";
export const SHELVES = {
  [TO_READ]: "To read",
  [READING]: "Reading",
  [WAITING]: "Waiting",
  [DROPPED]: "Dropped",
  [FINISHED]: "Finished",
};

// ------------------------------------------
//       Manga statuses
// ------------------------------------------
export const MG_FINISHED = 0;
export const MG_LAST_CHAP_READ = 1;
export const MG_MANY_TO_READ = 2;
export const MG_NEW_CHAP = 3;
export const MG_STATUSES = {
  [MG_FINISHED]: "Finished",
  [MG_LAST_CHAP_READ]: "Last chap reached",
  [MG_MANY_TO_READ]: "Many to read",
  [MG_NEW_CHAP]: "New chap",
};

// ------------------------------------------
//       Sortable fields
// ------------------------------------------
export const SORT_ACC_NAME = "name";
export const SORT_DEC_NAME = "-name";
export const SORT_ACC_STATUS = "status";
export const SORT_DEC_STATUS = "-status";
export const SORT_ACC_DATE_CREATED = "createdAt";
export const SORT_DEC_DATE_CREATED = "-createdAt";
export const SORT_ACC_NEW_CHAP = "newChapCount";
export const SORT_ACC_UNREAD = "unreadChapCount";
export const SORTABLE_FIELDS = {
  [SORT_ACC_STATUS]: "status ↑",
  [SORT_DEC_STATUS]: "status ↓",
  [SORT_ACC_NEW_CHAP]: "new chap",
  [SORT_ACC_UNREAD]: "unread chap",
  [SORT_ACC_NAME]: "name A-Z",
  [SORT_DEC_NAME]: "name Z-A",
  [SORT_ACC_DATE_CREATED]: "created date ↑",
  [SORT_DEC_DATE_CREATED]: "created date ↓",
};

// ------------------------------------------
//       Browsers
// ------------------------------------------
export const OP = "Opera";
export const IE = "Internet Explorer";
export const CH = "Chrome";
export const SA = "Safari";
export const FF = "Firefox";
export const UK = "Unknown";
export const BROWSERS = [OP, IE, CH, SA, FF, UK];

// ------------------------------------------
//       Operating systems
// ------------------------------------------
export const WIN = "Windows";
export const MAC = "MacOS";
export const LNX = "Linux";
export const ADR = "Android";
export const IOS = "iOS";
export const UNK = "Unknown";
export const OS = [WIN, MAC, LNX, ADR, IOS, UNK];

// ------------------------------------------
//       ROUTES
// ------------------------------------------
// TODO anything nicer?
const apiServer = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
export const ROUTE_HOME = "/";
export const ROUTE_LEGAL_NOTICE = "/legal-notice";
export const ROUTE_ALL_MANGAS = "/mangas";
export const ROUTE_QUICK_ACCESS = "/quick-access";
export const ROUTE_ACCOUNT = "/account";
export const ROUTE_LOGIN = "/login";
export const ROUTE_LOGIN_GOOGLE = `${apiServer}/api/auth/google`;
export const ROUTE_LOGIN_FACEBOOK = `${apiServer}/api/auth/facebook`;
export const ROUTE_REGISTER = "/register";
export const ROUTE_API_DOC = `${apiServer}/api/docs`;

// ------------------------------------------
//       EXTERNAL LINKS
// ------------------------------------------
export const LINK_GITHUB = "https://github.com/dthung1602/MangaBookmark";
export const LINK_ISSUE_TRACKER = "https://github.com/dthung1602/MangaBookmark/issues";
export const LINK_EMAIL = "mailto:dthung1602@gmail.com";
export const LINK_LINKEDIN = "https://www.linkedin.com/in/duong-thanh-hung/";
