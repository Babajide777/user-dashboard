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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { User } from "@/app/types";

const roles = [
  { id: "1", name: "Admin" },
  { id: "2", name: "User" },
];

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Fetch users from API
  const fetchUsers = async () => {
    // Replace with your API call
    const data: User[] = [
      {
        id: "1",
        email: "john@example.com",
        userName: "john_doe",
        roleId: "1",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        deleted: false,
      },
      {
        id: "2",
        email: "jane@example.com",
        userName: "jane_doe",
        roleId: "2",
        status: "inactive",
        createdAt: new Date(),
        updatedAt: new Date(),
        deleted: false,
      },
      // Add more mock data or fetch from backend
    ];
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle open dialog for adding/updating user
  const handleOpen = (user: User | null) => {
    setCurrentUser(user);
    setOpen(true);
  };

  // Handle close dialog
  const handleClose = () => {
    setOpen(false);
    setCurrentUser(null);
  };

  // Handle save user (either add or update)
  const handleSaveUser = async () => {
    if (currentUser) {
      if (currentUser.id) {
        // Update user API call here
      } else {
        // Add user API call here
      }
      fetchUsers();
      handleClose();
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  // Handle pagination change
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
                  <TableCell>
                    {roles.find((role) => role.id === user.roleId)?.name ||
                      "Unknown"}
                  </TableCell>
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
            {roles.map((role) => (
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
