import { getAllEvents } from '../../helper/api-utils';
import EventList from '../../components/events/EventList';
import EventSearch from '../../components/events/EventSearch';
import { useRouter } from 'next/router';

const AllEventsPage = ({ events }) => {
  // const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
