import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Shield } from "lucide-react";

export default function SettingsPage({ currentUser }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal information and contact details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <Input id="name" defaultValue={currentUser?.name} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gray-400" />
                <Input id="role" defaultValue={currentUser?.role} disabled />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  defaultValue={currentUser?.email}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  defaultValue={currentUser?.phone}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Changes
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Statistics Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Statistics</CardTitle>
          <CardDescription>Overview of your account activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Total Bids</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-gray-600">Approved Bids</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">68%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
