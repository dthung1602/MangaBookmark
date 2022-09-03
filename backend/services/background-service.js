const { spawn } = require("child_process");
const config = require("../config");

const BIN_DIR = `${__dirname}/../bin`;

function startUpdateMangaProcess() {
  console.log(config);
  spawn("node", [`${BIN_DIR}/update_mangas`], {
    detached: true,
    env: { ...process.env },
  });
}

function startBackupProcess() {
  spawn("bash", [`${BIN_DIR}/backup_db.bash`], {
    detached: true,
    env: { ...process.env },
  });
}

module.exports = { startUpdateMangaProcess, startBackupProcess };
