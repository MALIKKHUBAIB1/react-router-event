import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();
  // const events = data.events;

  // if (data.isError) return <p>{data.message}</p>;
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>loading...</p>}>
      <Await resolve={events}>
        {(loadEvent) => <EventsList events={loadEvent} />}
        {/* <EventsList events={events} /> */}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvent() {
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

export async function eventLoader() {
  return defer({
    events: loadEvent(),
  });
}
