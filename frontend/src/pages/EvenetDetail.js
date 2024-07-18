// import { useParams } from "react-router-dom";

import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

function EvenetDetailPage() {
  const { events, event } = useRouteLoaderData("event-detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>loading...</p>}>
        <Await resolve={event}>
          {(loadEvent) => <EventItem event={loadEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>loading...</p>}>
        <Await resolve={events}>
          {(loadEvents) => <EventsList events={loadEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EvenetDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json(
      { message: "Error loading event details Page " },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}
async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // throw new Error("Failed to fetch home data");
    // return { isError: true, message: "Failed to fetch Event data" };
    // throw new Response(
    //   JSON.stringify({ message: "Failed to fetch Event data" }),
    //   {
    //     status: 500,
    //   }
    // );
    // AleterNative way
    throw json({ message: "Failed to fetch Event data" }, { status: 500 });
  }
  const resData = await response.json();
  return resData.events;
}
export async function loader({ req, params }) {
  const id = params.eventId;
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
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
