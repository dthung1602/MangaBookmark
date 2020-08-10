import React from "react";
import { Table } from "antd";

const { Column } = Table;

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "3",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "4",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "5",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "6",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "7",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "8",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const MangaTable = () => {
  return (
    <Table dataSource={dataSource}>
      <Column dataIndex="name" key="name" />
      <Column dataIndex="age" key="age" />
      <Column dataIndex="address" key="address" />
    </Table>
  );
};

export default MangaTable;
