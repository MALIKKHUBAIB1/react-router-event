import React from "react";
import EventNavigation from "../components/EventsNavigation";
import { Outlet } from "react-router-dom";
function EvenetRoot() {
  return (
    <>
      <EventNavigation />
      <Outlet />
    </>
  );
}

export default EvenetRoot;
