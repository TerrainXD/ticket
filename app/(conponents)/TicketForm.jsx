"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();

  // Updated status progression
  const STATUS_PROGRESSION = {
    'pending': ['accepted', 'rejected'],
    'accepted': ['resolved'],
    'resolved': [], // No further status changes allowed
    'rejected': []
  };

  const handleStatusUpdate = async (newStatus) => {
    const currentStatus = ticket.status;
    const allowedNextStatuses = STATUS_PROGRESSION[currentStatus] || [];

    if (!allowedNextStatuses.includes(newStatus)) {
      alert(`Cannot change status from ${currentStatus} to ${newStatus}`);
      return;
    }

    try {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData: { status: newStatus } }),
        headers: {
          "content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to Update Ticket.");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("Failed to update ticket status.");
    }
  };

  // If not creating a new ticket, show read-only view
  if (EDITMODE) {
    // Determine available actions based on current status
    const getStatusActions = () => {
      switch(ticket.status) {
        case 'pending':
          return [
            { status: 'accepted', label: 'Accept', icon: faCheckCircle, className: 'bg-emerald-600 hover:bg-emerald-700' },
            { status: 'rejected', label: 'Reject', icon: faTimesCircle, className: 'bg-red-600 hover:bg-red-700' }
          ];
        case 'accepted':
          return [
            { status: 'resolved', label: 'Resolve', icon: faCheckCircle, className: 'bg-emerald-600 hover:bg-emerald-700' }
          ];
        case 'resolved':
          return []; // No actions for resolved tickets
        case 'rejected':
          return []; // No actions for rejected tickets
        default:
          return [];
      }
    };

    const statusActions = getStatusActions();

    return (
      <div className="max-w-2xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-8">
        <h3 className="text-2xl text-white mb-6 pb-3 border-b border-slate-700">
          Ticket Details
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-400">Title</label>
            <div className="bg-slate-800 rounded-xl p-3 text-white">{ticket.title}</div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-400">Description</label>
            <div className="bg-slate-800 rounded-xl p-3 text-white min-h-[100px]">
              {ticket.description}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-400">Category</label>
              <div className="bg-slate-800 rounded-xl p-3 text-white">{ticket.category}</div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-400">Current Status</label>
              <div className="bg-slate-800 rounded-xl p-3 text-white">{ticket.status}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-400">Priority</label>
              <div className="bg-slate-800 rounded-xl p-3 text-white">{ticket.priority}</div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-400">Created At</label>
              <div className="bg-slate-800 rounded-xl p-3 text-white">
                {new Date(ticket.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        
        {statusActions.length > 0 && (
          <div className="mt-8 flex justify-center space-x-4">
            {statusActions.map((action) => (
              <button
                key={action.status}
                onClick={() => handleStatusUpdate(action.status)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold 
                  transition transform hover:scale-[1.02] focus:outline-none
                  ${action.className} text-white
                `}
              >
                <FontAwesomeIcon 
                  icon={action.icon} 
                  className="mr-2" 
                />
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTicketData = {
      ...formData,
      status: "pending"
    };

    try {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData: newTicketData }),
        headers: {
          "content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create Ticket.");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket.");
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: 1,
    category: "Hardware Problem",
  });

  return (
    <div className="flex justify-center">
      <form
        className="w-full max-w-2xl space-y-6"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center">Create Your Ticket</h3>
        
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.title}
            placeholder="Enter ticket title"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            required={true}
            value={formData.description}
            rows="5"
            placeholder="Provide detailed description of the issue"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Hardware Problem">Hardware Problem</option>
              <option value="Software Problem">Software Problem</option>
              <option value="Project">Project</option>
            </select>
          </div>

          <div>
            <label>Priority</label>
            <div className="flex justify-between space-x-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <label 
                  key={level} 
                  className="flex items-center space-x-1 cursor-pointer"
                >
                  <input
                    name="priority"
                    type="radio"
                    onChange={handleChange}
                    value={level}
                    checked={formData.priority == level}
                    className="sr-only"
                  />
                  <span 
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${formData.priority == level 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-800 text-slate-400'}
                    `}
                  >
                    {level}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <input
          type="submit"
          className="btn w-full"
          value="Create Your Ticket"
        />
      </form>
    </div>
  );
};

export default TicketForm;