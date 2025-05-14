import TicketFormView from "../../components/view/TicketFormView";

const getTicketById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to get ticket.");
  }
  return res.json();
};

const TicketPage = async ({ params }: { params: any }) => {
  const id = (await params)?.id;
  const EDITMODE = id === "new" ? false : true;

  let updateTicketData: any = {};

  if (EDITMODE) {
    updateTicketData = await getTicketById(id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return <TicketFormView ticket={updateTicketData} />;
};

export default TicketPage;
