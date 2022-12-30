import "./index.scss";
import { Form, Input, Select, Row, Col, InputNumber, Button, message } from 'antd';
import { useEffect, useState } from "react";

import request from './../../utils/request';

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
}

function MinerCreateForm(props) {
  const { id, onCancel } = props;
  const [form] = Form.useForm();
  const carryCapacity = Form.useWatch('carryCapacity', form)
  const travelSpeed = Form.useWatch('travelSpeed', form)
  const miningSpeed = Form.useWatch('miningSpeed', form)
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    request.get('/planets').then(data => {
      setPlanets(data);
    }).catch(err => {
      onCancel();
    })
  },[id, onCancel])

  const onFinish = (value) => {
    if(value.carryCapacity <= 0 || value.miningSpeed <= 0 || value.travelSpeed <= 0){
      message.error("carryCapacity|miningSpeed|travelSpeed should greater then 0.");
      return;
    }
    let total = value.carryCapacity + value.miningSpeed + value.travelSpeed;
    if(total > 200){
      message.error("total of carryCapacity, miningSpeed and travelSpeed should less then or equal to 200.")
      return;
    }
    let data = {
      ...value,
      "angle": 0,
      "status": 0,
      "minerals": 0,
    }
    const filteredPlanets = planets.filter(planet => planet._id === value.planet)
    if(filteredPlanets.length === 1){
      const selectedPlanet = filteredPlanets[0];
      data = {
        ...data,
        x: selectedPlanet.position.x,
        y: selectedPlanet.position.y,
        target: selectedPlanet._id,
        "targetType": "Planet"
      }
    }else{
      message.error('Something went wrong!');
      return 
    }
    request.post('/miners', data).then(data => {
      if(data && data._id){
        props.onSuccess();
      }else{
        props.onFail();
      }
    }).catch(err => {
      props.onFail();
    }).finally(() => {
      form.resetFields();
    })
  }

  return (  
    <Form
      form={form}
      name="create_miner"
      {...formItemLayout}
      initialValues={{
        "planet": props.id
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{required: true, message: "Please Input a name for the miner!"}]}
      >
        <Input placeholder="Name of the Miner"></Input>
      </Form.Item>
      <Form.Item
        name="planet"
        label="Planet"
        rules={[{required: true, message: "Please select a planet!"}]}
      >
        <Select>
          {
            planets.map(planet => (
              <Select.Option 
              key={planet._id} 
              value={planet._id}
              disabled={
                planet.minerals < 1000
              }
              >
                {planet.name}
              </Select.Option>
            ))
          }
        </Select>
      </Form.Item>
      <div className="sub-title">Assgin Points</div>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="carryCapacity"
            label="carryCapacity"
          >
            <InputNumber max={200} min={1} className="input-number"/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="travelSpeed"
            label="travelSpeed"
          >
            <InputNumber max={200} min={1} className="input-number"/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="miningSpeed"
            label="miningSpeed"
          >
            <InputNumber max={200} min={1} className="input-number"/>
          </Form.Item>
        </Col>
      </Row>
      <div className="center">
        <div className={200 - (carryCapacity|| 0) - (travelSpeed || 0) - (miningSpeed || 0) > 0 ? 'sufficient' : 'insufficient'}>
          {200 - (carryCapacity|| 0) - (travelSpeed || 0) - (miningSpeed || 0)}/200
        </div>
      </div>
      <Form.Item>
        <div className="button-holder">
          <Button htmlType="submit">Save</Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default MinerCreateForm;