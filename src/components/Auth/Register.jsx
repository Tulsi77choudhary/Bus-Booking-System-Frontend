import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../State/Action/Action";

import { Grid, TextField, Button, MenuItem } from "@mui/material";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      phone: data.get("phone"),
      role: data.get("role")  
    };

    console.log("Register Payload:", userData);

    dispatch(register(userData));
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* FIRST NAME */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
            />
          </Grid>

          {/* LAST NAME */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
            />
          </Grid>

          {/* EMAIL */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>

          {/* PASSWORD */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
            />
          </Grid>

          {/* PHONE */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone Number"
              fullWidth
            />
          </Grid>

          {/* ROLE SELECT */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              required
              id="role"
              name="role"
              label="Role"
              fullWidth
              defaultValue="USER"
            >
              <MenuItem value="USER">User</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </TextField>
          </Grid>

          {/* SUBMIT BUTTON */}
          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* LOGIN REDIRECT */}
      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p>Already have an account ?</p>
          <Button
            onClick={() => navigate("/")}
            className="ml-5"
            size="small"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
