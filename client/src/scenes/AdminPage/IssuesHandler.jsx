import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const IssuesHandlerComponent = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await fetch("http://localhost:3001/issues", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        }); 
      if (response.ok) {
        const data = await response.json();
        setIssues(data);
      } else {
        console.error("Failed to fetch issues:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Vehicle Ad ID</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue._id}>
              <TableCell>{issue.userId}</TableCell>
              <TableCell>{issue.vehicleAdId}</TableCell>
              <TableCell>{issue.details}</TableCell>
              <TableCell>{issue.category}</TableCell>
              <TableCell>{issue.status}</TableCell>
              <TableCell>{new Date(issue.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IssuesHandlerComponent;
