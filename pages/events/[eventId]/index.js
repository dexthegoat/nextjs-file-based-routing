import { useRouter } from 'next/router';
import { getEventById } from '../../../dummy-data';
import EventSummary from '../../../components/event-detail/EventSummary';
import EventLogistics from '../../../components/event-detail/EventLogistics';
import EventContent from '../../../components/event-detail/EventContent';
import ErrorAlert from '../../../components/ui/ErrorAlert';

const EventDetailPage = () => {
  const {
    query: { eventId },
  } = useRouter();
  const event = getEventById(eventId);

  if (!event)
    return (
      <ErrorAlert>
        <p>No Event Found!</p>
      </ErrorAlert>
    );

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;
