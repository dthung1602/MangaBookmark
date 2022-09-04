const { spawn } = require("child_process");

const BIN_DIR = `${__dirname}/../bin`;

function startUpdateMangaProcess() {
  // TODO Ensure only one background process is running
  startBackgroundScript("node", [`${BIN_DIR}/update_mangas`]);
}

function startBackupProcess() {
  // FIXME cannot download to current working dir
  startBackgroundScript("bash", [`${BIN_DIR}/backup_db.bash`]);
}

function startBackgroundScript(entrypoint, args) {
  const child = spawn(entrypoint, args, {
    detached: true,
    env: { ...process.env },
  });

  child.stdout.setEncoding("utf-8");
  child.stdout.on("data", console.log);
  child.stderr.setEncoding("utf-8");
  child.stderr.on("data", console.error);
}

module.exports = { startUpdateMangaProcess, startBackupProcess };
