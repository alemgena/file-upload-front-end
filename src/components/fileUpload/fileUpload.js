import React, { useEffect, useState } from "react";
import useTable from "../Ui/useTable";
import { TableCell, TableBody, TableRow ,Typography,Toolbar,Grid,InputAdornment} from "@mui/material";
import Norecords from "../Ui/Norecords";
import Controls from '../Ui/controls/Controls'
import { Search, Add } from '@mui/icons-material'
import FileApiRequests from "../request/fileUpload";
import Notificaction from '../Ui/Notification'
import Notify from '../Ui/Notify'
import ConfirmDialog from '../Ui/ConfirmDialog'
import FileForm from "../form/fileuploadForm";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import PageSpinner from '../Ui/PageSpinner'
import Popup from '../Ui/Popup'
import produce from "immer";
const Employee = () => {
  const headCells = [
    { id: "name", label: "Name" },
    { id: "size", label: "Size" },
    { id: "date", label: "Date" },
    { id: 'actions', label: 'Actions', disableSorting: true },
  ];
  const [openPopup, setOpenPopup] = useState(false)
  //`${Url}/api/auth/forgot-password?email=${email}`
  const[files,setFiles]=useState([])
  const{viewFiles,deletFile}=FileApiRequests()
const[Q,setQ]=useState('')
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const{loading,setLoading}=useState(false)
  const [tables, setTables] = useState([]);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(files, headCells, filterFn);
    useEffect(() => {
        viewFiles().then((data) => {
          setFiles(data.files)
          if (data.err) {
            NotifyMessage({
              message: data.err,
              type: 'error',
            })
          } else {
            
            setLoading(false)
         
            setFiles(data.files)
          }
        })
      }, [])

      useEffect(() => {
        setFilterFn({
          fn: (items) => {
            const columns = ["name"];
            if (Q === "") return items;
            else {
              return items.filter((x) => {
                return columns.some((column) => {
                  if (x[column]) {
                    return x[column].toString().toLowerCase().includes(Q);
                  }
                });
              });
            }
          },
        });
      }, [Q]);
      const { NotifyMessage, notify, setNotify } = Notify();
      const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subTitle: "",
      });
      const onDelete = (id) => {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        deletFile(id).then((data) => {
         
            NotifyMessage({
              message: data.message,
              type: "success",
            });
            setFiles(
              produce(files, (draft) => {
                const index = files.findIndex((file) => file.id === id);
                if (index !== -1) draft.splice(index, 1);
              })
            );
          
        });
      };
  return (
    <div>
       <Typography variant="h5" component="h1">
        File Mangement
      </Typography>
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Controls.Input
              label="Search File"
              fullWidth
              value={Q}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setQ(e.target.value.trimLeft().toLowerCase())
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controls.Button
              text="Add New"
              variant="outlined"
              startIcon={<Add />}
              color="secondary"
              onClick={() => {
                setOpenPopup(true)
             
              }}
            />
          </Grid>
        </Grid>
      </Toolbar>
      {loading ? (
        <PageSpinner />
      ) : (
        <>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().length > 0 ? (
                recordsAfterPagingAndSorting().map((item,index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="secondary"
                        title="Delete"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Are you sure to delete this product?',
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              onDelete(item.id)
                            },
                          })
                        }}
                      >
                        <DeleteOutlineIcon fontSize="medium" />
                      </Controls.ActionButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <Norecords col={5} />
              )}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </>
      )}

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    
      <Popup
        title="LiveStock Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <FileForm
          NotifyMessage={NotifyMessage}
          setOpenPopup={setOpenPopup}
          setFiles={setFiles}
        />
      </Popup>
    </div>
  );
};
export default Employee;
