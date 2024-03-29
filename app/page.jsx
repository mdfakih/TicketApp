import React from 'react';
import TicketCard from './(components)/TicketCard';

const getTickets = async () => {
  try {
    const res = await fetch(`${process.env.DOMAIN_URI}/api/Tickets`, {
      cache: 'no-store',
    });

    return res.json();
  } catch (error) {
    console.log('Failed to get Tickets', error);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, index) => (
            <div
              key={index}
              className="mb-4"
            >
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, index) => (
                    <TicketCard
                      id={index}
                      key={index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
