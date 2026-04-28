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
        background:
          "radial-gradient(circle at 14% 18%, rgba(65, 152, 255, 0.25), transparent 40%), radial-gradient(circle at 85% 0%, rgba(15, 189, 178, 0.24), transparent 34%), linear-gradient(135deg, #e8f2ff 0%, #d8ecff 48%, #c8e5ff 100%)",
        px: 2,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(31, 84, 166, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(31, 84, 166, 0.07) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          pointerEvents: "none"
        },
        "@keyframes floatPulse": {
          "0%": { transform: "translateY(0px)", opacity: 0.24 },
          "50%": { transform: "translateY(-10px)", opacity: 0.35 },
          "100%": { transform: "translateY(0px)", opacity: 0.24 }
        }
      }}
    >

      <Box
        sx={{
          position: "absolute",
          top: { xs: 14, sm: 20 },
          right: { xs: 14, sm: 24 },
          display: "flex",
          gap: 1,
          zIndex: 2
        }}
      >
        <Button
          variant="text"
          onClick={() => navigate("/")}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            color: "#1d4f9e"
          }}
        >
          Home
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: 1.8,
            px: 2,
            background: "linear-gradient(90deg, #1f6cdf 0%, #1f9cc8 100%)"
          }}
        >
          Login
        </Button>
      </Box>

      <Typography
        sx={{
          position: "absolute",
          top: { xs: 88, md: 72 },
          left: { xs: -18, md: 42 },
          fontSize: { xs: 28, md: 52 },
          fontWeight: 800,
          letterSpacing: 1.5,
          color: "rgba(20, 69, 145, 0.2)",
          userSelect: "none",
          pointerEvents: "none",
          animation: "floatPulse 5s ease-in-out infinite"
        }}
      >
        Student Analytics System
      </Typography>

      <Typography
        sx={{
          position: "absolute",
          bottom: { xs: 52, md: 40 },
          right: { xs: -10, md: 36 },
          fontSize: { xs: 24, md: 42 },
          fontWeight: 800,
          letterSpacing: 1,
          color: "rgba(31, 108, 223, 0.16)",
          userSelect: "none",
          pointerEvents: "none",
          animation: "floatPulse 5.8s ease-in-out infinite"
        }}
      >
        Student Analytics System
      </Typography>

      <Card
        sx={{
          width: 430,
          maxWidth: "100%",
          p: 3.2,
          borderRadius: 4,
          position: "relative",
          zIndex: 1,
          background: "rgba(255, 255, 255, 0.88)",
          border: "1px solid rgba(37, 98, 182, 0.16)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 20px 45px rgba(24, 72, 143, 0.18)"
        }}
      >
        <CardContent>

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#17448c", letterSpacing: 0.2 }}
          >
            Register
          </Typography>

          <Typography sx={{ mt: 0.8, mb: 1.2, color: "#3f648f", fontSize: 14 }}>
            Create your account to track learning performance.
          </Typography>

          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.8,
                bgcolor: "#ffffff"
              }
            }}
          />

          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.8,
                bgcolor: "#ffffff"
              }
            }}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.8,
                bgcolor: "#ffffff"
              }
            }}
          />

          <TextField
            label="Role"
            fullWidth
            margin="normal"
            value="Student"
            InputProps={{ readOnly: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.8,
                bgcolor: "#ffffff"
              }
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.1,
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 2,
              background: "linear-gradient(90deg, #1f6cdf 0%, #1f9cc8 100%)",
              boxShadow: "0 10px 24px rgba(24, 91, 182, 0.32)",
              "&:hover": {
                background: "linear-gradient(90deg, #185dc2 0%, #1b8aae 100%)"
              }
            }}
            onClick={handleRegister}
          >
            Register
          </Button>

          <Button
            fullWidth
            sx={{
              mt: 1,
              textTransform: "none",
              color: "#1e66c8",
              fontWeight: 600
            }}
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
