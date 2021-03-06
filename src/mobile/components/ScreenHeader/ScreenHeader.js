import React, { useState } from "react";
import { Icon, Menu, Label, Sidebar, Divider, Image } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import "./ScreenHeader.css";
import { connect } from "react-redux";

const ScreenHeader = ({ quantityOfOrder, bars, centerAccessories, leftAccessories, rightAccessories, history, children, notShowDivider }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>      
      <Sidebar.Pushable>
      <div style={{ display: "flex", flexDirection: "row", marginTop: 20, justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginLeft: 10, marginBottom: 10 }}>
          {bars ? <Icon name="bars" onClick={() => setVisible(true)}/> : null}
          {leftAccessories ? leftAccessories()  : null}
        </div>
        {centerAccessories ? <div>{centerAccessories()}</div> : <div style={{ marginRight: 30 }}/>}
        {rightAccessories ? <div style={{ marginRight: 10, marginBottom: 10 }}>{rightAccessories()}</div> : <div style={{ marginRight: 30 }}/>}
      </div>
      {notShowDivider ? null : <Divider />}
        <Sidebar
          as={Menu}
          animation="overlay"
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
        >
          <Menu.Item
            as="a"
            onClick={() => {
              setVisible(false);
              history.push("/");
            }}
          >
            <Icon name="home" />
            Домой
          </Menu.Item>
          <Menu.Item
            as="a"
            onClick={() => {
              setVisible(false);
              history.push("/basket");
            }}
          >
            <Icon name="shopping cart" />
            Корзина
            <Label color='violet' horizontal>
              {quantityOfOrder}
            </Label>
          </Menu.Item>

          <Menu.Item
            as="a"
            onClick={() => {
              setVisible(false);
              history.push("/orders");
            }}
          >
            <Icon name="food" />
            Мои заказы
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <div style={{ height: window.innerHeight }}>
            {children}
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quantityOfOrder: state.Main.order.length
  }
}


export default connect(mapStateToProps,{})(withRouter(ScreenHeader));