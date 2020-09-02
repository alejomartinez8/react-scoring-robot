import React from 'react';
import EventItem from '../../components/events/EventItem';

const Events = () => {
  const events = [
    {
      id: 'sri2019',
      name: 'SRI2019',
      imgURL: 'https://pygmalion.tech/wp-content/uploads/2019/08/Logo-horizontal.png',
      description: 'Semana de la Robótica y la Innovación 2019'
    },
    {
      id: 'sri2020',
      name: 'SRI2020',
      imgURL: 'https://pygmalion.tech/wp-content/uploads/2019/08/Logo-horizontal.png',
      description: 'Semana de la Robótica 2020'
    }
  ];

  return (
    <div className='container'>
      <header className='my-4'>
        <h1 className='text-primary my-2'>Eventos</h1>
      </header>

      <div className='row'>
        {events.length > 0 ? (
          events.map((event) => <EventItem key={event.id} event={event} />)
        ) : (
          <h4>Todavía no hay eventos</h4>
        )}
      </div>
    </div>
  );
};

export default Events;
