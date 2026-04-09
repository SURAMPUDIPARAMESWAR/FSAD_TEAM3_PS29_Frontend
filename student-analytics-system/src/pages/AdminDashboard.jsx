import { useMemo, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import DashboardCard from "../components/DashboardCard";
import { useData } from "../context/DataContext";

import Grid from "@mui/material/Grid"; // ✅ FIXED
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#22C55E", "#16A34A", "#F59E0B", "#EF4444", "#3B82F6", "#9333EA"];
const subjects = ["Math", "Science", "English", "History"];
const examTypes = [
  "Midterm 1",
  "Midterm 2",
  "Lab Internal",
  "Lab External",
  "End Semester Exam",
  "Assignment",
  "Quiz"
];

const normalizeExamType = (value) => String(value || "Midterm 1").trim().toLowerCase();

const isMatchingExamType = (recordExamType, selectedExamType) =>
  normalizeExamType(recordExamType) === normalizeExamType(selectedExamType);

function AdminDashboard() {

  const { students, marks, attendance } = useData();
  const [search, setSearch] = useState("");
  const [selectedExam, setSelectedExam] = useState("Midterm 1");

  const totalStudents = students.length;

  const examMarks = useMemo(
    () =>
      marks.filter((mark) =>
        isMatchingExamType(mark?.examType || "Midterm 1", selectedExam)
      ),
    [marks, selectedExam]
  );

  const getGradeFromScore = (score) => {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 40) return "D";
    return "F";
  };

  const examTotalsByEmail = useMemo(() => {
    const scoreMap = {};

    students.forEach((student) => {
      const email = String(student?.email || "").toLowerCase().trim();
      if (email) {
        scoreMap[email] = { total: 0, count: 0 };
      }
    });

    examMarks.forEach((m) => {
      const email = String(m?.email || m?.student || "").toLowerCase().trim();
      const score = Number(m?.score ?? m?.marksObtained ?? 0);

      if (!email || !Number.isFinite(score)) return;

      if (!scoreMap[email]) {
        scoreMap[email] = { total: 0, count: 0 };
      }

      scoreMap[email].total += score;
      scoreMap[email].count += 1;
    });

    const totalMap = {};
    Object.keys(scoreMap).forEach((email) => {
      totalMap[email] = scoreMap[email].total;
    });

    return totalMap;
  }, [students, examMarks]);

  const getStudentTotal = (student) => {
    const email = String(student?.email || "").toLowerCase().trim();
    const emailTotal = examTotalsByEmail[email];

    if (Number.isFinite(emailTotal)) return emailTotal;
    return Number(student?.overall) || 0;
  };

  const getStudentAverage = (student) => {
    return getStudentTotal(student) / (subjects.length || 1);
  };

  const rankedStudents = useMemo(() => {
    return students
      .map((student) => {
        const email = String(student?.email || "").toLowerCase().trim();
        return {
          student,
          email,
          total: getStudentTotal(student)
        };
      })
      .sort(
        (left, right) =>
          right.total - left.total ||
          String(left.student?.name || "").localeCompare(String(right.student?.name || ""))
      );
  }, [students, examTotalsByEmail]);

  const rankByEmail = useMemo(() => {
    const rankMap = new Map();

    rankedStudents.forEach((entry, index) => {
      if (entry.email) {
        rankMap.set(entry.email, index + 1);
      }
    });

    return rankMap;
  }, [rankedStudents]);

  const classAverage =
    students.length > 0
      ? students.reduce((sum, s) => sum + getStudentAverage(s), 0) /
        students.length
      : 0;

  const passPercentage =
    students.length > 0
      ? (students.filter((s) => getStudentAverage(s) >= 40).length /
          students.length) *
        100
      : 0;

  const topPerformer =
    students.length > 0
      ? students.reduce((prev, curr) =>
          getStudentTotal(curr) > getStudentTotal(prev)
            ? curr
            : prev
        )
      : { name: "N/A" };

  const gradeCount = { "A+": 0, A: 0, B: 0, C: 0, D: 0, F: 0 };

  students.forEach((s) => {
    const grade = getGradeFromScore(getStudentAverage(s));
    gradeCount[grade] += 1;
  });

  const gradeDistribution = Object.keys(gradeCount).map((g) => ({
    name: g,
    value: gradeCount[g]
  }));

  const subjectDistribution = useMemo(
    () =>
      subjects.map((subjectName) => {
        const subjectMarks = examMarks
          .filter((m) => m?.subject === subjectName)
          .map((m) => Number(m?.score ?? m?.marksObtained ?? 0));

        const counters = { excellent: 0, good: 0, average: 0, poor: 0 };

        subjectMarks.forEach((value) => {
          if (value >= 80) counters.excellent++;
          else if (value >= 60) counters.good++;
          else if (value >= 40) counters.average++;
          else counters.poor++;
        });

        return {
          subject: subjectName,
          ...counters
        };
      }),
    [examMarks]
  );

  const monthMap = {};

  attendance.forEach((a) => {
    const date = new Date(a.date);
    const month = date.toLocaleString("default", { month: "short" });

    if (!monthMap[month]) {
      monthMap[month] = { present: 0, total: 0 };
    }

    monthMap[month].total++;

    if (a.status === "Present") {
      monthMap[month].present++;
    }
  });

  const attendanceTrend = Object.keys(monthMap).map((m) => ({
    month: m,
    attendance:
      (monthMap[m].present / monthMap[m].total) * 100
  }));

  const filteredRankedStudents = rankedStudents.filter((entry) =>
    String(entry.student?.name || "").toLowerCase().includes(search.toLowerCase()) ||
    String(entry.student?.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Admin Dashboard
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Complete overview of student performance and analytics for {selectedExam}
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Select Exam Type
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Exam</InputLabel>
            <Select
              value={selectedExam}
              label="Exam"
              onChange={(e) => setSelectedExam(e.target.value || "Midterm 1")}
            >
              {examTypes.map((examType) => (
                <MenuItem key={examType} value={examType}>
                  {examType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        {/* Summary Cards */}
        <Grid container spacing={3}>
  <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard title="Total Students" value={totalStudents} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <DashboardCard
              title="Class Average"
              value={`${classAverage.toFixed(1)}%`}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <DashboardCard title="Top Performer" value={topPerformer.name} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <DashboardCard
              title="Pass Percentage"
              value={`${passPercentage.toFixed(1)}%`}
            />
          </Grid>
        </Grid>

        {/* Charts */}
        <Box mt={5}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Subject-wise Performance Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="excellent" stackId="a" fill="#22C55E" />
                <Bar dataKey="good" stackId="a" fill="#16A34A" />
                <Bar dataKey="average" stackId="a" fill="#F59E0B" />
                <Bar dataKey="poor" stackId="a" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>

          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Grade Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Class Attendance Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#2563EB" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        {/* Student Table */}
        <Paper sx={{ p: 3, mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Student Performance List
          </Typography>

          <TextField
            fullWidth
            label="Search by name..."
            variant="outlined"
            sx={{ mb: 3 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Rank</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Overall %</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Attendance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRankedStudents.map((entry) => {
                  const student = entry.student;
                  const email = String(student?.email || "").toLowerCase().trim();
                  const rank = rankByEmail.get(email);

                  return (
                  <TableRow key={student?.email || student?.roll || entry.email}>
                    <TableCell>{student.roll}</TableCell>
                    <TableCell>{rank ? `#${rank}` : "-"}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{getStudentAverage(student).toFixed(1)}%</TableCell>
                    <TableCell>{student.grade || getGradeFromScore(getStudentAverage(student))}</TableCell>
                    <TableCell>{student.attendance}%</TableCell>
                  </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}

export default AdminDashboard;

