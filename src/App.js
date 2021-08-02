import "./App.css";
import { useEffect, useRef } from "react";
import Happy from "./happy.svg";
import Blob from "./blob.svg";
import Pay from "./pay.svg";

function App() {
  // Creating a ref to the paypal div
  const paypalRef = useRef();

  // Call the paypal when the component mounts
  useEffect(() => {
    window.paypal
      .Buttons({
        style: {
          layout: "horizontal",
          size: "small",
          label: "pay",
          height: 48,
          tagline: "false",
          borderRadius: 10,
        },
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "88.44",
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (orderData) {
            // Successful capture! For demo purposes:
            var transaction = orderData.purchase_units[0].payments.captures[0];
            console.log(transaction);
          });
        },
      })
      .render(paypalRef.current);
  }, []);

  return (
    <div className="App">
      <img className="blob" src={Blob} />
      <div className="title-container">
        <div className="title">
          I just want to pay with a<div>beautiful button</div>
        </div>
        <img src={Happy} />
      </div>
      <div className="container">
        <div className="paypal" ref={paypalRef}></div>
        <button className="customized-button">Pay with me! <img src={Pay}/></button>
      </div>
    </div>
  );
}

export default App;
