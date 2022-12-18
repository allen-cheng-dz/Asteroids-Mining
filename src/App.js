import './App.scss';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';

import Header from './components/Header'
import DashBoard from './pages/DashBoard';

const App = () => {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#191A29",
          colorTextBase: "#9499C3",
          fontFamily: "'Poppins', 'Lato'",
          fontSize: 12,
          colorBgContainer: "#191A29",
          colorBorder: "#9499C3",
          colorBorderSecondary: "#191A29",
          colorBgElevated: "#1A1B2F"
        }
      }}
    >
      <div className='App'>
        <Header />
        <DashBoard />
      </div>
    </ConfigProvider>
  );
};

export default App;
