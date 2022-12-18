import './index.scss'

function Button(props) {
  return (
    <div className={
      props.name === props.activeKey ? 
      `button-container button-active` :
      'button-container'
    }
    onClick={() => props.onClick()}
    >
      <div className="icon-container">
        <i className={
          props.name === props.activeKey ? 
          `icon-${props.icon} icon-large active` :
          `icon-${props.icon} icon-large`}></i>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

export default Button;