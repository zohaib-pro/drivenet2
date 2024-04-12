import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

import { useDispatch, useSelector } from "react-redux";


// Define Yup validation schema
const vehicleAdSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required').positive('Price must be a positive number'),
  mileage: yup.number().required('Mileage is required').positive('Mileage must be a positive number'),
  year: yup.number().required('Year is required').positive('Year must be a positive number').integer('Year must be an integer'),
  make: yup.string().required('Make is required'),
  model: yup.string().required('Model is required'),
  variant: yup.string().required('Variant is required'),
  condition: yup.string().required('Condition is required').oneOf(['New', 'Used'], 'Invalid condition'),
  location: yup.string().required('Location is required'),
  cityReg: yup.string().required('Registration city is required'),
  Color: yup.string().required('Color is required'),
  images: yup.array().of(yup.string()).min(1, 'At least one image is required'),
});

const initialValues = {
  title: '',
  description: '',
  price: '',
  mileage: '',
  year: '',
  make: '',
  model: '',
  variant: '',
  condition: 'New',
  cityReg: 'Not Registered',
  color: '',
  location: '',
  images: [],
};

const VehicleAdForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const submitVehicleAd = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();

    const image = values.images[0];
    //formData.append("image", image);
    //formData.append("picturePath", image.name);
    //Append non-image fields
    for (let key in values) {
      if (key !== "images") {
        formData.append(key, values[key]);
      }
    }

    // // Append each image file
    values.images.forEach((image, index) => {
      formData.append(`images`, image, image.name);
      //console.log(image.name);
    });

    formData.append("userId", _id);
    //formData.append("title", "testing");

    const savedUserResponse = await fetch(
      "http://localhost:3001/vehicle/create",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      }
    );
    const savedUser = await savedUserResponse.json();
    console.log(savedUser.title);
  };

  const getVehicleMakes = async () => {
    const response = await fetch("http://localhost:3001/vehicles", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setVehicleMakes(data);
  };

  const getVehicleModles = async (make) => {
    const response = await fetch("http://localhost:3001/vehicles/"+make, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setVehicleModels(data);
  };

  const { palette } = useTheme();

  useEffect(()=>{
    getVehicleMakes();
  },[])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={vehicleAdSchema}
      onSubmit={submitVehicleAd}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit, // <-- Ensure handleSubmit is included
        isSubmitting,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}> {/* Use handleSubmit here */}
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.price}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mileage"
            name="mileage"
            type="number"
            value={values.mileage}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.mileage && Boolean(errors.mileage)}
            helperText={touched.mileage && errors.mileage}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Year"
            name="year"
            type="number"
            value={values.year}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.year && Boolean(errors.year)}
            helperText={touched.year && errors.year}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Make"
            name="make"
            value={values.make}
            onChange={(event) => {
              const selectedValue = event.target.value === '' ? undefined : event.target.value;
              if (selectedValue)
                getVehicleModles(selectedValue);
              handleChange({ target: { name: 'make', value: selectedValue }});
            }}
            onBlur={handleBlur}
            error={touched.make && Boolean(errors.make)}
            helperText={touched.make && errors.make}
            SelectProps={{
              native: true,
            }}
            margin="normal"
          >
            <option value=""></option>
            {
              vehicleMakes.sort().map(make=>(<option value={make}>{make}</option>))
            }
          </TextField>
          <TextField
            fullWidth
            select
            label="Model"
            name="model"
            value={values.model}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.model && Boolean(errors.model)}
            helperText={touched.model && errors.model}
            SelectProps={{
              native: true,
            }}
            margin="normal"
          >
            <option value=""></option>
            {
              vehicleModels.sort().map(model=>(<option value={model}>{model}</option>))
            }
          </TextField>
          <TextField
            fullWidth
            label="Variant"
            name="variant"
            value={values.variant}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.variant && Boolean(errors.variant)}
            helperText={touched.variant && errors.variant}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Color"
            name="color"
            value={values.color}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.color && Boolean(errors.color)}
            helperText={touched.color && errors.color}
            margin="normal"
          />

          <TextField
            fullWidth
            select
            label="Condition"
            name="condition"
            value={values.condition}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.condition && Boolean(errors.condition)}
            helperText={touched.condition && errors.condition}
            SelectProps={{
              native: true,
            }}
            margin="normal"
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </TextField>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.location && Boolean(errors.location)}
            helperText={touched.location && errors.location}
            margin="normal"
          />

          <TextField
            fullWidth
            label="City Registered"
            name="cityReg"
            value={values.cityReg}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.cityReg && Boolean(errors.cityReg)}
            helperText={touched.cityReg && errors.cityReg}
            margin="normal"
          />

          {/* Display selected images */}
          <Box mt={2}>
            <Typography variant="h6">Selected Images:</Typography>
            <Box display="flex" alignItems="center">
              {values.images &&
                Array.from(values.images).map((image, index) => (
                  <Box key={index} mr={1}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index}`}
                      width={100}
                    />
                  </Box>
                ))}
            </Box>
          </Box>

          {/* Input for images */}


          <Box
            gridColumn="span 4"
            border={`1px solid ${palette.neutral.medium}`}
            borderRadius="5px"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple
              onDrop={(acceptedFiles) =>
                setFieldValue("images", [...values.images, ...acceptedFiles])
              }
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!values.images.length ? (
                    <p>Add Pictures Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{values.images.length} images selected</Typography>
                      {/* You can display the selected images here if needed */}
                    </FlexBetween>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>

          {/* <Button
            variant="contained"
            component="label"
            fullWidth
          >
            Upload Images
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(event) => {
                setFieldValue("images", [
                  ...values.images,
                  ...Array.from(event.currentTarget.files),
                ]);
              }}
              multiple
            />
          </Button> */}

          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            fullWidth
          >
            Submit
          </Button>

          {/* Submission confirmation */}
          {formSubmitted && (
            <Typography variant="body1" color="textSecondary">
              Form submitted successfully!
            </Typography>
          )}
        </form>
      )}
    </Formik>

  );
};

export default VehicleAdForm;
