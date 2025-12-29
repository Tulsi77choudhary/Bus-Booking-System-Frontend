import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSeatsByBus, selectSeats } from "../../State/Seats/Action";
import { Box, Grid, Button, Typography, Card, CardContent } from "@mui/material";

export default function SeatPage() {
  const { busNumber } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { seats, loading } = useSelector((state) => state.seat);

  // 🔹 Fetch seats
  useEffect(() => {
    if (busNumber) {
      dispatch(getSeatsByBus(busNumber));
    }
  }, [busNumber, dispatch]);

  // 🔹 Seat click → backend toggle
  const handleSeatClick = (seat) => {
    if (seat.status === "BOOKED") return;

    dispatch(selectSeats(busNumber, [seat.seatNumber]));

  };

  // 🔹 Selected seats (derived from backend state)
  const selectedSeats = seats.filter(
    (seat) => seat.status === "SELECTED"
  );

  // 🔹 Arrange seats in rows (4 per row)
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
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Button onClick={() => navigate(-1)}>← Back</Button>
            <Typography variant="h6" fontWeight="bold">
              Bus: {busNumber}
            </Typography>
          </Box>

          <Typography variant="subtitle1" align="center" mb={2}>
            Select Your Seats
          </Typography>

          {loading && (
            <Typography align="center" color="text.secondary">
              Loading seats...
            </Typography>
          )}

          {/* SEAT GRID */}
          <Box>
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
                  const isSelected = !seat.available;

                  return (
                    <Grid item xs={3} key={seat.seatNumber}>
                      <Button
                        fullWidth
                        variant={isSelected ? "contained" : "outlined"}
                        color={isSelected ? "primary" : "success"}
                        disabled={false} // booked seats ka alag logic agar needed
                        onClick={() => handleSeatClick(seat)}
                        sx={{ height: 50, fontSize: 12 }}
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
                  const isSelected = !seat.available;

                  return (
                    <Grid item xs={3} key={seat.seatNumber}>
                      <Button
                        fullWidth
                        variant={isSelected ? "contained" : "outlined"}
                        color={isSelected ? "primary" : "success"}
                        disabled={false} // booked seats ka alag logic agar needed
                        onClick={() => handleSeatClick(seat)}
                        sx={{ height: 50, fontSize: 12 }}
                      >
                        {seat.seatNumber}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            ))}
          </Box>

          {/* SUMMARY */}
          <Box mt={2} mb={3}>
            <Typography>
              <b>Selected Seats:</b>{" "}
              {selectedSeats.map((s) => s.seatNumber).join(", ") || "None"}
            </Typography>
            <Typography>
              <b>Total Fare:</b> ₹{selectedSeats.length * 500}
            </Typography>
          </Box>

          {/* CONTINUE */}
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              if (!selectedSeats.length) {
                alert("Select at least one seat");
                return;
              }

              navigate("/passenger-details", {
                state: {
                  busNumber,
                  seats: selectedSeats.map((s) => s.seatNumber),
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
