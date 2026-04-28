import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography
} from "@mui/material";

function Home() {
  const navigate = useNavigate();

  const keyPoints = [
    {
      title: "Unified Academic Dashboard",
      description:
        "Bring attendance, marks, progress trends, and reports into one easy-to-use workspace for faster academic decisions."
    },
    {
      title: "Role-Based Access",
      description:
        "Separate experiences for admin and student users help keep data secure, focused, and relevant for each role."
    },
    {
      title: "Live Performance Tracking",
      description:
        "Track growth continuously with actionable insights instead of waiting for end-of-term reports."
    }
  ];

  const reasons = [
    "Clear visualization of performance and attendance patterns.",
    "Faster identification of students who need support.",
    "Simple workflows for registering, logging in, and accessing reports.",
    "Designed for practical usage by institutions and learners."
  ];

  const appDetails = [
    {
      label: "Core Modules",
      value: "Authentication, Attendance, Marks Management, Reports, Student Insights"
    },
    {
      label: "Primary Users",
      value: "Administrators and Students"
    },
    {
      label: "Key Outcomes",
      value: "Improved transparency, quicker interventions, and better academic planning"
    }
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f8ff",
        backgroundImage:
          "radial-gradient(circle at 15% 15%, rgba(70, 170, 255, 0.25), transparent 42%), radial-gradient(circle at 85% 10%, rgba(0, 207, 180, 0.22), transparent 38%), radial-gradient(circle at 50% 100%, rgba(40, 86, 255, 0.2), transparent 46%)"
      }}
    >
      <Box
        component="header"
        sx={{
          height: 82,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid rgba(28, 80, 171, 0.12)",
          bgcolor: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(6px)",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: 0.8,
                background:
                  "linear-gradient(180deg, #2fd5ff 0%, #3f8fff 52%, #2563eb 100%)",
                boxShadow: "0 8px 18px rgba(42, 110, 230, 0.3)"
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: 20, sm: 30 },
                lineHeight: 1,
                fontWeight: 800,
                color: "#1f4da8"
              }}
            >
              Student Analytics System
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button
              onClick={() => navigate("/login")}
              sx={{
                color: "#1e3e80",
                fontWeight: 700,
                textTransform: "none"
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/register")}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                py: 1,
                borderRadius: 1.4,
                bgcolor: "#2866d9",
                boxShadow: "0 8px 20px rgba(40, 102, 217, 0.35)",
                "&:hover": {
                  bgcolor: "#1f56bd"
                }
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Container>
      </Box>

      <Box
        sx={{
          minHeight: "calc(100vh - 82px)",
          background:
            "linear-gradient(120deg, #1d5fcb 0%, #207fbf 44%, #176a9f 100%)",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            opacity: 0.3,
            pointerEvents: "none"
          }
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ py: { xs: 6, md: 8 }, display: "flex", alignItems: "center" }}
        >
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gap: { xs: 4, md: 6 },
              gridTemplateColumns: { xs: "1fr", md: "1.06fr 0.94fr" },
              alignItems: "center"
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#f4fbff",
                  fontSize: { xs: 42, sm: 58, md: 74 },
                  lineHeight: 1.1,
                  fontWeight: 800,
                  maxWidth: 680
                }}
              >
                Empower Education
                <br />
                with Data-Driven
                <br />
                Insights
              </Typography>

              <Typography
                sx={{
                  mt: 3,
                  color: "#d8f2ff",
                  fontSize: { xs: 19, sm: 23 },
                  lineHeight: 1.55,
                  maxWidth: 720
                }}
              >
                A comprehensive platform for students, teachers to track academic progress in real-time.
              </Typography>

              <Stack sx={{ mt: 4.5 }} spacing={2.2}>
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{
                    width: { xs: "100%", sm: 580 },
                    maxWidth: "100%",
                    py: 1.6,
                    fontSize: { xs: 22, sm: 28 },
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 1.5,
                    bgcolor: "#2f8dff",
                    boxShadow: "0 10px 26px rgba(22, 77, 164, 0.4)",
                    "&:hover": {
                      bgcolor: "#1e7cf0"
                    }
                  }}
                >
                  Login Now
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate("/register")}
                  sx={{
                    width: "fit-content",
                    px: 3.4,
                    py: 1.35,
                    fontSize: { xs: 22, sm: 28 },
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 1.5,
                    bgcolor: "#f0fbff",
                    color: "#1f6fcf",
                    boxShadow: "0 8px 20px rgba(10, 32, 81, 0.25)",
                    "&:hover": {
                      bgcolor: "#e0f4ff"
                    }
                  }}
                >
                  Create Account
                </Button>
              </Stack>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(130px, 1fr))",
                justifyItems: "center",
                alignItems: "center",
                rowGap: { xs: 3, md: 5 },
                columnGap: { xs: 2, md: 4 },
                pt: { xs: 0, md: 1 },
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                borderRadius: 4,
                backdropFilter: "blur(8px)",
                px: { xs: 1.5, sm: 2.2 },
                py: { xs: 2, sm: 2.8 },
                "@keyframes slowBlink": {
                  "0%": { opacity: 1 },
                  "45%": { opacity: 1 },
                  "50%": { opacity: 0.42 },
                  "55%": { opacity: 1 },
                  "100%": { opacity: 1 }
                }
              }}
            >
              <Box
                sx={{
                  fontSize: { xs: 94, md: 130 },
                  animation: "slowBlink 9s ease-in-out infinite"
                }}
              >
                📈
              </Box>
              <Box
                sx={{
                  fontSize: { xs: 94, md: 130 },
                  animation: "slowBlink 10s ease-in-out infinite",
                  animationDelay: "1.2s"
                }}
              >
                📊
              </Box>
              <Box
                sx={{
                  fontSize: { xs: 94, md: 130 },
                  animation: "slowBlink 11s ease-in-out infinite",
                  animationDelay: "2s"
                }}
              >
                🧑‍🎓
              </Box>
              <Box
                sx={{
                  fontSize: { xs: 94, md: 130 },
                  animation: "slowBlink 10.5s ease-in-out infinite",
                  animationDelay: "2.8s"
                }}
              >
                👩‍🏫
              </Box>
              <Box
                sx={{
                  gridColumn: "1 / span 2",
                  fontSize: { xs: 94, md: 130 },
                  animation: "slowBlink 12s ease-in-out infinite",
                  animationDelay: "3.5s"
                }}
              >
                👨‍👩‍👧‍👦
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            sx={{
              color: "#17448c",
              fontSize: { xs: 30, sm: 38 },
              fontWeight: 800,
              mb: 1
            }}
          >
            Key Points
          </Typography>
          <Typography sx={{ color: "#3f648f", fontSize: 17, mb: 4 }}>
            Everything you need to understand student growth in one connected platform.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 2.2
            }}
          >
            {keyPoints.map((point) => (
              <Box
                key={point.title}
                sx={{
                  p: 2.8,
                  borderRadius: 3,
                  background: "rgba(255, 255, 255, 0.85)",
                  border: "1px solid rgba(34, 94, 180, 0.14)",
                  boxShadow: "0 10px 24px rgba(25, 79, 158, 0.08)"
                }}
              >
                <Typography sx={{ color: "#1b4f9e", fontWeight: 800, fontSize: 20, mb: 1 }}>
                  {point.title}
                </Typography>
                <Typography sx={{ color: "#405f85", lineHeight: 1.7 }}>
                  {point.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 7, md: 9 }, background: "linear-gradient(180deg, #f0f7ff 0%, #e8f3ff 100%)" }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
            gap: 3.2,
            alignItems: "stretch"
          }}
        >
          <Box
            sx={{
              p: { xs: 2.6, md: 3.2 },
              borderRadius: 3,
              background: "#ffffff",
              border: "1px solid rgba(34, 94, 180, 0.12)",
              boxShadow: "0 12px 26px rgba(25, 79, 158, 0.08)"
            }}
          >
            <Typography sx={{ color: "#17448c", fontSize: { xs: 28, sm: 34 }, fontWeight: 800, mb: 1 }}>
              Why Choose This Platform
            </Typography>
            <Typography sx={{ color: "#406387", mb: 2.2 }}>
              Built to make educational analytics practical, visual, and decision-ready.
            </Typography>

            <Stack spacing={1.5}>
              {reasons.map((reason) => (
                <Box
                  key={reason}
                  sx={{
                    p: 1.6,
                    borderRadius: 2,
                    bgcolor: "#f5f9ff",
                    border: "1px solid rgba(34, 94, 180, 0.1)"
                  }}
                >
                  <Typography sx={{ color: "#2f547d", lineHeight: 1.65 }}>{reason}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box
            sx={{
              p: { xs: 2.6, md: 3.2 },
              borderRadius: 3,
              background: "linear-gradient(150deg, #1d67cf 0%, #1c88bd 100%)",
              color: "#ffffff",
              boxShadow: "0 16px 30px rgba(27, 97, 183, 0.28)"
            }}
          >
            <Typography sx={{ fontSize: { xs: 28, sm: 34 }, fontWeight: 800, mb: 2 }}>
              Application Details
            </Typography>

            <Stack spacing={1.8}>
              {appDetails.map((detail) => (
                <Box
                  key={detail.label}
                  sx={{
                    p: 1.6,
                    borderRadius: 2,
                    bgcolor: "rgba(255, 255, 255, 0.12)",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}
                >
                  <Typography sx={{ fontSize: 13, opacity: 0.85, mb: 0.6 }}>{detail.label}</Typography>
                  <Typography sx={{ fontSize: 16, fontWeight: 700, lineHeight: 1.55 }}>
                    {detail.value}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              borderRadius: 3,
              p: { xs: 2.6, md: 3.6 },
              background: "#ffffff",
              border: "1px solid rgba(34, 94, 180, 0.12)",
              boxShadow: "0 12px 24px rgba(25, 79, 158, 0.08)",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              gap: 2
            }}
          >
            <Box>
              <Typography sx={{ color: "#17448c", fontSize: { xs: 28, sm: 34 }, fontWeight: 800 }}>
                Ready To Explore Student Insights?
              </Typography>
              <Typography sx={{ color: "#45668a", mt: 0.6 }}>
                Join now and bring data-backed decisions into daily academic workflows.
              </Typography>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 1.8,
                  px: 3,
                  background: "linear-gradient(90deg, #1f6cdf 0%, #1f9cc8 100%)"
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/register")}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 1.8,
                  px: 3,
                  borderColor: "#2d76d6",
                  color: "#2d76d6"
                }}
              >
                Create Account
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;