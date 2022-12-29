import PageLayout from "../../components/PageLayout";
import { getBlogBySlug, getAllBlogs } from "../../lib/api";
import { Row, Col } from "react-bootstrap";
import BlogHeader from "components/BlogHeader";
import BlogContent from "components/BlogContent";
import { urlFor } from "../../lib/api";
import moment from "moment";
import { useRouter } from "next/router";
import ErroPage from "next/error";
import PreviewAlert from "components/PreviewAlert";

const BlogDetails = ({ blog, preview }) => {
  const router = useRouter();

  if (!router.isFallback && !blog?.slug) {
    return <ErroPage statusCode="404" />;
  }

  if (router.isFallback) {
    return <PageLayout className="blog-detail-page">Loading...</PageLayout>;
  }

  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          {preview && <PreviewAlert />}
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            author={blog.author}
            coverImage={
              blog.coverImage ? urlFor(blog.coverImage).height(600).url() : ""
            }
            date={moment(blog.date).format("LLL")}
          />
          <hr />
          {blog.content && <BlogContent content={blog.content} />}
        </Col>
      </Row>
    </PageLayout>
  );
};

export async function getStaticProps({ params, preview = false, previewData }) {
  const blog = await getBlogBySlug(params.slug, preview);
  return {
    props: { blog, preview },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs();

  return {
    paths: blogs.map((blog) => ({
      params: {
        slug: blog.slug,
      },
    })),
    fallback: true,
  };
}

export default BlogDetails;
