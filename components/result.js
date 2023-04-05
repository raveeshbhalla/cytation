import { Grid, Text } from "@nextui-org/react";
import { getYoutubeEmbed } from "../lib/yt";
import ReactGA from 'react-ga';
import { getYouTubeUrl } from "../lib/yt";

export default function Result({ video }) {
    const embed = getYoutubeEmbed(video);
    
    return (
      <Grid.Container gap={1}>
        <Grid xs={12} sm={6} md={6} lg={6}>
        <div
          style={{
            position: 'relative',
            paddingBottom: '56.25%', // 16:9 aspect ratio
            height: 0,
            overflow: 'hidden',
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: embed }}
          />
        </div>
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6}>
        <ReactGA.OutboundLink
          eventLabel="ytTopResult"
          to={getYouTubeUrl(video)}
          target="_blank"
          >
          <Text
            h6
            size={15}
            dangerouslySetInnerHTML={{ __html: video.snippet.title }}
          />
          </ReactGA.OutboundLink>
        </Grid>
      </Grid.Container>
    );
}