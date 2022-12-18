export const HistoryTableColumns = [
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "date",
  },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
  },
  {
    title: "Planet",
    dataIndex: "planet",
    key: "planet",
  },
  {
    title: "carryCapacity",
    key: "capacity",
    render: ({capacity}) => (
      <span className={capacity.current === capacity.max ? 'full' : ''}>{capacity.current}/{capacity.max}</span>
    )
  },
  {
    title: "travelSpeed",
    dataIndex: ['speed', 'travel'],
    key: "travelSpeed"
  },
  {
    title: "miningSpeed",
    dataIndex: ['speed', 'mining'],
    key: "miningSpeed"
  },
  {
    title: "Position",
    key: "position",
    render: ({position}) => (
      <span>
        {Math.round(position.x)}, {Math.round(position.y)}
      </span>
    )
  },
  {
    title: 'Status',
    key: 'status',
    render: ({status}) => MapHistoryStatus(status)
    // dataIndex: 'status'
  }
]

export function MapHistoryStatus(status){
  switch(status){
    case 1:
      return "Miner spawn"
    case 2:
      return "Traveling from planet to asteroid"
    case 3:
      return "Mining"
    case 4:
      return "Travling back from asteroid"
    case 5:
      return "Arrived at plannet"
    default:
      return "ERR"
  }
}