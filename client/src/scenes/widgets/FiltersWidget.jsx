import React, { useEffect, useState } from 'react';
import { IconButton, Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { useGetData, usePostData } from 'hooks/apiHook';
import { setVehicleAds, setFilterApplied } from 'state';
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

  minprice: '',
  maxprice: '',
  mileage: '',
  year: '',
  make: '',
  model: '',
  variant: '',
  // city: '',
  // area: '',
  // location: {}, 
};


const FiltersWidget = ({ isNonMobileScreen = false }) => {
  const { data: vehicleMakes } = useGetData("vehicles", '', { defValue: [] });
  const { data: vehicleModels, getData: getVehicleModels } = useGetData(undefined, '', { defValue: [] });
  const [isOpen, setOpen] = useState(true);


  const dispatch = useDispatch();

  const [location, setLocation] = useState({});

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const vehicleAds = useSelector((state) => state.vehicleAds)
  const vehicleAdsAll = useSelector((state) => state.vehicleAdsAll)
  const isFilterApplied = useSelector(state => state.isFilterApplied)
  const search = useSelector(state => state.search);

  const openFilters = () => {
    setOpen(true);
  }

  const closeFilters = () => {
    setOpen(false);
  }

  const applyFilters = (values) => {
    //check if there is any value entered
    var isValue = false;
    for (const key in values) {
      if (values[key] && String(values[key]).length != 0) {
        isValue = true;
        break;
      }
    }
    var filteredResults = [...vehicleAdsAll];
    const inValue = search.toLowerCase();
    if (inValue)
      filteredResults = filteredResults.filter(item =>
        item.make.toLowerCase() == inValue ||
        item.model.toLowerCase() == inValue
      );
    if (values['minprice']) {
      filteredResults = filteredResults.filter(item => item.price >= values['minprice'])
    }

    if (values['maxprice']) {
      filteredResults = filteredResults.filter(item => item.price <= values['maxprice'])
    }

    filteredResults = filterResults(filteredResults, values, ['minprice', 'maxprice'])

    if (isValue) {
      dispatch(setFilterApplied({ isFilterApplied: true }));
      dispatch(setVehicleAds({ vehicleAds: filteredResults }))
    }
  }

  function filterResults(data, params, omitKeys) {
    return data.filter(item => {
      for (const key in params) {
        if (omitKeys.includes(key))
          continue;
        if (params[key] !== '' && params[key] !== undefined) {
          if (item[key] !== params[key]) {
            return false;
          }
        }
      }
      return true;
    });
  }

  useEffect(() => {
    setOpen(isNonMobileScreen);
  }, [isNonMobileScreen]);


  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography variant="h4" fontWeight={500}
          mt={1} mb={1}
          ml={1}
        >
          Filters
        </Typography>

        <Typography variant="body2" >
          {isFilterApplied ? "(applied)" : ""}
        </Typography>

        {
          isOpen ?
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
            resetForm
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
                label="Min Price"
                name="minprice"
                type="number"
                value={values.minprice}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && Boolean(errors.minprice)}
                helperText={touched.minprice && errors.minprice}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Max Price"
                name="maxprice"
                type="number"
                value={values.maxprice}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && Boolean(errors.maxprice)}
                helperText={touched.maxprice && errors.maxprice}
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

              {/* <TextField
                fullWidth
                select
                label="Year"
                name="year"
                type='number'
                value={values.year}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.year && Boolean(errors.year)}
                helperText={touched.year && errors.year}
                SelectProps={{
                  native: true,
                }}
                margin="normal"
              >
                <option value=""></option>
                {
                  [...Array(2025 - 1900).keys()].reverse().map(x => <option value={(""+(x + 1900))}>{x + 1900}</option>)
                }
              </TextField> */}

              <Button onClick={() => { applyFilters(values); }}>
                apply
              </Button>
              <Button onClick={() => {
                resetForm();
                const inValue = search.toLowerCase();
                var filteredResults = vehicleAdsAll;
                if (inValue)
                  filteredResults = filteredResults.filter(item =>
                    item.make.toLowerCase() == inValue ||
                    item.model.toLowerCase() == inValue
                  )
                dispatch(setVehicleAds({ vehicleAds: filteredResults }));
                dispatch(setFilterApplied({ isFilterApplied: false }));
              }}>
                clear
              </Button>
            </form>
          )}
        </Formik>
      }
    </WidgetWrapper>
  );
};

export default FiltersWidget;
