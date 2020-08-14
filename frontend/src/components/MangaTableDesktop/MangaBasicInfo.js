import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

function MangaBasicInfo(manga) {
  return (
    <>
      <Title level={4}>
        <a href={manga.link} target="_blank" rel="noopener noreferrer">
          {manga.name}
        </a>
      </Title>
      <div>Source: {manga.source}</div>
      <div>Shelf: {manga.following}</div>
      <div>Status: {manga.statusString}</div>
      <div>New chap: {manga.newChapCount}</div>
      <div>Unread: {manga.unreadChapCount}</div>
    </>
  );
}

export default MangaBasicInfo;
