import React, { useState, useEffect } from "react";
import RoundProgressBar from 'components/RoundProgressBar';
import { useSelector } from 'react-redux'

import { Box, useMediaQuery } from "@mui/material";
import LineGraph from "components/lineGraph";

const Dashboard = () => {
    const [report, setReport] = useState();
    const token = useSelector(state => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    useEffect(() => {
        getReport();
    }, []);

    const getReport = async () => {
        try {
            const response = await fetch("http://localhost:3001/report", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();

                setReport(data);
            } else {
                console.error("Failed to fetch report:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching report:", error);
        }
    };

    const dummySiteVisitsData = [
        { date: "2024-04-01", visits: 100 },
        { date: "2024-04-02", visits: 150 },
        { date: "2024-04-03", visits: 200 },
        { date: "2024-04-04", visits: 180 },
        { date: "2024-04-05", visits: 220 },
        { date: "2024-04-06", visits: 250 },
        { date: "2024-04-07", visits: 300 },
    ];
    return (
        report &&
        <Box
            width="100%"
            padding="2rem 6%"
            display={"flex"}
            flexDirection={isNonMobileScreens ? 'row' : 'column-reverse'}
            gap="0.5rem"
            justifyContent="space-between"
        >
            <Box flexBasis={isNonMobileScreens ?'50%':'100%'}>
                <h2>Site Visits Graph</h2>
                <LineGraph data={dummySiteVisitsData} />
            </Box>

            <Box flexBasis={isNonMobileScreens ?'50%':'100%'}>
            <Box display="flex" flexWrap="wrap" justifyContent={'center'}>
                <RoundProgressBar title='Users Registered' valueText={report.usersN} />
                <RoundProgressBar title='Vehicles on Sale' valueText={report.vehiclesN} />
                <RoundProgressBar title='Vehicles Sold'
                    isValue={true}
                    value={(report.vehiclesSoldN / report.vehiclesN)}
                    valueText={`${report.vehiclesSoldN}/${report.vehiclesN}`}
                />
                <RoundProgressBar title='Issues Reported'
                    isValue={true}
                    value={(report.issuesNewN / report.issuesN)}
                    valueText={`${report.issuesNewN}/${report.issuesN}`}
                />
            </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
