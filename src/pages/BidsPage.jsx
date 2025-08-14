"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pencil,
  Plus,
  Trash2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import BidFormModal from "@/components/AddNewBid";
import axiosInstance from "@/services/axiosInstance";

export default function Page() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [bids, setBids] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBid, setEditingBid] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  // Filters & Pagination
  const [statusFilter, setStatusFilter] = useState("all");
  const [bidTypeFilter, setBidTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 15;
  const [totalPages, setTotalPages] = useState(1);

  const headers = useMemo(
    () => [
      "Bid Name",
      "Tender ID",
      "Source",
      "Location",
      "EMD Status",
      "Tender Value",
      "Last Date",
      "Actions",
    ],
    []
  );

  const fetchBids = async () => {
    try {
      const res = await axiosInstance.get("/bids/getAllBids", {
        params: {
          status: statusFilter,
          type: bidTypeFilter,
          sort: sortOrder,
          search: searchQuery,
          page,
          limit,
        },
      });

      setBids(res.data?.bids || []);
      setTotalPages(res.data?.totalPages || 1);
    } catch (err) {
      console.error("Error fetching bids:", err);
    }
  };

  useEffect(() => {
    fetchBids();
  }, [statusFilter, bidTypeFilter, sortOrder, searchQuery, page]);

  const handleAddNew = () => {
    setEditingBid(null);
    setModalOpen(true);
  };

  const handleEdit = (bid) => {
    setEditingBid(bid);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setBids((prev) => prev.filter((b) => b.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "default";
      case "closed":
        return "secondary";
      case "draft":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div>
      <div className="mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Bids</h1>
            {/* <p className="text-lg text-slate-600 max-w-2xl">
              Streamline your bidding process with advanced filtering, search
              capabilities, and comprehensive bid tracking.
            </p> */}
          </div>
          <Button
            onClick={handleAddNew}
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Bid
          </Button>
        </div>

        {/* Filters Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="h-5 w-5 text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                Filters & Search
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {/* Search Input */}
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search bids, tender IDs, locations..."
                  value={searchQuery}
                  onChange={(e) => {
                    setPage(1);
                    setSearchQuery(e.target.value);
                  }}
                  className="pl-10 h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              {/* Status Filter */}
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setPage(1);
                  setStatusFilter(value);
                }}
              >
                <SelectTrigger className="h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              {/* Bid Type Filter */}
              <Select
                value={bidTypeFilter}
                onValueChange={(value) => {
                  setPage(1);
                  setBidTypeFilter(value);
                }}
              >
                <SelectTrigger className="h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20">
                  <SelectValue placeholder="All Bids" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bids</SelectItem>
                  <SelectItem value="my">My Bids</SelectItem>
                  <SelectItem value="others">Other Bids</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Order */}
              <Select
                value={sortOrder}
                onValueChange={(value) => {
                  setPage(1);
                  setSortOrder(value);
                }}
              >
                <SelectTrigger className="h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20">
                  <SelectValue placeholder="Sort Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table Card */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-slate-50/80 border-b border-slate-200">
                    <TableHead className="font-semibold text-slate-700 py-4 px-4 w-[200px] min-w-[150px]">
                      Bid Name
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4 px-4 w-[120px] min-w-[100px]">
                      Tender ID
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4 px-4 w-[100px] min-w-[80px] hidden sm:table-cell">
                      Source
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4 px-4 w-[120px] min-w-[100px] hidden md:table-cell">
                      Location
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4 px-4 w-[100px] min-w-[90px]">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4 px-4 w-[120px] min-w-[100px] hidden lg:table-cell">
                      Value
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4 px-4 w-[140px] min-w-[120px] hidden xl:table-cell">
                      Last Date
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4 px-4 w-[100px] min-w-[80px]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bids.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-16 text-slate-500"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                            <Search className="h-8 w-8 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-lg font-medium">No bids found</p>
                            <p className="text-sm text-slate-400">
                              Try adjusting your filters or search terms
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    bids.map((bid, index) => (
                      <TableRow
                        key={bid.id}
                        className={`hover:bg-slate-50/50 transition-colors duration-150 ${
                          index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                        }`}
                      >
                        <TableCell className="font-semibold text-slate-900 py-4 px-4 max-w-[200px]">
                          <div className="truncate" title={bid.bidName}>
                            {bid.bidName}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600 py-4 px-4 font-mono text-sm max-w-[120px]">
                          <div className="truncate" title={bid.tenderId}>
                            {bid.tenderId}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600 py-4 px-4 max-w-[100px] hidden sm:table-cell">
                          <div className="truncate" title={bid.source}>
                            {bid.source}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600 py-4 px-4 max-w-[120px] hidden md:table-cell">
                          <div className="truncate" title={bid.location}>
                            {bid.location}
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-4 max-w-[100px]">
                          <Badge
                            variant={getStatusBadgeVariant(bid.emdStatus)}
                            className="font-medium text-xs"
                          >
                            {bid.emdStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-900 font-semibold py-4 px-4 max-w-[120px] hidden lg:table-cell">
                          <div className="truncate" title={bid.tenderValue}>
                            {bid.tenderValue}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600 py-4 px-4 text-xs max-w-[140px] hidden xl:table-cell">
                          <div className="truncate">
                            {bid.lastDate
                              ? new Date(bid.lastDate).toLocaleDateString()
                              : "—"}
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-4 max-w-[100px]">
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(bid)}
                              className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors duration-150 h-8 w-8 p-0"
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          disabled={!isAdmin}
                                          onClick={() => setPendingDelete(bid)}
                                          className="hover:bg-red-50 hover:border-red-200 hover:text-red-700 disabled:opacity-50 transition-colors duration-150 h-8 w-8 p-0"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent className="max-w-md">
                                        <AlertDialogHeader>
                                          <AlertDialogTitle className="text-slate-900">
                                            Delete Bid
                                          </AlertDialogTitle>
                                          <AlertDialogDescription className="text-slate-600">
                                            This action cannot be undone. This
                                            will permanently remove the bid{" "}
                                            <span className="font-semibold">
                                              "{pendingDelete?.bidName}"
                                            </span>
                                            .
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel
                                            onClick={() =>
                                              setPendingDelete(null)
                                            }
                                            className="hover:bg-slate-100"
                                          >
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            className="bg-red-600 hover:bg-red-700 focus:ring-red-500/20"
                                            onClick={confirmDelete}
                                          >
                                            Delete Bid
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </span>
                                </TooltipTrigger>
                                {!isAdmin && (
                                  <TooltipContent>
                                    <p>Only administrators can delete bids</p>
                                  </TooltipContent>
                                )}
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Pagination */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-slate-600">
                Showing page{" "}
                <span className="font-semibold text-slate-900">{page}</span> of{" "}
                <span className="font-semibold text-slate-900">
                  {totalPages}
                </span>
                {bids.length > 0 && (
                  <span className="ml-2">
                    ({bids.length} {bids.length === 1 ? "bid" : "bids"} on this
                    page)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="hover:bg-slate-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 ${
                          page === pageNum
                            ? "bg-emerald-600 hover:bg-emerald-700"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="hover:bg-slate-50 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={modalOpen} onOpenChange={(o) => !o && setModalOpen(false)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-900">
              {editingBid ? "Edit Bid" : "Create New Bid"}
            </DialogTitle>
          </DialogHeader>
          <BidFormModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            editingBid={editingBid}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
