import { getFilteredEvents } from '../../../helper/api-utils';
import { useRouter } from 'next/router';
import EventList from '../../../components/events/EventList';
import ResultsTitle from '../../../components/events/ResultTitle';
import Button from '../../../components/ui/button';
import ErrorAlert from '../../../components//ui/ErrorAlert';
import useSWR from 'swr';

const FilteredEventsPage = ({ hasError, events, date: { year, month } }) => {
  // const {
  //   query: { slug },
  // } = useRouter();

  // if (!slug) {
  //   return <p className="center">Loading...</p>;
  // }

  // const numYear = +slug[0];
  // const numMonth = +slug[1];

  if (hasError) {
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

  // const events = getFilteredEvents({ year: numYear, month: numMonth });

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

  const date = new Date(year, month - 1);

  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta name="description" content={`All events for ${month}/${year}.`} />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  );
};

export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;

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
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: '/error',
      // },
    };
  }

  const events = await getFilteredEvents({ year: numYear, month: numMonth });

  return {
    props: {
      events,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FilteredEventsPage;
