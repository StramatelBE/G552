import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AdminService from "../../services/adminService";

function AdminPage() {
  const { t } = useTranslation();

  const [admin, setAdmin] = useState({
    serialnumber: "",
    canal: "",
    ip: "",
  });

  useEffect(() => {
    getAdmin();
  }, []);




  async function getAdmin() {
    try {
      const result = await AdminService.getAdmin();
      if (result) {
        console.log("result", result);
        setAdmin({
          serialnumber: result.serialnumber,
          canal: result.canal,
          ip: result.ip,
        });
      }
    } catch (error) {
      // Handle errors here
      console.error("Failed to fetch admin data:", error);
    }
  }

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));

    try {
      await AdminService.updateAdmin({ ...admin, [name]: value });
    } catch (error) {
      console.error("Failed to update admin data:", error);
    }
  };

  async function updateAdmin(name, value) {
    try {
      await AdminService.updateAdmin({ [name]: value });
    } catch (error) {
      console.error("Failed to update admin data:", error);
    }
  }

  const handleBlur = (event) => {
    const { name, value } = event.target;
    updateAdmin(name, value);
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper className="mainPaperPage" elevation={3}>
          <Stack className="headerTitlePage" spacing={2}>
            <Box className="headerLeft">
              <IconButton>
                <AdminPanelSettingsIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography variant="h6" className="headerTitle">
                {t("Admin.title")}
              </Typography>
            </Box>
          </Stack>

          <Box className="containerPage" sx={{ padding: 3 }}>
            <Stack direction="column" spacing={3} alignItems="flex-start">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="subtitle1">
                  {t("Admin.serialNumber")}:
                </Typography>
                <TextField
                  name="serialnumber"
                  value={admin.serialnumber}
                  onChange={handleInputChange}
                />
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="subtitle1">
                  {t("Admin.canalNumber")}:
                </Typography>
                <TextField
                  name="canal"
                  value={admin.canal}
                  onChange={handleInputChange}
                />
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="subtitle1">
                  {t("Admin.ipAddress")}:
                </Typography>
                <TextField
                  name="ip"
                  value={admin.ip}
                  onChange={handleInputChange}
                />
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Grid>

    </>
  );
}

export default AdminPage;
