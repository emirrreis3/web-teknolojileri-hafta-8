import mongoose from "mongoose";
import Event from "../models/event-model.js";

// GET /events (?category=Atölye isteğe bağlı)
export async function getEvents(req, res) {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const events = await Event.find(filter);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: { message: error.message || "Internal server error" } });
  }
}

// GET /events/:id
export async function getEventById(req, res) {
  try {
    const { id } = req.params;

    // ID formatı geçersizse veya 24 hex char değilse 404 Not Found dönmeli (asla 500 dönmemeli!)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }

    res.status(200).json(event);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    res.status(500).json({ error: { message: error.message || "Internal server error" } });
  }
}

// POST /events
export async function createEvent(req, res) {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    // Mongoose doğrulama hatası durumunda 400 Bad Request döner, sunucu çökmez
    res.status(400).json({
      error: {
        message: error.message || "Bad Request"
      }
    });
  }
}

// PUT /events/:id (İsteğe bağlı güncelleme)
export async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedEvent) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: { message: error.message || "Bad Request" } });
  }
}

// DELETE /events/:id (İsteğe bağlı silme)
export async function deleteEvent(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }

    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }

    res.status(200).json({ message: "Event deleted successfully", event: deletedEvent });
  } catch (error) {
    res.status(500).json({ error: { message: error.message || "Internal server error" } });
  }
}
