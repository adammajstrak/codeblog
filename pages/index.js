import { useState } from "react";
import { Row, Button } from "react-bootstrap";
import AuthorIntro from "../components/AuthorIntro";
import PageLayout from "../components/PageLayout";
import { getPaginatedBlogs } from "../lib/api";
import FilteringMenu from "../components/FilteringMenu";
import { useGetBlogsPages } from "../actions/pagination";
import PreviewAlert from "components/PreviewAlert";

export default function Home({ blogs, preview }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
    date: { asc: 0 },
  });

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useGetBlogsPages({
    blogs,
    filter,
  });

  return (
    <PageLayout>
      {preview && <PreviewAlert />}
      <AuthorIntro />
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => {
          setFilter({ ...filter, [option]: value });
        }}
      />
      <hr />
      <Row className="mb-5">{pages}</Row>
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={loadMore}
          disabled={isReachingEnd || isLoadingMore}
          size="lg"
          variant="outline-secondary"
        >
          {isLoadingMore
            ? "..."
            : isReachingEnd
            ? "No more blogs"
            : "More blogs"}
        </Button>
      </div>
    </PageLayout>
  );
}

export async function getStaticProps({ preview = false }) {
  const blogs = await getPaginatedBlogs({ offset: 0, date: "desc" });
  return {
    props: {
      blogs,
      preview,
    },
    revalidate: 10,
  };
}
