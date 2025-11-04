import express from "express";
import {
  getAllEvents,
  filterAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import { fileUpload } from "../middlewares/file-upload.js";
import { getOrganizerById } from "../controllers/organizer.controller.js";

const router = express.Router();

router.route("/create").post(fileUpload.single("imageUrl"), createEvent);
router.get("/organizer/:id", getOrganizerById);
router.get("/events", getAllEvents);
router.get("/filter", filterAllEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
