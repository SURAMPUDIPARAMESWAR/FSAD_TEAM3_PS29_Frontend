import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button
} from "@mui/material";
import { api } from "../api/http";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {

  if (!formData.name || !formData.email || !formData.password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const { data } = await api.post(
      "/api/users/register",
      {
        ...formData,
        role: "student"
      },
      { responseType: "text" }
    );

    alert(data);

    if (data === "Registered successfully") {
      navigate("/login");
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#f4f6f8,#e2e8f0)"
      }}
    >
      <Card sx={{ width: 420, p: 3, borderRadius: 3 }}>
        <CardContent>

          <Typography variant="h5" fontWeight="bold">
            Register
          </Typography>

          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          <TextField
            label="Role"
            fullWidth
            margin="normal"
            value="Student"
            InputProps={{ readOnly: true }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>

          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate("/login")}
          >
            Account exists? Login
          </Button>

        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;
