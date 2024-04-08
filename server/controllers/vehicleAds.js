import VehicleAd from "../models/VehicleAd.js"




export const test = async (req, res) =>{
  console.log("testing1122: "+req.body.title);
  res.status(200).json(req.body);
}

// export const createVehicleAd = async (req, res) => {
//   try {
//     console.log("testing1123332: "+req.body.title);
//     res.status(200).json(req.body);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const createVehicleAd = async (req, res)=> {
  console.log("request received");
  try {
    const {
      userId,
      title,
      description,
      price,
      mileage,
      year,
      make,
      model,
      variant,
      location,
      condition,
    } = req.body;

    const images = req.files.map(file=>file.filename);
    console.log("printig something");
    console.log(images);

    const newVehicleAd = new VehicleAd({
      seller: userId,
      title,
      description,
      price,
      mileage,
      year,
      make,
      model,
      variant,
      location,
      condition, 
      images
    });

    console.log("after array");
  
    await newVehicleAd.save();
    console.log("after saving....");
  
    const vehicleAd = await newVehicleAd.find();
    res.status(201).json(vehicleAd)
  }
  catch (err) {
    res.status(409).json({ message: err.message })
  }
  
}

export const getUserVehicleAds = () => {

}

export const getVehicleAds = async (req, res) => {
  try {
    console.log("getting vehicle Ads");
    const vehicleAds = await VehicleAd.find();
    res.status(200).json(vehicleAds);
  }catch(err){
    res.status(409).json({message: error.message});
  }
}


export const getVehicleAd = async (req, res) =>{
  try {
    const {vehicleAdId} = req.params;
    const vehicleAd = await VehicleAd.findById(vehicleAdId);

    res.status(200).json(vehicleAd);
  }catch(err){
    res.status(409).json({message: err.message});
  }

}