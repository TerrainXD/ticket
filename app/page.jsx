import ClientDashboard from "./(conponents)/ClientDashboard";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store"
    })

    return res.json();
  } catch (error) {
    console.log("Failed to get ticket: ", error);
    return { tickets: [] };
  }
};

const Dashboard = async () => {
  const {tickets} = await getTickets();

  return <ClientDashboard initialTickets={tickets} />;
};

export default Dashboard;