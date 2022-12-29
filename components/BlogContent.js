import { PortableText } from "@portabletext/react";
import HighlightCode from "./HighlightCode";
import { urlFor } from "../lib/api";

const serializers = {
  types: {
    image: ({ value: { asset, alt, position = "center" } }) => {
      return (
        <div className={`blog-image blog-image-${position}`}>
          <img src={urlFor(asset).height(300).fit("max").url()} />
          <div className="image-alt">{alt}</div>
        </div>
      );
    },
    code: (props) => {
      return (
        <HighlightCode language={props.value.language}>
          {props.value.code}
          <div className="code-filename">{props.value.filename}</div>
        </HighlightCode>
      );
    },
  },
};

const BlogContent = ({ content }) => (
  <PortableText value={content} components={serializers} />
);

export default BlogContent;
