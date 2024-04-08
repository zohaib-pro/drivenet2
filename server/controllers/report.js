import User from "../models/User.js";
import VehicleAd from "../models/VehicleAd.js";
import Issue from "../models/Issue.js";

export const getReport = async (req, res) => {
  try {
    const usersN = await User.countDocuments();
    const vehiclesN = await VehicleAd.countDocuments();
    const vehiclesSoldN = await VehicleAd.countDocuments({sold: true});
    const issuesN = await Issue.countDocuments();
    const issuesNewN = await Issue.countDocuments({status: 'new'});

    const report = {
      usersN,
      vehiclesN,
      vehiclesSoldN,
      issuesN,
      issuesNewN
    }
    res.status(200).json(report);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};