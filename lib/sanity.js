import sanityClient from "@sanity/client";

const options = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET_NAME,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.nextTick.NODE_ENV === "production",
};

export const previewClient = sanityClient({
  ...options,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export default sanityClient(options);
