import { useRouter } from 'next/router';
import { getEventById, getFeaturedEvents } from '../../../helper/api-utils';
import EventSummary from '../../../components/event-detail/EventSummary';
import EventLogistics from '../../../components/event-detail/EventLogistics';
import EventContent from '../../../components/event-detail/EventContent';
import ErrorAlert from '../../../components/ui/ErrorAlert';

const EventDetailPage = (props) => {
  // const {
  //   query: { eventId },
  // } = useRouter();
  // const event = getEventById(eventId);
  const event = props.selectedEvent;

  if (!event)
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
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

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    // large number means users see more outdated pages
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((e) => ({ params: { eventId: e.id } }));

  return {
    paths: paths,
    // 这false意思是告诉nextjs 我把所有pages都准备好了 (404), true意思是还有别的pages
    fallback: true,
  };
}

export default EventDetailPage;
