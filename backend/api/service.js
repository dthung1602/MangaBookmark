const { Router } = require("@awaitjs/express");
const router = Router();

const { startBackupProcess, startUpdateMangaProcess } = require("../services/background-service");

//---------------------------------------
//  Trigger update manga script
//---------------------------------------
/**
 * @swagger
 *
 * /api/_service/update-mangas:
 *   post:
 *     description: Trigger update manga script
 *     responses:
 *       200:
 *         description: Update process started
 */
router.postAsync("/update-mangas", async (req, res) => {
  startUpdateMangaProcess();
  res.sendStatus(200);
});

//---------------------------------------
//  Trigger backup database script
//---------------------------------------
/**
 * @swagger
 *
 * /api/_service/backup-db:
 *   post:
 *     description: Trigger backup database script
 *     responses:
 *       200:
 *         description: Backup process started
 */
router.postAsync("/backup-db", async (req, res) => {
  startBackupProcess();
  res.sendStatus(200);
});

module.exports = router;
