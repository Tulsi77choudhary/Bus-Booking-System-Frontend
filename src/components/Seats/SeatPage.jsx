import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSeatsByBus } from "../../State/Seats/Action";
import {
  Box,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

export default function SeatPage() {
  const { busNumber } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { seats, loading } = useSelector((state) => state.seat);

  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState([]);

    useEffect(() => {
      if (busNumber) {
      dispatch(getSeatsByBus(busNumber));
    }
  }, [busNumber, dispatch]);

  const handleSeatClick = (seat) => {
    if (!seat.available) return; 

    setSelectedSeatNumbers((prev) =>
      prev.includes(seat.seatNumber)
        ? prev.filter((s) => s !== seat.seatNumber)
        : [...prev, seat.seatNumber]
    );
  };

  const selectedSeats = seats.filter((seat) =>
    selectedSeatNumbers.includes(seat.seatNumber)
  );

  const seatRows = [];
  for (let i = 0; i < seats.length; i += 4) {
    seatRows.push(seats.slice(i, i + 4));
  }

  return (
    <Box
      sx={{
        minHeight: "600px",
        p: 2,
        bgcolor: "primary.light",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Card sx={{ width: { xs: "95%", sm: 420 }, borderRadius: 4, boxShadow: 4 }}>
        <CardContent>
          {/* HEADER */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Button onClick={() => navigate(-1)}>← Back</Button>
            <Typography fontWeight="bold">Bus: {busNumber}</Typography>
          </Box>

          <Typography align="center" mb={2}>
            Select Your Seats
          </Typography>

          {loading && (
            <Typography align="center" color="text.secondary">
              Loading seats...
            </Typography>
          )}

          {/* SEATS GRID */}
          {seatRows.map((row, rowIndex) => (
            <Grid
              container
              spacing={1}
              justifyContent="center"
              mb={1}
              key={rowIndex}
            >
              {/* LEFT SIDE */}
              {row.slice(0, 2).map((seat) => {
                const isSelected = selectedSeatNumbers.includes(
                  seat.seatNumber
                );

                return (
                  <Grid item xs={3} key={seat.seatNumber}>
                    <Button
                      fullWidth
                      sx={{ height: 48, fontSize: 12 }}
                      variant={isSelected ? "contained" : "outlined"}
                      color={
                        !seat.available
                          ? "error"
                          : isSelected
                            ? "primary"
                            : "success"
                      }
                      disabled={!seat.available}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {seat.seatNumber}
                    </Button>
                  </Grid>
                );
              })}

              {/* AISLE */}
              <Grid item xs={2} />

              {/* RIGHT SIDE */}
              {row.slice(2, 4).map((seat) => {
                const isSelected = selectedSeatNumbers.includes(
                  seat.seatNumber
                );

                return (
                  <Grid item xs={3} key={seat.seatNumber}>
                    <Button
                      fullWidth
                      sx={{ height: 48, fontSize: 12 }}
                      variant={isSelected ? "contained" : "outlined"}
                      color={
                        !seat.available
                          ? "error"
                          : isSelected
                            ? "primary"
                            : "success"
                      }
                      disabled={!seat.available}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {seat.seatNumber}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          ))}

          {/* SUMMARY */}
          <Box mt={2}>
            <Typography>
              <b>Selected Seats:</b>{" "}
              {selectedSeatNumbers.join(", ") || "None"}
            </Typography>
            <Typography>
              <b>Total Fare:</b> ₹{selectedSeatNumbers.length * 500}
            </Typography>
          </Box>

          {/* CONTINUE */}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              if (!selectedSeatNumbers.length) {
                alert("Please select at least one seat");
                return;
              }

              navigate("/passenger-details", {
                state: {
                  busNumber,
                  seats: selectedSeatNumbers,
                },
              });
            }}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
