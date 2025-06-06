"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatTimestamp } from "../share/share";
import { TicketBuilder } from "../models/TicketBuilder";

const TicketFormController = (ticket = { _id: "new" }) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();

  const STATUS_PROGRESSION = {
    pending: ["accepted", "rejected"],
    accepted: ["resolved"],
    resolved: [],
    rejected: [],
  };

  const [formData, setFormData] = useState({
    title: EDITMODE ? ticket.title : "",
    description: EDITMODE ? ticket.description : "",
    priority: EDITMODE ? ticket.priority : 1,
    category: EDITMODE ? ticket.category : "Hardware Problem",
    contactName: EDITMODE ? ticket.contactName : "",
    contactEmail: EDITMODE ? ticket.contactEmail : "",
    contactPhone: EDITMODE ? ticket.contactPhone : "",
  });

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

    const builder = new TicketBuilder();
    const newTicket = builder
      .setTitle(formData.title)
      .setDescription(formData.description)
      .setPriority(formData.priority)
      .setCategory(formData.category)
      .setContactInfo(
        formData.contactName,
        formData.contactEmail,
        formData.contactPhone
      )
      .build();

    console.log("Submitting ticket data:", newTicket);

    try {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData: newTicket }),
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

  const handleStatusUpdate = async (newStatus) => {
    const currentStatus = ticket.status;
    const allowedNextStatuses = STATUS_PROGRESSION[currentStatus] || [];

    if (!allowedNextStatuses.includes(newStatus)) {
      alert(`Cannot change status from ${currentStatus} to ${newStatus}`);
      return;
    }

    try {
      // Update latestUpdate
      const currentDate = new Date();

      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({
          formData: {
            status: newStatus,
            latestUpdate: currentDate,
          },
        }),
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

  const getStatusActions = () => {
    if (!EDITMODE) return [];
    
    switch (ticket.status) {
      case "pending":
        return [
          {
            status: "accepted",
            label: "Accept",
            icon: "faCheckCircle",
            className: "bg-emerald-600 hover:bg-emerald-700",
          },
          {
            status: "rejected",
            label: "Reject",
            icon: "faTimesCircle",
            className: "bg-red-600 hover:bg-red-700",
          },
        ];
      case "accepted":
        return [
          {
            status: "resolved",
            label: "Resolve",
            icon: "faCheckCircle",
            className: "bg-emerald-600 hover:bg-emerald-700",
          },
        ];
      case "resolved":
        return [];
      case "rejected":
        return [];
      default:
        return [];
    }
  };

  return {
    EDITMODE,
    formData,
    handleChange,
    handleSubmit,
    handleStatusUpdate,
    getStatusActions,
    formatTimestamp,
    ticket
  };
};

export default TicketFormController;