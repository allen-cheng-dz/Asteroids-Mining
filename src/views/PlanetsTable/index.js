import "./index.scss";
import { Table, Modal } from "antd";
import { useContext, useState, useEffect } from "react";

import request from "./../../utils/request";
import { PlanetMinerTableColumns } from "../../utils/miners";
import { DataContext } from "./../../pages/DashBoard/index";
import MinerCreateForm from "../MinerCreateForm";

function PlanetsTable() {
  const {
    store: { planets },
  } = useContext(DataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoding] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [minersData, setMinersData] = useState([]);
  const [PlanetId, setPlanetId] = useState(null);
  const [success, setSuccess] = useState(false);

  const [creating, setCreating] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelCreation = () => {
    setCreating(false);
    setSuccess(false);
  };

  const handleCreateMiner = (_id) => {
    setCreating(true);
    setPlanetId(_id);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "asteroid-name",
    },
    {
      title: "miners",
      dataIndex: "miners",
      key: "miners",
    },
    {
      title: "Minerals",
      key: "Minerals",
      render: ({ minerals }) => (
        <span className={minerals >= 1000 ? "enough" : "low"}>
          {minerals}/1000
        </span>
      ),
    },
    {
      title: "",
      key: "action",
      width: 200,
      render: ({ _id, minerals }) =>
        minerals >= 1000 ? (
          <div
            className="add-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleCreateMiner(_id);
            }}
          >
            <i className="icon-add-miner active"></i> Create a miner
          </div>
        ) : (
          <span></span>
        ),
    },
  ];

  useEffect(() => {
    if (selectedPlanet && selectedPlanet._id) {
      setLoding(true);
      request
        .get(`/miners?planetId=${selectedPlanet._id}`)
        .then((data) => {
          setMinersData(data);
        })
        .catch((error) => {
          setIsModalOpen(false);
        })
        .finally(() => {
          setLoding(false);
        });
    }
  }, [selectedPlanet]);

  return (
    <>
      <Table
        rowKey="_id"
        dataSource={planets}
        columns={columns}
        size="small"
        pagination={false}
        onRow={(record) => {
          return {
            onClick: (e) => {
              setSelectedPlanet(record);
              setIsModalOpen(true);
            },
          };
        }}
      ></Table>
      <Modal
        title={
          <div className="modal-title">
            {selectedPlanet ? `List of miners of ${selectedPlanet.name}` : ""}
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={670}
      >
        {loading ? (
          <div className="loading-icon">
            <i className="icon-loader spinning"></i>
          </div>
        ) : (
          <Table
            rowKey="_id"
            dataSource={minersData}
            columns={PlanetMinerTableColumns}
            size="small"
            pagination={false}
          ></Table>
        )}
      </Modal>
      <Modal
        title={<div className="modal-title">Create a miner</div>}
        open={creating}
        onCancel={handleCancelCreation}
        footer={null}
      >
        {success ? (
          <div className="success-message">
            The miner was successfully created
          </div>
        ) : (
          <MinerCreateForm
            id={PlanetId}
            onSuccess={() => {
              setSuccess(true);
            }}
            onCancel={() => {
              setCreating(false);
            }}
          />
        )}
      </Modal>
    </>
  );
}

export default PlanetsTable;
