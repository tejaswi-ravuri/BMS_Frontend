// components/BidFormModal.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axiosInstance from "@/services/axiosInstance";
export default function BidFormModal({ open, onClose, editingBid = null }) {
  const [formData, setFormData] = useState({
    name: "",
    tenderId: "",
    source: "",
    location: "",
    emdStatus: "",
    tenderValue: "",
    lastDate: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBid) {
      setFormData(editingBid);
    } else {
      setFormData({
        name: "",
        tenderId: "",
        source: "",
        location: "",
        emdStatus: "",
        tenderValue: "",
        lastDate: "",
        remarks: "",
      });
    }
    setErrors({});
  }, [editingBid]);

  // New handleChange function that clears error for the field being updated
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Bid Name is required.";
    if (!formData.tenderId.trim())
      newErrors.tenderId = "Tender ID is required.";
    if (!formData.source) newErrors.source = "Source of Tender is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.emdStatus) newErrors.emdStatus = "EMD Status is required.";
    if (!formData.tenderValue.trim())
      newErrors.tenderValue = "Tender Value is required.";
    if (!formData.lastDate)
      newErrors.lastDate = "Last Date & Time is required.";
    if (!formData.remarks.trim()) newErrors.remarks = "Remarks are required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await axiosInstance
      .post("/bids/createBid", formData)
      .then((res) => {
        console.log("res---", res);
      })
      .catch((Err) => {
        console.log("Error while creating a new bid", Err);
      });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-10/12 overflow-y-auto">
        {/* ... dialog header ... */}
        <Card className="shadow-none border-none">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div className="space-y-2">
                <Label htmlFor="name">Bid Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`w-full ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tenderId">Tender ID</Label>
                <Input
                  id="tenderId"
                  value={formData.tenderId}
                  onChange={(e) => handleChange("tenderId", e.target.value)}
                  className={`w-full ${
                    errors.tenderId ? "border-red-500" : ""
                  }`}
                />
                {errors.tenderId && (
                  <p className="text-red-600 text-sm">{errors.tenderId}</p>
                )}
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="source">Source of Tender</Label>
                <Select
                  value={formData.source}
                  onValueChange={(value) => handleChange("source", value)}
                  className={`w-full ${errors.source ? "border-red-500" : ""}`}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GEM Portal">GEM Portal</SelectItem>
                    <SelectItem value="IREPS">IREPS</SelectItem>
                    <SelectItem value="Central Govt NIC">
                      Central Govt NIC
                    </SelectItem>
                    <SelectItem value="State Govt NIC">
                      State Govt NIC
                    </SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
                {errors.source && (
                  <p className="text-red-600 text-sm">{errors.source}</p>
                )}
              </div>

              {/* Repeat similarly for other inputs with handleChange */}
              <div className="space-y-2">
                <Label htmlFor="location">Location of Project</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className={`w-full ${
                    errors.location ? "border-red-500" : ""
                  }`}
                />
                {errors.location && (
                  <p className="text-red-600 text-sm">{errors.location}</p>
                )}
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="emdStatus">EMD Status</Label>
                <Select
                  value={formData.emdStatus}
                  onValueChange={(value) => handleChange("emdStatus", value)}
                  className={`w-full ${
                    errors.emdStatus ? "border-red-500" : ""
                  }`}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select EMD status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Exempted">Exempted</SelectItem>
                    <SelectItem value="Not Exempted">Not Exempted</SelectItem>
                  </SelectContent>
                </Select>
                {errors.emdStatus && (
                  <p className="text-red-600 text-sm">{errors.emdStatus}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tenderValue">Tender Value (in rupee)</Label>
                <Input
                  id="tenderValue"
                  value={formData.tenderValue}
                  onChange={(e) => handleChange("tenderValue", e.target.value)}
                  className={`w-full ${
                    errors.tenderValue ? "border-red-500" : ""
                  }`}
                />
                {errors.tenderValue && (
                  <p className="text-red-600 text-sm">{errors.tenderValue}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="lastDate">
                  Last Date &amp; Time for Submission
                </Label>
                <Input
                  id="lastDate"
                  type="datetime-local"
                  value={formData.lastDate}
                  onChange={(e) => handleChange("lastDate", e.target.value)}
                  className={`w-full ${
                    errors.lastDate ? "border-red-500" : ""
                  }`}
                />
                {errors.lastDate && (
                  <p className="text-red-600 text-sm">{errors.lastDate}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  value={formData.remarks}
                  onChange={(e) => handleChange("remarks", e.target.value)}
                  rows={3}
                  className={`w-full ${errors.remarks ? "border-red-500" : ""}`}
                />
                {errors.remarks && (
                  <p className="text-red-600 text-sm">{errors.remarks}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingBid ? "Update Bid" : "Submit Bid"}
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
