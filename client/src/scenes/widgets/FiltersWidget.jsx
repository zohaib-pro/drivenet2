import React, { useEffect, useState } from 'react';
import { IconButton, Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { useGetData, usePostData } from 'hooks/apiHook';
import * as yup from 'yup';
import WidgetWrapper from 'components/WidgetWrapper';


import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

import { useDispatch, useSelector } from "react-redux";
import useAlertBox from 'components/AlertBox';


// Define Yup validation schema
// const vehicleAdSchema = yup.object().shape({
//   title: yup.string().required('Title is required'),
//   description: yup.string().required('Description is required'),
//   price: yup.number().required('Price is required').positive('Price must be a positive number'),
//   mileage: yup.number().required('Mileage is required').positive('Mileage must be a positive number'),
//   year: yup.number().required('Year is required').positive('Year must be a positive number').integer('Year must be an integer'),
//   make: yup.string().required('Make is required'),
//   model: yup.string().required('Model is required'),
//   city: yup.string().required('Location is required'),
//   area: yup.string().required('Location is required'),
//   cityReg: yup.string().required('Registration city is required'),
//   Color: yup.string().required('Color is required'),
//   images: yup.array().of(yup.string()).min(1, 'At least one image is required'),
// });

const initialValues = {
  title: '',
  description: '',
  price: '',
  mileage: '',
  year: '',
  make: '',
  model: '',
  variant: '',
  cityReg: 'Not Registered',
  color: '',
  city: '',
  area: '',
  location: {},
  images: [],
};


const FiltersWidget = ({ isNonMobileScreen = false }) => {
  const { data: vehicleMakes } = useGetData("vehicles");
  const { data: vehicleModels, getData: getVehicleModels } = useGetData();

  const [isOpen, setOpen] = useState(true);

  const [location, setLocation] = useState({});

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const openFilters = () => {
    setOpen(true);
  }

  const closeFilters = () => {
    setOpen(false);
  }

  useEffect(()=>{
    setOpen(isNonMobileScreen);
  }, [isNonMobileScreen])
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography variant="h4" fontWeight={500}
          mt={1} mb={1}
          ml={1}
        >
          Filters
        </Typography>

        {
          isOpen?
            <IconButton onClick={closeFilters}>
              <KeyboardArrowUp />
            </IconButton>
            :
            <IconButton onClick={openFilters}>
              <KeyboardArrowDown />
            </IconButton>
        }
      </FlexBetween>
      {
        ((isOpen && isNonMobileScreen) || (isOpen && !isNonMobileScreen)) &&
        <Formik
          initialValues={initialValues}
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
                select
                label="Make"
                name="make"
                value={values.make}
                onChange={(event) => {
                  const selectedValue = event.target.value === '' ? undefined : event.target.value;
                  if (selectedValue)
                    getVehicleModels("vehicles/" + selectedValue);
                  handleChange({ target: { name: 'make', value: selectedValue } });
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
                  vehicleMakes.map(make => (<option value={make}>{make}</option>))
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
                  vehicleModels.sort().map(model => (<option value={model}>{model}</option>))
                }
              </TextField>
              <TextField
                fullWidth
                label="Variant (Optional)"
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

              <Button>
                apply
              </Button>
            </form>
          )}
        </Formik>
      }
    </WidgetWrapper>
  );
};

export default FiltersWidget;