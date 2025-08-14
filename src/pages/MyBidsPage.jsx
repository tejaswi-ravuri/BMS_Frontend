"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BidsPage({ currentUser, onNavigate }) {
  const [selectedBid, setSelectedBid] = useState(null);

  const myBids = [
    {
      id: 1,
      name: "Road Construction Project",
      amount: "₹50,000",
      status: "pending",
      submittedOn: "2024-01-15",
      submittedBy: currentUser?.name,
    },
    {
      id: 2,
      name: "IT Infrastructure Setup",
      amount: "₹75,000",
      status: "approved",
      submittedOn: "2024-01-14",
      submittedBy: currentUser?.name,
    },
  ];

  const allBids = [
    ...myBids,
    {
      id: 3,
      name: "Building Maintenance",
      amount: "₹30,000",
      status: "rejected",
      submittedOn: "2024-01-13",
      submittedBy: "Jane Smith",
    },
    {
      id: 4,
      name: "Software Development",
      amount: "₹1,20,000",
      status: "pending",
      submittedOn: "2024-01-12",
      submittedBy: "Mike Johnson",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const BidCard = ({ bid, showSubmittedBy = false }) => (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setSelectedBid(bid)}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{bid.name}</CardTitle>
          <Badge className={getStatusColor(bid.status)}>{bid.status}</Badge>
        </div>
        <CardDescription>
          Submitted on {bid.submittedOn}
          {showSubmittedBy && ` by ${bid.submittedBy}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">{bid.amount}</span>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bids</h1>
          <p className="text-gray-600">
            Manage your bids and view all submissions
          </p>
        </div>
      </div>

      <Tabs defaultValue="my-bids" className="space-y-6">
        <TabsList>
          <TabsTrigger value="my-bids">My Bids ({myBids.length})</TabsTrigger>
          <TabsTrigger value="all-bids">
            All Bids ({allBids.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-bids" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">My Submissions</h2>
            <Button
              onClick={() => onNavigate("my-bids")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add New Bid
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBids.map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all-bids" className="space-y-4">
          <h2 className="text-lg font-semibold">All Submissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBids.map((bid) => (
              <BidCard key={bid.id} bid={bid} showSubmittedBy />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal for Bid Details */}
      {selectedBid && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{selectedBid.name}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedBid(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Tender ID
                  </label>
                  <p className="text-gray-900">TND-2024-001</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Source of Tender
                  </label>
                  <p className="text-gray-900">GEM Portal</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Location of Project
                  </label>
                  <p className="text-gray-900">Mumbai, Maharashtra</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    EMD Status
                  </label>
                  <p className="text-gray-900">Exempted</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Tender Value
                  </label>
                  <p className="text-gray-900">{selectedBid.amount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Submitted By
                  </label>
                  <p className="text-gray-900">{selectedBid.submittedBy}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Last Date & Time for Submission
                </label>
                <p className="text-gray-900">2024-01-20 17:00</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Remarks
                </label>
                <p className="text-gray-900">
                  All documents submitted as per requirements.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
