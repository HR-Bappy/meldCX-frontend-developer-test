import React, { useEffect, useState } from "react";
import { onSubmitNotify } from "../helpers/API/Auth";
import { ToastContainer } from "react-toastify";
import { notification } from "../helpers/Confirm/ConfirmAction";
import Axios from "../Axios";

export default function Device() {
  const [onlineDevices, setOnlineDevices] = useState();
  function logoutFun() {
    notification("success", "Successfully Logout. Redirecting... ");
    setTimeout(() => {
      localStorage.removeItem("token");
      window.location.href = "/";
    }, 1500);
  }
  const [points, setPoints] = useState();
  useEffect(async () => {
    countDownFun();
  }, []);

  // devices api call after 5 sec
  async function countDownFun() {
    const result = await Axios.get(`${process.env.REACT_APP_API_URL}/devices`);
    setOnlineDevices(result.data.devices.length);
    console.log("result.data.devices.length", result.data.devices.length);
    let temp = createPoints(result.data.devices.length);
    setPoints(temp);
    // setTimeout(countDownFun, 5000);
  }

  // find the [x,y] axis 
  function getAxis(radius, angle) {
    var x = radius * Math.sin((Math.PI * 2 * angle) / 360);
    var y = radius * Math.cos((Math.PI * 2 * angle) / 360);

    return { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
  }
  // create points function 
  function createPoints(n) {
    let points = [];
    let r = 10;
    if ((n * 4) / 5 > r) r = (n * 4) / 5;
    for (let i = 1; i <= n; i++) {
      let { x, y } = getAxis(r + 2, (360 / n) * i);
      points.push([x * 20, y * 20]);
    }
    return points;
  }

  // send message
  function notifyFun() {
    let values = {
      name: "Habibur Rahman",
      email: "mdhabiburrb@gmail.com",
      repoUrl: "https://github.com/HR-Bappy/meldCX-frontend-developer-test",
      message: "Hello Celia, I have just compleated the task and waiting for you feedback and further instruction. Thank you",
    };

    onSubmitNotify(values)
      .then((res) => {
        console.log("rrr",res)
        if (res.status === 200) {
          notification("success", res.message);
        } else if(res.status === 201) {
          notification("success", res.data);
        }
        else{
          notification("fail", res.data);
        }
      })
      .catch((err) => {
        notification("fail", err.response.data);
      });
  }
  
    return (
      <section id="device-page">
        <ToastContainer></ToastContainer>
        <div className="content">
          <div className="body">
            <div className="device-count">
              {points && points.length
                ? points.map((item, key) => {
                    return (
                      <div
                        className="circle"
                        style={{ marginTop: item[0], marginLeft: item[1] }}
                      ></div>
                    );
                  })
                : null}
            </div>
            <div className="online-device">
              {onlineDevices ? <p>{onlineDevices}</p> : null}
              <p>
                DEVICES
                <br /> ONLINE
              </p>
            </div>
          </div>
          <div className="footer">
            <div className="btn-group">
              <button className="notify-btn" onClick={notifyFun}>
                NOTIFY
              </button>
              <button className="logout-btn" onClick={logoutFun}>
                LOG OUT
              </button>
            </div>
          </div>
        </div>
      </section>
    );
}
