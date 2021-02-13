import redis from '@/lib/redis';
import Container from '@/components/Container';
import Guestbook from '@/components/Guestbook';

export default function GuestbookPage({ initialEntries }) {
  return (
    <Container
      title="Guestbook – Devansh Agarwal"
      description="Sign my digital guestbook and share some wisdom."
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Guestbook
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Leave a comment below. It could be anything – appreciation,
          information, wisdom, or even humor. Surprise me!
        </p>
        <Guestbook initialEntries={initialEntries} />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const entries = (await redis.hvals('guestbook'))
    .map((entry) => JSON.parse(entry))
    .sort((a, b) => b.id - a.id);

  return {
    props: {
      initialEntries: entries
    },
    revalidate: 60
  };
}
