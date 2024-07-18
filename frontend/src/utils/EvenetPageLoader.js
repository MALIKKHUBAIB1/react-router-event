import { json } from "react-router-dom";

export async function eventLoader() {
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
  // const resData = await response.json();
  return response;
}
