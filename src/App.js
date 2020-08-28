import React from "react";
import CustomList from "./component/custom-list";
import logo from "./logo.svg";
import "./App.scss";
const apiData = {
  orders: [
    {
      name: "Livi優活 抽取式衛生紙(100抽x10包x10串/箱)",
      logo: "https://static.oopocket.com/store/iconTreemall@3x.png",
      status: {
        code: 3,
        type: "已取消"
      },
      date: "107/6/12"
    },
    {
      name: "BALMUDA The Toaster 百慕達烤麵包機-黑色",
      logo: "https://static.oopocket.com/store/iconTreemall@3x.png",
      status: {
        code: 2,
        type: "已成立"
      },
      date: "108/7/21"
    },
    {
      name: "贈-短慧萬用鍋HD2133+三合一濾網「LG樂金」韓國原裝...",
      logo: "https://static.oopocket.com/store/iconTreemall@3x.png",
      status: {
        code: 1,
        type: "處理中"
      },
      date: "108/6/2"
    },
    {
      name: "Apple AirPds 2",
      logo: "https://static.oopocket.com/store/iconTreemall@3x.png",
      status: {
        code: 4,
        type: "已送達"
      },
      date: "108/3/02"
    }
  ]
};

function App() {
  const classification = {
    pending: {
      title: "進行中",
      listData: [],
      displayDate: true
    },
    complete: {
      title: "已完成",
      listData: [],
      imgGray: true
    }
  };

  if (Array.isArray(apiData.orders)) {
    apiData.orders.forEach((item) => {
      const statusCode = item.status.code;
      if (statusCode === 1 || statusCode === 2) {
        classification.pending.listData.push(item);
      } else if (statusCode === 3 || statusCode === 4) {
        classification.complete.listData.push(item);
      }
    });
  }

  //排序處理
  const sortHandle = (data, sortCondition) => {
    const getTimestamp = (date) => {
      const dateSplit = date.split("/");
      dateSplit[0] = 1911 + parseInt(dateSplit[0]);
      return new Date(dateSplit.join("/")).getTime();
    };
    data.sort((a, b) => {
      const timestampA = getTimestamp(a.date);
      const timestampB = getTimestamp(b.date);
      if (sortCondition === "desc") {
        return timestampB - timestampA;
      }
      return timestampA - timestampB;
    });
  };
  sortHandle(classification.pending.listData, "desc");

  return (
    <div className="App">
      <CustomList datas={classification} />
    </div>
  );
}

export default App;
