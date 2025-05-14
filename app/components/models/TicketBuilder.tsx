export class TicketBuilder {
  ticket!: {
    title: string;
    description: string;
    priority: number;
    category: string;
    status: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    createdAt: Date;
    latestUpdate: Date;
  };
  constructor() {
    this.reset();
  }

  reset() {
    this.ticket = {
      title: "",
      description: "",
      priority: 1,
      category: "Hardware Problem",
      status: "pending",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      createdAt: new Date(),
      latestUpdate: new Date(),
    };
    return this;
  }

  setTitle(title: string) {
    this.ticket.title = title;
    return this;
  }

  setDescription(description: string) {
    this.ticket.description = description;
    return this;
  }

  setPriority(priority: number | string) {
    this.ticket.priority = parseInt(priority.toString(), 10);
    return this;
  }

  setCategory(category: string) {
    this.ticket.category = category;
    return this;
  }

  setContactInfo(name: string, email: string, phone: string) {
    this.ticket.contactName = name;
    this.ticket.contactEmail = email;
    this.ticket.contactPhone = phone;
    return this;
  }

  updateStatus(status: string) {
    this.ticket.status = status;
    this.ticket.latestUpdate = new Date();
    return this;
  }

  build() {
    const ticket = this.ticket;
    this.reset();
    return ticket;
  }
}
