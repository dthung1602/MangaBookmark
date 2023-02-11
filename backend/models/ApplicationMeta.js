import mongoose from "mongoose";

let Keys = Object.freeze({
  DB_VERSION: "DB_VERSION",
  GOOGLE_OAUTH2_TOKEN: "GOOGLE_OAUTH2_TOKEN",
});

/**
 * @swagger
 *
 * components:
 *    schemas:
 *      ApplicationMeta:
 *        type: object
 *        properties:
 *          id:
 *            $ref: '#/components/schemas/Id'
 *          key:
 *            type: string
 *            enum: [DB_VERSION, GOOGLE_OAUTH2_TOKEN]
 *          value:
 *            type: string
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 */
let ApplicationMetaSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      enum: Object.values(Keys),
    },
    value: String,
  },
  {
    timestamps: true,
  },
);

Object.assign(ApplicationMetaSchema.statics, {
  Keys,
});

let ApplicationMeta = mongoose.model("ApplicationMeta", ApplicationMetaSchema);
export default ApplicationMeta;
