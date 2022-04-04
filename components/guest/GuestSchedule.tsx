import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const GuestSchedule = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridDay"
      initialDate={"2022-06-03"}
      locale="ja"
      headerToolbar={{
        center: "",
      }}
      customButtons={{
        new: {
          text: "new",
          click: () => console.log("new event"),
        },
      }}
      events={[
        {
          title: "参加可能",
          start: "2022-06-03T09:00:00",
          end: "2022-06-03T10:00:00",
        },
        {
          title: "参加可能",
          start: "2022-06-03T11:00:00",
          end: "2022-06-03T12:00:00",
        },
      ]}
      eventColor="blackblue"
      nowIndicator
      dateClick={(e) => console.log(e.dateStr)}
      eventClick={(e) => console.log(e.event.id)}
    />
  );
};

export default GuestSchedule;
