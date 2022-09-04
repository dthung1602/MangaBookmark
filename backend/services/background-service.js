const { spawn } = require("child_process");

const BIN_DIR = `${__dirname}/../bin`;

function startUpdateMangaProcess() {
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
