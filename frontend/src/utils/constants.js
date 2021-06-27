// ------------------------------------------
//       General
// ------------------------------------------
export const FRONTEND_VERSION = "3.4.0";
export const ANY = "any";
export const MANGA_PER_PAGE = 5;
export const RIGHT_PANEL_TABLE_PAGE_SIZE = 20;
export const WAITING_MG_UNREAD_CHAP_THRESHOLD = 5;
export const TOP_TO_READ_MG_COUNT = 10;
export const TOP_WAITING_MG_COUNT = 15;
export const DOUBLE_CLICK_DELAY = 400;
export const SERVER_VAPID_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY;
export const EMBED_DEMO_VIDEO_ID = "sftVRbPcmoo";

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
//       Manga language
// ------------------------------------------
export const EN = "en";
export const VI = "vi";
export const LANGUAGES = {
  [EN]: "en",
  [VI]: "vi",
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
export const CH = "Chrome";
export const SA = "Safari";
export const FF = "Firefox";
export const ED = "Edge";
export const SS = "Samsung";
export const UNKNOWN_BROWSER = "Unknown Browser";
export const BROWSERS = [OP, CH, SA, FF, ED, SS, UNKNOWN_BROWSER];

// ------------------------------------------
//       Operating systems
// ------------------------------------------
export const WIN = "Windows";
export const MAC = "MacOS";
export const LNX = "Linux";
export const ADR = "Android";
export const IOS = "iOS";
export const UNKNOWN_OS = "Unknown OS";
export const OS = [WIN, MAC, LNX, ADR, IOS, UNKNOWN_OS];

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
export const ROUTE_LOGIN_GOOGLE = `${apiServer}/api/user/google/auth`;
export const ROUTE_LOGIN_FACEBOOK = `${apiServer}/api/user/facebook/auth`;
export const ROUTE_REGISTER = "/register";
export const ROUTE_API_DOC = `${apiServer}/api/docs`;

// ------------------------------------------
//       EXTERNAL LINKS
// ------------------------------------------
export const LINK_GITHUB = "https://github.com/dthung1602/MangaBookmark";
export const LINK_ISSUE_TRACKER = "https://github.com/dthung1602/MangaBookmark/issues";
export const LINK_EMAIL = "mailto:dthung1602@gmail.com";
export const LINK_LINKEDIN = "https://www.linkedin.com/in/duong-thanh-hung/";
