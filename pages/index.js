import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../helper/api-utils';

const HomePage = ({ events }) => {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    // everything 10 minutes we regenerate this page for a new incoming request
    revalidate: 600,
  };
}

export default HomePage;
