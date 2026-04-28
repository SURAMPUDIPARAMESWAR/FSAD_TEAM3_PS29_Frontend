import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { api } from "../api/http";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("student");
  const [mfaOpen, setMfaOpen] = useState(false);
  const [generatedMfaCode, setGeneratedMfaCode] = useState("");
  const [enteredMfaCode, setEnteredMfaCode] = useState("");
  const [pendingAuthData, setPendingAuthData] = useState(null);
  const [mfaError, setMfaError] = useState("");

  const generateMfaCode = () => {
    return String(Math.floor(100000 + Math.random() * 900000));
  };

  const finalizeLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: data.email,
        name: data.name || data.email?.split("@")[0] || "Student",
        role: data.role
      })
    );
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("auth-changed"));

    if (data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/student");
    }
  };

  const openMfaStep = (data) => {
    const nextCode = generateMfaCode();

    setPendingAuthData(data);
    setGeneratedMfaCode(nextCode);
    setEnteredMfaCode("");
    setMfaError("");
    setMfaOpen(true);

    // Demo delivery channel until backend OTP/email provider is connected.
    alert(`Your MFA code is: ${nextCode}`);
  };

  const handleVerifyMfa = () => {
    if (!pendingAuthData) {
      setMfaError("Session expired. Please login again.");
      return;
    }

    if (enteredMfaCode.trim() !== generatedMfaCode) {
      setMfaError("Invalid MFA code");
      return;
    }

    setMfaOpen(false);
    finalizeLogin(pendingAuthData);
  };

  const handleResendMfa = () => {
    const nextCode = generateMfaCode();
    setGeneratedMfaCode(nextCode);
    setMfaError("");

    // Demo delivery channel until backend OTP/email provider is connected.
    alert(`Your new MFA code is: ${nextCode}`);
  };


  const handleLogin = async () => {

    try {
      const { data } = await api.post("/api/users/login", { email, password });

      if (!data) {
        alert("Invalid credentials");
        return;
      }

      if ((data.role || "").toLowerCase() !== selectedRole) {
        alert("Selected role does not match your account role");
        return;
      }

      openMfaStep(data);

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
          onClick={() => navigate("/register")}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: 1.8,
            px: 2,
            background: "linear-gradient(90deg, #1f6cdf 0%, #1f9cc8 100%)"
          }}
        >
          Register
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
            Login
          </Typography>

          <Typography sx={{ mt: 0.8, mb: 1.2, color: "#3f648f", fontSize: 14 }}>
            Access your academic analytics dashboard.
          </Typography>

          <Typography sx={{ mb: 1.1, color: "#245996", fontSize: 12.5, fontWeight: 600 }}>
            Multi-factor authentication is enabled for this login.
          </Typography>

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.8,
                bgcolor: "#ffffff"
              }
            }}
          />

          <FormControl
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.8,
                bgcolor: "#ffffff"
              }
            }}
          >
            <InputLabel id="login-role-label">Role</InputLabel>
            <Select
              labelId="login-role-label"
              label="Role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

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
            onClick={handleLogin}
          >
            Login
          </Button>

          <Button
            fullWidth
            sx={{
              mt: 1,
              textTransform: "none",
              color: "#1e66c8",
              fontWeight: 600
            }}
            onClick={() => navigate("/register")}
          >
            New user? Register
          </Button>

        </CardContent>

      </Card>

      <Dialog
        open={mfaOpen}
        onClose={() => setMfaOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ color: "#17448c", fontWeight: 700 }}>
          Verify MFA Code
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 1.5, color: "#3f648f", fontSize: 14 }}>
            Enter the 6-digit code sent to your registered channel.
          </Typography>

          <TextField
            label="MFA Code"
            fullWidth
            value={enteredMfaCode}
            onChange={(e) => {
              setEnteredMfaCode(e.target.value.replace(/\D/g, "").slice(0, 6));
              setMfaError("");
            }}
            error={Boolean(mfaError)}
            helperText={mfaError || "Use the code shown in alert (demo mode)."}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 6 }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={handleResendMfa} sx={{ textTransform: "none", fontWeight: 600 }}>
            Resend Code
          </Button>
          <Button onClick={() => setMfaOpen(false)} sx={{ textTransform: "none", fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleVerifyMfa}
            sx={{ textTransform: "none", fontWeight: 700 }}
          >
            Verify
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );

}

export default Login;