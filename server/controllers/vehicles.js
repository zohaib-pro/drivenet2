import Vehicle from "../models/Vehicle.js";

// Controller to fetch all names with their IDs
export const getVehicleMakes = async (req, res) => {
    try {
        const vehicleMakes = await Vehicle.find({}, { _id: 0, name: 1 });
        res.status(200).json(vehicleMakes.map(obj=>obj.name));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Controller to get all names of models based on the vehicle ID
export const getVehicleModels = async (req, res) => {
    try {

        //make could be suzuki, toyota, etc
        //and models returned will be for example for suzuki -> vxl, vxr
        const { make } = req.params;
        const vehicle = await Vehicle.findOne({name:make})
    
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        const jsonData = JSON.stringify(vehicle);
        const data = JSON.parse(jsonData);
        const names = Object.values(data.models).map(obj => obj.name);
        /**
         * the following code didn't work due to unknown reason,
         * but its same as our current code
         *        const models = vehicle.models;
         *        const modelNames = Object.values(vehicle.models).map(model => model.name);
         */
        res.status(200).json(names);
    } catch (error) {
        // If an error occurs, respond with an error message
        res.status(500).json({ message: error.message });
    }
};
