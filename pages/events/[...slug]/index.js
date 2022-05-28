import { getFilteredEvents } from '../../../dummy-data';
import { useRouter } from 'next/router';
import EventList from '../../../components/events/EventList';
import ResultsTitle from '../../../components/events/ResultTitle';
import Button from '../../../components/ui/button';
import ErrorAlert from '../../../components//ui/ErrorAlert';

const FilteredEventsPage = () => {
  const {
    query: { slug },
  } = useRouter();

  if (!slug) {
    return <p className="center">Loading...</p>;
  }

  const numYear = +slug[0];
  const numMonth = +slug[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter, Please adjust values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const events = getFilteredEvents({ year: numYear, month: numMonth });

  if (!events || events.length === 0)
    return (
      <>
        <ErrorAlert>
          <p>No Events Found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  );
};

export default FilteredEventsPage;
