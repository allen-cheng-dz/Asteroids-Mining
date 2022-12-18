import "./index.scss";
import { io } from "socket.io-client";
import {
  createContext,
  useState,
  useLayoutEffect,
  useRef,
  useMemo,
  useReducer,
} from "react";
import { Tabs, Row, Col } from "antd";

import Button from "./../../components/Button";
import MinersTable from "../../views/MinersTable";
import AsteroidsTable from "../../views/AsteroidsTable";
import PlanetsTable from "../../views/PlanetsTable";

export const DataContext = createContext({});

const { Provider } = DataContext;

function reducer(state, action) {
  if (action.type === "update") {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}

function DashBoard() {
  const [currentTabKey, setCurrentTabKey] = useState("miners");

  const initialData = useMemo(() => {
    return {};
  }, []);

  const [state, dispatch] = useReducer(reducer, initialData);

  const ws = useRef(null);
  useLayoutEffect(() => {
    ws.current = io("wss://asteroids.dev.mediasia.cn");
    ws.current.on("connect", (err) => {
      if (err) {
        console.log(err);
      } else {
        ws.current.on("tick", (data) => {
          dispatch({type: 'update', payload: data});
        });
      }
    });

    return () => {
      ws.current?.close();
    };
  }, [ws]);

  return (
    <Provider value={{store: state, dispatch}}>
      <div className="dashboard-container">
      <Row>
        <Col span={10}>
        <div className="dashboard-left">
        <div className="button-group">
          <Button
            name="miners"
            activeKey={currentTabKey}
            icon="miner"
            onClick={() => {
              setCurrentTabKey("miners");
            }}
          >
            Miners
          </Button>
          <Button
            name="asteroids"
            activeKey={currentTabKey}
            icon="asteroid"
            onClick={() => {
              setCurrentTabKey("asteroids");
            }}
          >
            Asteroids
          </Button>
          <Button
            name="planets"
            activeKey={currentTabKey}
            icon="planet"
            onClick={() => {
              setCurrentTabKey("planets");
            }}
          >
            Planets
          </Button>
        </div>
        <Tabs
          activeKey={currentTabKey}
          items={[
            {
              key: "miners",
              children: <MinersTable />,
            },
            {
              key: "asteroids",
              children: <AsteroidsTable />,
            },
            {
              key: "planets",
              children: <PlanetsTable />,
            },
          ]}
        ></Tabs>
        </div>
        </Col>
        <Col span={14}>
        <div className="dashboard-right">
          <div className="current-year">{state.currentTick}YEARS</div>
          <div className="space-background-image"></div>
        </div>
        </Col>
      </Row>
      </div>
    </Provider>
  );
}

export default DashBoard;
