import "./index.scss";
import { Table, Modal } from "antd";
import { useContext, useEffect, useState } from "react";

import request from './../../utils/request';
import { DataContext } from "./../../pages/DashBoard/index";
import { MinerTableColumns } from "./../../utils/miners";
import { HistoryTableColumns} from './../../utils/history';

function MinersTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoding] = useState(false);
  const {
    store: { miners },
  } = useContext(DataContext);
  const [selectedMiner, setSelectedMiner] = useState(null);
  const [historyData, setHistoryData] = useState([]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (selectedMiner && selectedMiner._id) {
      setLoding(true);
      request.get(`/history?minerId=${selectedMiner._id}`).then((data) => {
        setHistoryData(data);
      }).catch(error => {
        setIsModalOpen(false);
      }).finally(() => {
        setLoding(false);
      })
    }
  }, [selectedMiner]);

  return (
    <>
      <Table
        rowKey="_id"
        dataSource={miners}
        columns={MinerTableColumns}
        size="small"
        pagination={false}
        onRow={(record) => {
          return {
            onClick: (e) => {
              setSelectedMiner(record);
              setIsModalOpen(true);
            },
          };
        }}
      ></Table>
      <Modal
        title={
          <div className="modal-title">
            {selectedMiner ? `List of history of ${selectedMiner.name}` : ""}
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={850}
      >
        {loading ? (
          <div className="loading-icon">
            <i className="icon-loader spinning"></i>
          </div>
        ) : (
          <Table
            rowKey="_id"
            dataSource={historyData}
            columns={HistoryTableColumns}
            size="small"
            pagination={false}
          ></Table>
        )}
      </Modal>
    </>
  );
}

export default MinersTable;
