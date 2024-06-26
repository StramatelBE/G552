import {
  Box,
  Hidden,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { LoadingContext } from "../../contexts/Context";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import SortIcon from "@mui/icons-material/Sort";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import TableRowsIcon from "@mui/icons-material/TableRows";
import EventMediaService from "../../services/eventMediaService";
import UploadService from "../../services/uploadService";
import CropsModal from "../dialogs/CropsModal";
import DeleteMediaDialog from "../dialogs/DeleteMediaDialog";
import authService from "../../services/authService";

function Medias(props) {
  const { t } = useTranslation(); // Utilisation de useTranslation
  const uploadService = UploadService();

  const [selectedImage, setSelectedImage] = useState(null);
  const [dialogUpload, setDialogUpload] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [FileToDelete, setFileToDelete] = useState();
  const [imageToCrop, setImageToCrop] = useState(null);
  const [originalName, setOriginalName] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const { setLoading } = useContext(LoadingContext);
  const { setProgress } = useContext(LoadingContext);
  const [sortCriteria, setSortCriteria] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");
  const [inputKey, setInputKey] = useState(0);

  const toggleViewMode = () => {
    console.log("toggleViewMode", viewMode);
    setViewMode(viewMode === "grid" ? "table" : "grid");
  };
  const toggleSortCriteria = () => {
    setSortCriteria(sortCriteria === "name" ? "recent" : "name");
    updateUploadMediaMedias();
  };

  const sortMedia = (media, criteria) => {
    if (criteria === "name") {
      console.log("media", media);
      return [...media].sort((a, b) =>
        a.originalFileName.localeCompare(b.originalFileName)
      );
    } else {
      return [...media].sort(
        (a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at)
      );
    }
  };

  // Function to update the medias array for the "uploadMedia" title
  async function updateUploadMediaMedias() {
    await props.setEventMedia((currentEventMedia) => {
      console.log("currentEventMedia", currentEventMedia);
      const uploadMediaIndex = currentEventMedia.findIndex(
        (media) => media.title === "uploadMedia"
      );
      if (uploadMediaIndex === -1) {
        return currentEventMedia;
      }

      const sortedMedias = sortMedia(
        currentEventMedia[uploadMediaIndex].medias,
        sortCriteria
      );

      const newEventMedia = [...currentEventMedia];
      newEventMedia[uploadMediaIndex] = {
        ...newEventMedia[uploadMediaIndex],
        medias: sortedMedias,
      };
      console.log("newEventMedia", newEventMedia);

      return newEventMedia;
    });
  }

  const handleTouchStart = (imageId) => {
    clearTimeout(longPressTimer);
    setLongPressTimer(
      setTimeout(() => {
        if (imageId === selectedImage) {
          setSelectedImage(null);
        } else {
          setSelectedImage(imageId);
        }
      }, 500)
    ); // Appui long de 500 ms
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer);
  };

  function DeleteFile() {
    EventMediaService.deleteAllByMedia(FileToDelete.idBdd).then(() => {
      uploadService.deleteFile(FileToDelete).then((result) => {
        displayDialogDelete(false);
        props.getMedias();
        props.getEvents();
      });
    });
  }

  function displayDialogUpload() {
    setDialogUpload(!dialogUpload);
    setImageToCrop(null);
  }

  function OpenDialogDelete(file) {
    displayDialogDelete(true);
    setFileToDelete(file);
  }
  function displayDialogDelete() {
    setDialogDelete(!dialogDelete);
  }

  function goToCrop(event) {
    setImageToCrop(event.target.files[0]);
    setInputKey((prevKey) => prevKey + 1);
    setImageToCrop(null);
    if (event && event.target.files[0].type.split("/")[0] === "video") {
      uploadService
        .upload(setLoading, event.target.files[0], setProgress)
        .then(() => {
          props.getMedias();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setOriginalName(event.target.files[0].name);
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageToCrop(reader.result));
      reader.readAsDataURL(event.target.files[0]);
      setMediaType(event.target.files[0].type.split("/")[0]);
      displayDialogUpload();
    }
    setSelectedImage(null);
  }

  function uploadMediaCropped(event) {
    const fileWithOriginalName = new File([event[0]], originalName, {
      type: "image/jpeg",
    });

    uploadService
      .upload(setLoading, fileWithOriginalName, setProgress)
      .then(() => {
        props.getMedias();
      })
      .catch((error) => {
        console.error(error);
      });

    displayDialogUpload();
    setImageToCrop(null);
  }

  function handleImageClick(imageId) {
    if (imageId === selectedImage) {
      setSelectedImage(null);
    } else {
      setSelectedImage(imageId);
    }
  }

  function addmediatodiaporam(file) {
    console.log("addmediatodiaporam", file);
    EventMediaService.create({
      mediaId: file.idBdd,
      eventId: props.id,
      duration: 1,
      userId: authService.getCurrentUser().user.id,
      media_pos_in_event: props.eventMedia[1].medias.length + 1,
    }).then((result) => {
      console.log("result", result);
      props.getEvents();
    });
  }

  return (
    <Box>
      <Paper className="mainPaperPage">
        <Stack className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton className="headerButton">
              <ImageIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              {t("Media.title")}
            </Typography>
          </Box>
          <Box className="headerRight">
            <IconButton
              className="headerButton"
              onClick={() => {
                //remove the file input
                document.getElementById("inputFile").click();
              }}
            >
              <AddIcon sx={{ color: "secondary.main" }} />
            </IconButton>

            <input
              type="file"
              id="inputFile"
              style={{ display: "none" }}
              onChange={goToCrop}
              key={inputKey}
            />
          </Box>
        </Stack>
        <IconButton onClick={toggleViewMode}>
          {viewMode === "grid" ? (
            <InsertPhotoIcon sx={{ color: "secondary.main" }} />
          ) : (
            <TableRowsIcon sx={{ color: "secondary.main" }} />
          )}
          {/*  <Typography>
            {viewMode === "grid"
              ? "Switch to Table View"
              : "Switch to Grid View"}
          </Typography> */}
        </IconButton>
        <IconButton onClick={toggleSortCriteria}>
          <SortIcon sx={{ color: "secondary.main" }} />
          <Typography>{sortCriteria === "name" ? "Name" : "Date"}</Typography>
        </IconButton>
        <Droppable
          droppableId={`${props.eventMedia[1].id}`}
          isDropDisabled={true}
        >
          {(provided) => (
            <div ref={provided.innerRef}>
              {props.eventMedia[1].medias ? (
                props.eventMedia[1].medias.length > 0 ? (
                  <Box
                    className="containerPage"
                    sx={{ height: "calc(94vh - 220px)", overflowY: "auto" }}
                  >
                    {viewMode === "grid" ? (
                      <ImageList variant="visible" cols={2} gap={8}>
                        {props.eventMedia[1].medias.map((file, index) => (
                          <ImageListItem key={file.id}>
                            <Draggable
                              disableInteractiveElementBlocking
                              key={file.id}
                              draggableId={file.id.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <React.Fragment>
                                  <Box
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    onTouchStart={() =>
                                      handleTouchStart(file.id)
                                    }
                                    onTouchEnd={handleTouchEnd}
                                  >
                                    {file.type === "video" ? (
                                      <Box>
                                        <Box
                                          component="video"
                                          onClick={() =>
                                            handleImageClick(file.id)
                                          }
                                          alt={file.title}
                                          sx={{
                                            width: "100%",
                                            opacity:
                                              file.id === selectedImage
                                                ? 0.75
                                                : 1,
                                          }}
                                          ref={(ref) => {
                                            if (ref && file.type === "video") {
                                              ref.currentTime = 10;
                                            }
                                          }}
                                          src={file.path}
                                        ></Box>
                                        <PlayCircleFilledIcon
                                          sx={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            opacity: 0.7,
                                            fontSize: "50px",
                                          }}
                                        />
                                      </Box>
                                    ) : (
                                      <Box
                                        component="img"
                                        onClick={() =>
                                          handleImageClick(file.id)
                                        }
                                        src={file.path}
                                        alt={file.title}
                                        sx={{
                                          width: "100%",
                                          opacity:
                                            file.id === selectedImage
                                              ? 0.75
                                              : 1,
                                        }}
                                      />
                                    )}
                                    {file.id === selectedImage && (
                                      <DeleteIcon
                                        onClick={() => OpenDialogDelete(file)}
                                        color="warning"
                                        sx={{
                                          position: "absolute",
                                          top: "5px",
                                          right: "5px",
                                        }}
                                      />
                                    )}
                                  </Box>
                                </React.Fragment>
                              )}
                            </Draggable>
                          </ImageListItem>
                        ))}
                      </ImageList>
                    ) : (
                      <TableContainer sx={{ width: "100%" }} component={Paper}>
                        <Table aria-label="media table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="right"> </TableCell>
                              <TableCell align="right">Name</TableCell>
                              <TableCell align="right">Type</TableCell>
                              <TableCell align="right">Date</TableCell>
                              <TableCell align="right">Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {props.eventMedia[1].medias.map((file, index) => (
                              <TableRow
                                key={file.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="right">
                                  {props.id === undefined ? (
                                    <IconButton disabled={true}>
                                      <AddIcon />
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      onClick={() => addmediatodiaporam(file)}
                                    >
                                      <AddIcon color="error" />
                                    </IconButton>
                                  )}
                                </TableCell>
                                <TableCell
                                  align="right"
                                  style={{
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    maxWidth: "120px",
                                    overflow: "hidden",
                                  }}
                                >
                                  {file.originalFileName}
                                </TableCell>
                                <TableCell align="right">{file.type}</TableCell>
                                <TableCell align="right">
                                  {file.uploaded_at}
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton
                                    onClick={() => OpenDialogDelete(file)}
                                  >
                                    <DeleteIcon color="error" />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </Box>
                ) : (
                  <Box className="infoPage">
                    <Typography color="text.secondary">
                      {t("Media.add")}
                    </Typography>
                  </Box>
                )
              ) : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Paper>
      {/* Modal upload  */}

      <CropsModal
        open={dialogUpload}
        onClose={displayDialogUpload}
        imageToCrop={imageToCrop}
        uploadMediaCropped={uploadMediaCropped}
        mediaType={mediaType}
      />
      {/* Modal confirm suppression file */}
      <DeleteMediaDialog
        open={dialogDelete}
        onClose={displayDialogDelete}
        DeleteFile={DeleteFile}
        displayDialogDelete={displayDialogDelete}
      />
    </Box>
  );
}

export default Medias;
