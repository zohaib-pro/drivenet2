import Issue from "../models/Issue.js";

/* CREATE */
export const createIssue = async (req, res) => {
  try {
    const { userId, vehicleAdId, category, details } = req.body; // Add title
    const newIssue = new Issue({
      userId, 
      vehicleAdId,
      category,
      details,
    });
    await newIssue.save();  
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getIssues = async (req, res) => {
  try {
    const issue = await Issue.find().sort({ createdAt: -1 })
    res.status(200).json(issue);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const deleteIssue = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedIssue = await Issue.findByIdAndDelete(id);

    if (!deletedIssue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};