import { useSWRPages } from "swr";
import { useGetBlogs } from "actions";
import { Col } from "react-bootstrap";
import CardListItem from "../components/CardListItem";
import CardItem from "../components/CardItem";
import CardItemBlank from "components/CardItemBlank";
import CardListItemBlank from "components/CardListItemBlank";
import moment from "moment";

const BlogList = ({ blogs, filter }) => {
  return blogs.map((blog) =>
    filter.view.list ? (
      <Col key={`${blog.slug}-list`} md="9">
        <CardListItem
          author={blog.author}
          title={blog.title}
          subtitle={blog.subtitle}
          date={moment(blog.date).format("LL")}
          link={{
            href: "/blogs/[slug]",
            as: `/blogs/${blog.slug}`,
          }}
        />
      </Col>
    ) : (
      <Col key={blog.slug} md="6" lg="4">
        <CardItem
          author={blog.author}
          title={blog.title}
          subtitle={blog.subtitle}
          date={moment(blog.date).format("LL")}
          image={blog.coverImage}
          link={{
            href: "/blogs/[slug]",
            as: `/blogs/${blog.slug}`,
          }}
        />
      </Col>
    )
  );
};

export const useGetBlogsPages = ({ blogs, filter }) => {
  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      const { data: paginatedBlogs, error } = withSWR(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useGetBlogs({ offset, filter })
      );

      if (!offset && !paginatedBlogs && !error) {
        return <BlogList blogs={blogs} filter={filter} />;
      }

      if (!paginatedBlogs) {
        return Array(3)
          .fill(0)
          .map((_, i) =>
            filter.view.list ? (
              <Col key={i} md="9">
                <CardListItemBlank />
              </Col>
            ) : (
              <Col key={`${i}-item`} md="6" lg="4">
                <CardItemBlank />
              </Col>
            )
          );
      }

      return <BlogList blogs={paginatedBlogs} filter={filter} />;
    },
    // here you will compute offset that will get passed into previous callback function with 'withSWR'
    // SWR: data you will get from 'withSWR' function
    // index: number of current page
    (SWR, index) => {
      if (SWR.data && SWR.data.length === 0) {
        return null;
      }
      return (index + 1) * 6;
    },
    [filter]
  );
};
