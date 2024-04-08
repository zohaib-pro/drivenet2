import React, { useState } from "react";
import { Box, Button, IconButton, Modal, TextField, useTheme, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";
import EventWidgetGallery from "scenes/widgets/EventGalleryWidget";



const eventSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    datetime: yup.date().required("Date is required"),
    picture: yup.string().required("Image is required"),
});

const initialValues = {
    title: "",
    description: "",
    datetime: "",
    picture: "",
};

const EventHandlerComponent = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const token = useSelector((state) => state.token);

    const { palette } = useTheme();

 
    const submitEvent = async (values, onSubmitProps) => {

        const response = await fetch(`http://localhost:3001/events/create`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(values)
        });
        //const newEvent = await response.json();
        handleClose();
    };

    return (
        <Box>
            {/* Plus icon to toggle the form */}
            <Box sx={{ mt: 2, display: "flex", justifyContent: "end" }}>
                <Button startIcon={<AddIcon />} onClick={handleOpen} color="primary">
                    Add Event
                </Button>
            </Box>
            

            {/* Modal for the form */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        minWidth: 300,
                    }}
                >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={eventSchema}
                        onSubmit={submitEvent}
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
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Event Title"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.title}
                                    name="title"
                                    error={Boolean(touched.title) && Boolean(errors.title)}
                                    helperText={touched.title && errors.title}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.description}
                                    name="description"
                                    error={Boolean(touched.description) && Boolean(errors.description)}
                                    helperText={touched.description && errors.description}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField

                                    type="datetime-local"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.date}
                                    name="datetime"
                                    error={Boolean(touched.date) && Boolean(errors.date)}
                                    helperText={touched.date && errors.date}
                                    fullWidth
                                    margin="normal"
                                />

                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) => {
                                        setFieldValue("picture", acceptedFiles[0])
                                    }
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
                                            {!values.picture ? (
                                                <p>Add Picture Here</p>
                                            ) : (
                                                <FlexBetween>
                                                    <Typography>{values.picture.name}</Typography>
                                                    <EditOutlinedIcon />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Modal>

            <EventWidgetGallery horizontal={true} editable={true} />
        </Box>
    );
};

export default EventHandlerComponent;
