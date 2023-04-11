
import { NextRouter } from "next/router";
import { event } from "./analytics";

const handleSearch = async (router: NextRouter, url: string) => {
    event({
      action: 'search',
      category: 'form',
      label: url,
    });

    router.push(`/search?url=${encodeURIComponent(url)}`);
  }

  export default handleSearch;