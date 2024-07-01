import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Cropper from "react-easy-crop";

import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";

function CropsModal(props) {
  const { t } = useTranslation();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [restrictPosition, setRestrictPosition] = useState(true);
  const [currentFileIndex] = useState(0);
  const [filesToCrop, setFilesToCrop] = useState([]);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const getCroppedImage = async () => {
    const image = await createImage(filesToCrop[currentFileIndex]);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((file) => {
        resolve(file);
      }, "image/jpeg");
    });
  };

  const handleUpload = async () => {
    if (props.mediaType === "image") {
      if (!filesToCrop[0] || !croppedAreaPixels) return;
      const croppedImage = await getCroppedImage();
      props.uploadMediaCropped([croppedImage]);
      setCrop({ x: 0, y: 0 });
    } else if (props.mediaType === "video") {
      props.uploadMediaCropped([filesToCrop[0]], croppedAreaPixels);
    }

    if (currentFileIndex < filesToCrop.length - 1) {

    } else {
      props.onClose();
    }
  };

  const onCropChange = useCallback((newCrop) => {
    setCrop(newCrop);
  });

  useEffect(() => {
    const loadImage = async () => {
      const image = await createImage(filesToCrop[0]);
      setImageSize({ width: image.width, height: image.height });
    };
    console.log();
    console.log(filesToCrop[currentFileIndex]);

    if (filesToCrop[0]) {
      loadImage();
    }
  }, [filesToCrop, currentFileIndex]);

  useEffect(() => {
    if (props.imagesToCrop) {
      setFilesToCrop(props.imagesToCrop);
    }
  }, [props.imagesToCrop]);

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box>
        <Paper
          sx={{
            height: { xs: "110vh", md: "100vh" },
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Stack className="herderTitlePage">
            <Box className="headerLeft">
              <IconButton disabled className="headerButton">
                <UploadIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography variant="h6" className="headerTitle">
                {t("Media.upload")}
              </Typography>
            </Box>
            <Box className="headerRight">
              <IconButton className="headerButton" onClick={props.onClose}>
                <CloseIcon sx={{ color: "secondary.main" }} />
              </IconButton>
            </Box>
          </Stack>
          {filesToCrop[0] ? (
            <Box>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "400px",
                  background: "#333",
                }}
              >
                {props.mediaType === "image" && (
                  <Cropper
                    image={filesToCrop[currentFileIndex]}
                    zoom={zoom}
                    aspect={19 / 12}
                    onCropComplete={onCropComplete}
                    minZoom={0.1}
                    zoomSpeed={0.1}
                    crop={crop}
                    restrictPosition={restrictPosition}
                    onCropChange={onCropChange}
                    onZoomChange={setZoom}
                  />
                )}
              </Box>

              <Box
                sx={{
                  marginTop: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={restrictPosition}
                      onChange={() => setRestrictPosition(!restrictPosition)}
                    />
                  }
                  label={t("Restrict Position")}
                />
                <Button sx={{ color: "secondary.main" }} onClick={handleUpload}>
                  {t("Dialog.save")}
                </Button>
              </Box>
            </Box>
          ) : null}
        </Paper>
      </Box>
    </Modal>
  );
}

export default CropsModal;
