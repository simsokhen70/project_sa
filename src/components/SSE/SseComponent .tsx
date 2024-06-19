"use client";
import { set } from '@auth0/nextjs-auth0/dist/session';
import { useEffect, useState } from 'react';
import { getApp } from '../Application/Application';

const SseComponent = () => {
    const [events, setEvents] = useState([]);
    const [full, setFull] = useState(false);
    const [times, setTimes] = useState(0);

    useEffect(() => {
        if(times === 0) {
            setFull(false);
        }
        const eventSource = new EventSource("http://localhost:8086/api/v1/sse/events", {
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb2toZW4iLCJleHAiOjE3MTg1OTgyNjIsImlhdCI6MTcxNzk5MzQ2Mn0.HNp8hQFNIDJJcExbVD2Zv8umVjGGVM9iVC5J_D0NE0qvO1l6bes0C0ooFlJ--cDk4O721v-gm2VtZUtRScLDaA',
              'Content-Type': 'text/event-stream'
            },
          });

        eventSource.onopen = () => {
            console.log('Connection to server opened.');
        };

        eventSource.onmessage = (event) => {
            console.log(full)
            setTimes(1);
            console.log('Message received:', event);
            // setEvents(prevEvents => [...prevEvents, response.data.payload]);
            // setEvents(event.data)
            getApp("sokhen").then((response) => {
                console.log(response.data.payload)
                setEvents(response.data.payload)
            });
        };

        eventSource.onerror = (err) => {
            console.error('EventSource failed:', err);
            eventSource.close();
            setFull(true);
            setTimes(0);
        };

        return () => {
            console.log('Closing EventSource connection.');
            eventSource.close();
        };
    }, [full]);

    return (
        <div className='w-full h-[100vh] mt-9'>
            {/* <h1 className='text-black'>Events: {events}</h1> */}
            <ul>
                {events.map((event, index) => (
                    <li key={index}>{event.projectName}</li>
                ))}
            </ul>
        </div>
    );
};

export default SseComponent;
