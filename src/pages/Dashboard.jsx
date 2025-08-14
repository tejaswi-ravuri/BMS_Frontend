import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, FileText, DollarSign, Activity } from "lucide-react";
import { useEffect } from "react";
import axiosInstance from "@/services/axiosInstance";

export default function Dashboard({ currentUser, onNavigate }) {
  const stats = [
    {
      title: "My Bids",
      value: "12",
      description: "Active submissions",
    },
    {
      title: "Active Projects",
      value: "8",
      description: "In progress",
    },
    {
      title: "Total Earnings",
      value: "₹2,45,000",
      description: "This month",
    },
    {
      title: "Success Rate",
      value: "68%",
      description: "Win percentage",
    },
  ];

  const recentBids = [
    {
      id: 1,
      name: "Road Construction Project",
      amount: "₹50,000",
      status: "pending",
      submittedOn: "2024-01-15",
    },
    {
      id: 2,
      name: "IT Infrastructure Setup",
      amount: "₹75,000",
      status: "approved",
      submittedOn: "2024-01-14",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        "bg-green-100 text-green-800";
      case "rejected":
        "bg-red-100 text-red-800";
      case "pending":
        "bg-yellow-100 text-yellow-800";
      default:
        "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    const getReports = async () => {
      await axiosInstance
        .get("/bids/getMetrics")
        .then((res) => {
          console.log("res.data---metrics--", res.data);
        })
        .catch((err) => {
          console.log("metrics error---", err);
        });
    };
    getReports();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      {/* <div className="space-y-6 ">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.name}</p>
        </div>
        <Button
          onClick={() => onNavigate("my-bids")}
          className="bg-blue-600 hover-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Bid
        </Button>
      </div> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-4 py-5 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              {/* <stat.icon className="h-4 w-4 text-gray-400" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bids and Submissions */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Bids</CardTitle>
              <CardDescription>Recent bid submissions</CardDescription>
            </div>
            <Button variant="outline" onClick={() => onNavigate("my-bids")}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBids.map((bid) => (
                <div
                  key={bid.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{bid.name}</h4>
                    <p className="text-sm text-gray-500">
                      Submitted on {bid.submittedOn}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{bid.amount}</p>
                    <Badge className={getStatusColor(bid.status)}>
                      {bid.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle> My Submissions</CardTitle>
            <CardDescription>Recent project submissions</CardDescription>
            <Button variant="outline" onClick={() => onNavigate("bids")}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBids.slice(0, 3).map((bid) => (
                <div
                  key={bid.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{bid.name}</h4>
                    <p className="text-sm text-gray-500">
                      Submitted on {bid.submittedOn}
                    </p>
                  </div>
                  <Badge className={getStatusColor(bid.status)}>
                    {bid.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
