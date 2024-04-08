import Event from "../models/Event.js";

/* CREATE */
export const createEvent = async (req, res) => {
  try {
    const { title, description, datetime, picture } = req.body; // Add title
  
    console.log(picture);
    const newEvent = new Event({
      datetime,
      title, 
      description,
      picture: picture.path,
      venue: 'lahore'
    });
    await newEvent.save();

  
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


/* READ */
export const getEvents = async (req, res) => {
  try {
    const event = await Event.find();
    res.status(200).json(event);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};