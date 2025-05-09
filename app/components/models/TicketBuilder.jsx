export class TicketBuilder {
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
        latestUpdate: new Date()
      };
      return this;
    }
    
    setTitle(title) {
      this.ticket.title = title;
      return this;
    }
    
    setDescription(description) {
      this.ticket.description = description;
      return this;
    }
    
    setPriority(priority) {
      this.ticket.priority = parseInt(priority, 10);
      return this;
    }
    
    setCategory(category) {
      this.ticket.category = category;
      return this;
    }
    
    setContactInfo(name, email, phone) {
      this.ticket.contactName = name;
      this.ticket.contactEmail = email;
      this.ticket.contactPhone = phone;
      return this;
    }
    
    updateStatus(status) {
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