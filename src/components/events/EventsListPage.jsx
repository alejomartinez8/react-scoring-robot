import React, { Fragment } from "react"
import EventItem from "./EventItem"

const EventsListPage = () => {
  const events = [
    {
      id: "sri2019",
      name: "SRI2019",
      imgURL:
        "https://pygmalion.tech/wp-content/uploads/2019/08/Logo-horizontal.png",
      description: "Semana de la Robótica y la Innovación 2019",
    },
    {
      id: "sri2020",
      name: "SRI2020",
      imgURL:
        "https://pygmalion.tech/wp-content/uploads/2019/08/Logo-horizontal.png",
      description: "Semana de la Robótica 2020",
    },
  ]

  return (
    <Fragment>
      <h1 className="large text-primary">Eventos</h1>

      <div className="row">
        {events.length > 0 ? (
          events.map((event) => <EventItem key={event.id} event={event} />)
        ) : (
          <h4>Todavía no hay eventos</h4>
        )}
      </div>
    </Fragment>
  )
}

export default EventsListPage