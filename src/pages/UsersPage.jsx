import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, User, Mail, Phone } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import UserFormModal from "@/components/AddUser";
import axiosInstance from "@/services/axiosInstance";
import axios from "axios";

export default function UsersPage() {
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const [users, setUsers] = useState([]);

  const handleAddOrUpdateUser = (data) => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...data } : user
        )
      );
    } else {
      const newUser = {
        id: users.length + 1,
        ...data,
        status: "active",
      };
      setUsers([...users, newUser]);
    }
    setEditingUser(null);
  };

  const handleEdit = async (user) => {
    setEditingUser(user);
    setShowFormModal(true);
  };

  const handleDelete = (user) => {
    setUsers(users.filter((u) => u.id !== user.id));
    setDeletingUser(null);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      await axiosInstance
        .get("/user/getAllUsers")
        .then((res) => {
          console.log("res--", res.data);
          setUsers(res.data);
        })
        .catch((err) => {
          console.log("err---", err);
        });
    };

    getAllUsers();
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <Button
          onClick={() => {
            setEditingUser(null);
            setShowFormModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                </div>
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                >
                  {user.role}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                {user.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                {user.phone}
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(user)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeletingUser(user)}
                  className="flex-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog
        open={!!deletingUser}
        onOpenChange={() => setDeletingUser(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account for {deletingUser?.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(deletingUser)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UserFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleAddOrUpdateUser}
        initialData={editingUser}
      />
    </div>
  );
}
