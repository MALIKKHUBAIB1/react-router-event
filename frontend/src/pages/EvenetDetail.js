// import { useParams } from "react-router-dom";

import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EvenetDetailPage() {
  const events = useRouteLoaderData("event-detail");
  return (
    <>
      <EventItem event={events.event} />
    </>
  );
}

export default EvenetDetailPage;

export async function loader({ req, params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json(
      { message: "Error loading event details Page " },
      { status: 500 }
    );
  } else {
    return response;
  }
}
export async function action({ params, request }) {
  console.log(params.eventId);
  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Failed to delete the data" }, { status: 500 });
  }

  return redirect("/events/");
}
