const INVALID_NEW_USER = [
  [
    { username: "user1", password: "1234567", email: "https://assd.com" },
    {
      username: "Username taken",
      password: "Invalid value",
      email: "Invalid value",
    },
  ],
  [
    { user: "", email: "user1@example.com" },
    {
      username: "Invalid value",
      password: "Invalid value",
      email: "This email has already been registered for another account",
    },
  ],
];

const INVALID_PATCH_USER = [
  [
    { username: "user1", email: "https://assd.com" },
    {
      email: "Invalid value",
    },
  ],
  [
    { username: "", email: "user1@example.com" },
    {
      username: "Invalid value",
    },
  ],
  [
    { username: "user2", email: "user2@example.com" },
    {
      username: "Username taken",
      email: "This email has already been registered for another account",
    },
  ],
];

const INVALID_PASSWORD = [
  [{ currentPassword: "wrong pass" }, { currentPassword: "Incorrect current password", password: "Invalid value" }],
  [{ password: "1234567" }, { currentPassword: "Invalid value", password: "Invalid value" }],
];

const INVALID_UNLINK = [
  [
    { provider: "github", newPrimaryAccount: "twitter" },
    { provider: "Invalid value", newPrimaryAccount: "Invalid value" },
  ],
  [
    { provider: "google", newPrimaryAccount: "google" },
    { newPrimaryAccount: "Primary account must be changed after unlink" },
  ],
  // TODO test when newPrimaryAccount = google & use.googleId == null
];

module.exports = { INVALID_NEW_USER, INVALID_PATCH_USER, INVALID_PASSWORD, INVALID_UNLINK };
