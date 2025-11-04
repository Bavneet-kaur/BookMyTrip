'use client';
import React, { useEffect, useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaClock, FaPlus, FaSuitcase, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";
import ConfirmationModal from "../components/ConfirmationModal";

interface Trip {
  _id?: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  price: string;
  seats: number;
}

export default function AdminDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [bookings, setBookings] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [form, setForm] = useState<Trip>({
    from: "", to: "", date: "", departureTime: "", arrivalTime: "", price: "", seats: 0
  });
  const [editingTripId, setEditingTripId] = useState<string | null>(null);
  const [originalForm, setOriginalForm] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmDetails, setConfirmDetails] = useState<{ type: "delete" | "safe", onConfirm: () => void, title: string, description?: string } | null>(null);

  // Fetch all trips on mount
  useEffect(() => {
    const fetchTrips = async () => {
      const res = await fetch("http://localhost:5000/api/trips", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo") || "{}").token}`,
        },
      });
      const data = await res.json();
      setTrips(data);
    };
    fetchTrips();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo") || "{}").token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setTrips([...trips, data]); // Add new trip to table
      setModalOpen(false);
      setForm({ from: "", to: "", date: "", departureTime: "", arrivalTime: "", seats: 0, price: "" });
    } else {
      toast.error(data.message || "Failed to add trip");
    }
  };
  const isFormChanged = () => {
    if (!originalForm) return false;
    return (
      originalForm.from !== form.from ||
      originalForm.to !== form.to ||
      originalForm.date !== form.date ||
      originalForm.departureTime !== form.departureTime ||
      originalForm.arrivalTime !== form.arrivalTime ||
      originalForm.price !== form.price ||
      originalForm.seats !== form.seats
    );
  };
  const handleDelete = async (id: any) => {
    if (!id) return;

    setConfirmDetails({
      type: "delete",
      title: "Confirm Deletion",
      description: "Are you sure you want to delete this trip?",
      onConfirm: async () => {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/trips/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo") || "{}").token}`,
          },
        });
        setLoading(false);
        setConfirmModalOpen(false);

        if (res.ok) {
          setTrips(trips.filter(trip => trip._id !== id));
          toast.success("Trip deleted successfully");
        } else {
          toast.error("Failed to delete the trip");
        }
      }
    });

    setConfirmModalOpen(true);
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (!editingTripId) return;

    setConfirmDetails({
      type: "safe",
      title: "Confirm Update",
      description: "Are you sure you want to update this trip?",
      onConfirm: async () => {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/trips/${editingTripId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo") || "{}").token}`,
          },
          body: JSON.stringify(form),
        });
        setLoading(false);
        setConfirmModalOpen(false);

        const data = await res.json();
        if (res.ok) {
          setTrips(trips.map(trip => trip._id === editingTripId ? data : trip));
          setModalOpen(false);
          setEditingTripId(null);
          setOriginalForm(null);
          toast.success("Trip updated successfully");
        } else {
          toast.error(data.message || "Failed to update trip");
        }
      }
    });

    setConfirmModalOpen(true);
  };

  const totalTrips = trips.length;
  const totalBookings = bookings.length;
  const upcomingDepartures = trips.filter(t => new Date(t.date) >= new Date()).length;
  const columns = [
    {
      label: "Routes",
      key: "routes",
      render: (_: any, row: Trip) => (
        <span>{row.from} - {row.to}</span>
      )
    },
    { label: "Date", key: "date" },
    {
      label: "Departure Time",
      key: "departureTime",
      render: (_: any, row: Trip) => <span>{row.departureTime}</span>
    },
    {
      label: "Arrival Time",
      key: "arrivalTime",
      render: (_: any, row: Trip) => <span>{row.arrivalTime}</span>
    },
    { label: "Price", key: "price" },
    { label: "Seats", key: "seats" },
    {
      label: "Actions",
      key: "actions",
      render: (_: any, row: Trip) => (
        <span className="flex space-x-2">
          <button
            className="text-blue-500"
            onClick={() => {
              setForm(row);
              setOriginalForm(row);
              setEditingTripId(row._id || null);
              setModalOpen(true);
            }}
          >
            <FiEdit2 />
          </button>
          <button
            className="text-red-500"
            onClick={() => handleDelete(row._id)}
          >
            <FiTrash2 />
          </button>
        </span>
      )
    }

  ];

  return (
    <div className="max-w-7xl mx-auto px-2 py-20">
      <h2 className="text-lg font-bold mb-4 text-gray-900">Admin Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {/* Total Trips Card */}
        <div className="flex items-center p-2 bg-white rounded-xl shadow-xl border border-gray-100 gap-5">
          <span className="bg-blue-100 rounded-full p-4">
            <FaSuitcase className="text-blue-500 text-3xl" />
          </span>
          <div>
            <span className="block text-3xl font-bold text-gray-900">{totalTrips}</span>
            <span className="block text-gray-500 text-lg mt-1">Total Trips</span>
          </div>
        </div>
        {/* Total Bookings Card */}
        <div className="flex items-center px-6 py-6 bg-white rounded-xl shadow-xl border-gray-100 border gap-5">
          <span className="bg-green-100 rounded-full p-4">
            <FaUsers className="text-green-500 text-3xl" />
          </span>
          <div>
            <span className="block text-3xl font-bold text-gray-900">{totalBookings}</span>
            <span className="block text-gray-500 text-lg mt-1">Total Bookings</span>
          </div>
        </div>
        {/* Upcoming Departures Card */}
        <div className="flex items-center px-6 py-6 bg-white rounded-xl shadow-xl border border-gray-100 gap-5">
          <span className="bg-yellow-100 rounded-full p-4">
            <FaClock className="text-yellow-600 text-3xl" />
          </span>
          <div>
            <span className="block text-3xl font-bold text-gray-900">{upcomingDepartures}</span>
            <span className="block text-gray-500 text-lg mt-1">Upcoming Departures</span>
          </div>
        </div>
      </div>

      {/* trip-management */}
      <div className="overflow-x-auto mb-4">
        <div className="flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Trip Management</h2>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700  transition"
            >
              <span className="flex items-center gap-2"> All Trips</span>
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="border border-blue-500 text-blue-500 px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700 hover:text-white transition"
            >
              <span className="flex items-center gap-2"><FaPlus /> New Trip</span>
            </button>
          </div>
        </div>
        <Table columns={columns} data={trips} />
      </div>

      <Modal open={modalOpen} onClose={() => {
        setModalOpen(false);
        setEditingTripId(null);
        setOriginalForm(null);
      }}>
        <form onSubmit={editingTripId ? handleUpdate : handleSubmit} className="flex flex-col space-y-6">
          <h2 className="text-xl font-bold mb-2">Trip Details</h2>

          <div className="grid grid-cols-2 gap-x-2 justify-between items-center">
            <Input name="from" label="From" value={form.from} onChange={handleChange} className="w-full" required />
            <Input name="to" label="To" value={form.to} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-3 gap-x-2 justify-between items-center">
            <Input type="date" name="date" label="Date" value={form.date} onChange={handleChange} required />
            <Input type="time" name="departureTime" label="Departure Time" value={form.departureTime} onChange={handleChange} required />
            <Input type="time" name="arrivalTime" label="Arrival Time" value={form.arrivalTime} onChange={handleChange} required />
          </div>


          <div className="grid grid-cols-2 gap-x-2 justify-between items-center">

            <Input
              name="price"
              label="Price"
              value={form.price}
              onChange={handleChange}
              required
              className="flex-1"

            />
            <Input
              type="number"
              name="seats"
              label="Seats"
              value={form.seats.toString()}
              onChange={handleChange}
              required
              className="flex-1"

            />
          </div>
          {editingTripId ? (
            <div className="flex gap-4">
              <Button
                type="button"
                style={{
                  width: '100%',
                  background: 'gray',
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  padding: '8px',
                  fontSize: '18px',
                  border: 'none',
                }}
                onClick={() => {
                  setModalOpen(false);
                  setEditingTripId(null);
                  setOriginalForm(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={`w-1/2 ${!isFormChanged() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={!isFormChanged()}
              >
                Update
              </Button>
            </div>
          ) : (
            <Button
              type="submit"
              className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-lg font-bold rounded-lg shadow-md transition duration-150"
            >
              Submit
            </Button>
          )}
        </form>
      </Modal>
      <ConfirmationModal
        open={confirmModalOpen}
        title={confirmDetails?.title || ""}
        description={confirmDetails?.description}
        confirmLabel={confirmDetails?.type === "delete" ? "Delete" : "Update"}
        cancelLabel="Cancel"
        colorType={confirmDetails?.type || "safe"}
        onConfirm={confirmDetails?.onConfirm || (() => { })}
        onCancel={() => { setConfirmModalOpen(false); setLoading(false); }}
      />

    </div>
  );
}
