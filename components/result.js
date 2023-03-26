import { Row, Col, Text } from "@nextui-org/react";
import { getYoutubeEmbed } from "../lib/yt";

export default function Result({ video }) {
    const embed = getYoutubeEmbed(video);
    
    return (
        <Row gap={1}>
        <Col>
          <div dangerouslySetInnerHTML={{ __html: embed }} />
        </Col>
        <Col>
        <Text h6 size={15} dangerouslySetInnerHTML={{ __html: video.snippet.title}} />
        </Col>
      </Row>
    );
}