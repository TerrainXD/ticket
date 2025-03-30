import ClientDashboard from "./components/ClientDashboard";

const getTickets = async () => {
  try {
    console.log("Fetching tickets from API");
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });

    console.log("Fetch response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error fetching tickets:", errorText);
      return { tickets: [] };
    }

    const data = await res.json();
    console.log("Fetched tickets:", data);

    if (!data || !data.tickets) {
      console.error("Unexpected data structure:", data);
      return { tickets: [] };
    }

    return data;
  } catch (error) {
    console.error("Failed to get tickets:", error);
    return { tickets: [] };
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();

  console.log("Rendering Dashboard with tickets:", tickets);

  return <ClientDashboard initialTickets={tickets} />;
};

export default Dashboard;
