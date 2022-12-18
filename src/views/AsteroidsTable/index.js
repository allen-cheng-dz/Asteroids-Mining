import './index.scss';
import { Table } from 'antd';
import { useContext } from 'react';

import { DataContext } from './../../pages/DashBoard/index'

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "asteroid-name"
  },
  {
    title: "Minerals",
    key: "asteroid-Minerals",
    render: ({minerals, status}) => (
      <span className={
        status === 0 || minerals === 0 ?
        'depleted' :
        'has'
      }>{minerals}</span>
    )
  },
  {
    title: "Current miner",
    key: "asteroid-currentMiner",
    render: (record) => record.currentMiner?.name || 0
  },
  {
    title: "position",
    key: "position",
    render: ({position: {x, y}}) => (
      <span>
      {Math.round(x)}, {Math.round(y)}
      </span>)
  }
]

function AsteroidsTable() {
  const {store: { asteroids }} = useContext(DataContext)
  return (
    <Table
      rowKey="_id"
      dataSource={asteroids}
      columns={columns}
      size="small"
      pagination={false}
    >
    </Table>
  );
}

export default AsteroidsTable;