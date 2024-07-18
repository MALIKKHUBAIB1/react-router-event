import React from "react";
import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";
function EditEvent() {
  const data = useRouteLoaderData("event-detail");
  const event = data.event;
  return <EventForm event={event} method="patch" />;
}

export default EditEvent;
