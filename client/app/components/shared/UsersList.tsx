"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Box,
  Select,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IUser } from "@/app/types";
import {
  useCreateUserMutation,
  useGetAllUsersQuery,
} from "@/app/store/Features/users/usersApiSlice";
import { useGetAllRolesQuery } from "@/app/store/Features/roles/rolesApiSlice";
import { toast } from "react-toastify";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const {
    data: allUsersData,
    isLoading: isLoadingUsers,
    refetch,
  } = useGetAllUsersQuery();

  const {
    data: allRoles,
    isLoading: isLoadingRoles,
    refetch: refetchRoles,
  } = useGetAllRolesQuery();

  useEffect(() => {
    refetch();
    if (allUsersData) {
      setUsers(allUsersData);
    }
  }, [allUsersData]);

  useEffect(() => {
    refetchRoles();
  }, []);

  const [createUser] = useCreateUserMutation();

  const handleOpen: any = (user: IUser | null) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUser(null);
  };

  const handleSaveUser = async () => {
    try {
      const { success, message, payload } = await createUser(
        currentUser
      ).unwrap();

      if (success) {
        toast.success(`${message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        refetch();
        handleClose();
      } else {
        toast.error(`${message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error: any) {
      let msg =
        error.message ||
        (error.data && error.data.message) ||
        "An error occurred";
      toast.error(`${msg}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          User List
        </Typography>

        <Button
          variant="contained"
          color="error"
          //   onClick={() => handleOpen(null)}
          size="small"
        >
          Logout
        </Button>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen(null)}
      >
        Add User
      </Button>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.role.name}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(user)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={users.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={currentUser?.email || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser!, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="User Name"
            type="text"
            fullWidth
            value={currentUser?.userName || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser!, userName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Role"
            select
            fullWidth
            value={currentUser?.roleId || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser!, roleId: e.target.value })
            }
          >
            {allRoles?.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            value={currentUser?.status || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser!, status: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={currentUser?.password || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser!, password: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;
