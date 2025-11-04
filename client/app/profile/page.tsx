'use client';
import React from 'react';
import styles from './dashboard.module.css';

const bookings = {
  upcoming: [
    {
      id: "SLK79012",
      from: "New York",
      to: "Los Angeles",
      date: "2024-11-15",
      time: "08:30 AM - 01:30 PM",
      seats: "A2",
      type: "flight",
    },
    {
      id: "SLK74578",
      from: "Los Angeles",
      to: "San Francisco",
      date: "2024-11-21",
      time: "05:30 PM - 10:30 PM",
      seats: "C2",
      type: "flight",
    },
  ],
  past: [
    {
      id: "SLK12345",
      from: "Washington D.C.",
      to: "Philadelphia",
      date: "2024-10-12",
      time: "06:00 AM - 12:30 PM",
      seats: "B3",
      type: "train",
    },
    {
      id: "SLK67554",
      from: "Chicago",
      to: "St. Louis",
      date: "2024-10-02",
      time: "02:00 PM - 10:00 PM",
      seats: "A7, B8",
      type: "train",
    },
    {
      id: "SLK10987",
      from: "Miami",
      to: "Orlando",
      date: "2024-09-18",
      time: "09:00 AM - 12:00 PM",
      seats: "F1",
      type: "train",
    },
  ],
};

const icon = {
  flight: (
    <svg height="28" width="28" fill="#3183EF" viewBox="0 0 24 24"><path d="M2.5,19.29l.69-1.8,5.42-7.46V4.77A2,2,0,0,1,10.5,3h1A2,2,0,0,1,13.5,4.77V10l5.41,7.46.69,1.8A1,1,0,0,1,18.69,21c-.37,0-.7-.24-.91-.6l-5.3-7.27-5.3,7.27A1,1,0,0,1,2.5,19.29Z" /></svg>
  ),
  train: (
    <svg height="25" width="25" fill="#70e0a2" viewBox="0 0 24 24"><path d="M12 2C8.134 2 5 5.134 5 9v6c0 1.103.897 2 2 2H7v2a1 1 0 0 0 2 0v-2h6v2a1 1 0 0 0 2 0v-2h-.001C18.104 17 19 16.103 19 15V9c0-3.866-3.134-7-7-7zm0 2c2.757 0 5 2.243 5 5v6c0 .551-.449 1-1 1H8c-.551 0-1-.449-1-1V9c0-2.757 2.243-5 5-5zm-3 11h6a1 1 0 0 0 1-1v-2H8v2C8 14.551 8.449 15 9 15zm7-9H8c-.551 0-1 .449-1 1s.449 1 1 1h8c.551 0 1-.449 1-1s-.449-1-1-1z" /></svg>
  ),
};

export default function BookingsDashboard() {
  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.card}>
        <span className={styles.cardTitle}>Your Profile</span>
        <div className={styles.profileInfo}>
          <img className={styles.avatar} src="https://randomuser.me/api/portraits/men/32.jpg" alt="Avatar" />
          <div>
            <div className={styles.profileName}>Alex Johnson</div>
            <div className={styles.profileEmail}>alex.johnson@email.com</div>
            <a href="/manage-profile" className={styles.manageLink}>Manage Profile</a>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <h3>Upcoming Bookings</h3>
        <div className={styles.bookingGrid}>
          {bookings.upcoming.map(b => (
            <BookingCard key={b.id} booking={b} status="upcoming" />
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <h3>Past Bookings</h3>
        <div className={styles.bookingGrid}>
          {bookings.past.map(b => (
            <BookingCard key={b.id} booking={b} status="past" />
          ))}
        </div>
      </div>
    </div>
  );
}

const BookingCard = ({
  booking,
  status,
}: {
  booking: {
    id: string,
    from: string,
    to: string,
    date: string,
    time: string,
    seats: string,
    type: "flight" | "train",
  },
  status: "upcoming" | "past"
}) => (
  <div className={styles.bookingCard}>
    <div className={styles.cardRow}>
      <span className={styles.bookingId}>Booking ID: {booking.id}</span>
      <span className={status === "upcoming" ? styles.statusUpcoming : styles.statusCompleted}>
        {status === "upcoming" ? "Upcoming" : "Completed"}
      </span>
    </div>
    <div className={styles.infoRow}>
      <span className={styles.infoIcon}>{icon[booking.type]}</span>
      <span className={styles.route}>
        {booking.from} &bull; {booking.to}
      </span>
    </div>
    <div className={styles.datesRow}>
      <span>{booking.date}</span>
      <span>{booking.time}</span>
    </div>
    <div className={styles.datesRow}>
      <span>Seats:{booking.seats}</span>
    </div>
    <div className={status === "upcoming" ? styles.travelIconFlight : styles.travelIconTrain}>
      {icon[booking.type]}
    </div>
  </div>
);
