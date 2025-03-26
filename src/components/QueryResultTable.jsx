import React, { useRef, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,  
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const QueryResultTable = ({ data }) => {
  const tableRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    // Simulating a loading delay
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500); 

    return () => clearTimeout(timeout);
  }, [data]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <CircularProgress color="primary" /> 
      </div>
    );
  }

  if (!data || data.length === 0) return <p>No data available</p>;

  const headers = Object.keys(data[0]);

  const scrollLeft = () => {
    if (tableRef.current) tableRef.current.scrollLeft -= 200;
  };

  const scrollRight = () => {
    if (tableRef.current) tableRef.current.scrollLeft += 200;
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Navigation Buttons */}
      <IconButton
        onClick={scrollLeft}
        style={{
          position: "absolute",
          left: "-3rem",
          top: "1.7rem",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "white",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        <ArrowBack />
      </IconButton>

      <IconButton
        onClick={scrollRight}
        style={{
          position: "absolute",
          right: "-3rem",
          top: "1.7rem",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "white",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        <ArrowForward />
      </IconButton>

      {/* Result Table */}
      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <div ref={tableRef} style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* Header Row */}
                {headers.map((header) => (
                  <TableCell key={header} style={{ fontWeight: "bold", minWidth: "150px" }}>
                    {header.toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            
            <TableBody>
              {/* Data Rows */}
              {data.map((row, index) => (
                <TableRow key={index}>
                  {headers.map((header) => (
                    <TableCell key={header} style={{ minWidth: "150px" }}>
                      {row[header]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </div>
  );
};

export default QueryResultTable;
