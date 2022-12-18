export function MapMinerStatus(status){
  switch(status){
    case 0:
      return "Idle"
    case 1:
      return "Traveling"
    case 2:
      return "Mining"
    case 3:
      return "Transfering minerals to planet"
    default:
      return "ERR"
  }
}

export const MinerTableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Planet",
    dataIndex: ["planet", "name"],
    key: "planet.name"
  },
  {
    title: "carryCapacity",
    key: "carryCapacity",
    render: ({minerals, carryCapacity}) => (
      <span className={
        minerals >= carryCapacity ?
        'full' :
        'available'
      }>{minerals}/{carryCapacity}</span>
    )
  },
  {
    title: "travelSpeed",
    dataIndex: "travelSpeed",
    key: "travelSpeed"
  },
  {
    title: "miningSpeed",
    dataIndex: "miningSpeed",
    key: "miningSpeed"
  },
  {
    title: "position",
    key: "position",
    render: (data) => (
      <span>
      {Math.round(data.x)}, {Math.round(data.y)}
      </span>)
  },
  {
    title: "Status",
    key: "status",
    render: ({status}) => MapMinerStatus(status),
    width: 200
  }
]

export const PlanetMinerTableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "carryCapacity",
    key: "carryCapacity",
    render: ({minerals, carryCapacity}) => (
      <span className={
        minerals >= carryCapacity ?
        'full' :
        'available'
      }>{minerals}/{carryCapacity}</span>
    )
  },
  {
    title: "travelSpeed",
    dataIndex: "travelSpeed",
    key: "travelSpeed"
  },
  {
    title: "miningSpeed",
    dataIndex: "miningSpeed",
    key: "miningSpeed"
  },
  {
    title: "position",
    key: "position",
    render: (data) => (
      <span>
      {Math.round(data.x)}, {Math.round(data.y)}
      </span>)
  },
  {
    title: "Status",
    key: "status",
    render: ({status}) => MapMinerStatus(status),
    width: 200
  }
]