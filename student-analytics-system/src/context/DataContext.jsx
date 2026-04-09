import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api, isUnauthorizedError } from "../api/http";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authToken, setAuthToken] = useState(localStorage.getItem("token") || "");

  const getAuthHeaders = useCallback(() => {
    return authToken ? { Authorization: `Bearer ${authToken}` } : {};
  }, [authToken]);

  useEffect(() => {
    const syncToken = () => setAuthToken(localStorage.getItem("token") || "");

    window.addEventListener("storage", syncToken);
    window.addEventListener("auth-changed", syncToken);

    return () => {
      window.removeEventListener("storage", syncToken);
      window.removeEventListener("auth-changed", syncToken);
    };
  }, []);

  const fetchJson = useCallback(
    async (url) => {
      try {
        const res = await api.get(url, { headers: getAuthHeaders() });
        return res.data;
      } catch (error) {
        if (isUnauthorizedError(error)) {
          throw new Error("HTTP 401: Unauthorized");
        }

        const text = error?.response?.data;
        const message =
          typeof text === "string"
            ? text.slice(0, 120)
            : error?.response?.status
              ? `HTTP ${error.response.status}`
              : error?.message || "Request failed";
        throw new Error(message);
      }
    },
    [getAuthHeaders]
  );

  const refreshAll = useCallback(async () => {
    if (!authToken) {
      setStudents([]);
      setMarks([]);
      setAttendance([]);
      setError("");
      setLoading(false);
      return;
    }

    try {
      setError("");
      const [studentsRes, marksRes, attendanceRes] = await Promise.allSettled([
        fetchJson("/api/students").catch(() => []),
        fetchJson("/api/marks").catch(() => []),
        fetchJson("/api/attendance").catch(() => [])
      ]);

      const studentsData = studentsRes.status === "fulfilled" ? studentsRes.value : [];
      const marksData = marksRes.status === "fulfilled" ? marksRes.value : [];
      const attendanceData = attendanceRes.status === "fulfilled" ? attendanceRes.value : [];

      setStudents(Array.isArray(studentsData) ? studentsData : []);
      setMarks(Array.isArray(marksData) ? marksData : []);
      setAttendance(Array.isArray(attendanceData) ? attendanceData : []);
    } catch (err) {
      console.error("Failed to sync data:", err);
      setError("Unable to sync live data from database.");
    } finally {
      setLoading(false);
    }
  }, [authToken, fetchJson]);

  useEffect(() => {
    refreshAll();

    // Keep data close to real-time across admin/student dashboards.
    const intervalId = authToken ? setInterval(refreshAll, 10000) : null;
    return () => clearInterval(intervalId);
  }, [authToken, refreshAll]);

  const addStudent = async (student) => {
    await api.post("/api/students", student, { headers: getAuthHeaders() });
    await refreshAll();
  };

  const addMarks = async (mark) => {
    await api.post("/api/marks", mark, { headers: getAuthHeaders() });
    await refreshAll();
  };

  const addAttendance = async (record) => {
    await api.post("/api/attendance", record, { headers: getAuthHeaders() });
    await refreshAll();
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("auth-changed"));
  };

  return (
    <DataContext.Provider
      value={{
        students,
        marks,
        attendance,
        loading,
        error,
        refreshAll,
        addStudent,
        addMarks,
        addAttendance,
        logoutUser
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);