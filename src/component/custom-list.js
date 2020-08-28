import React from "react";
import "./custom-list.scss";

function CustomList({ datas }) {
  return (
    <div className="custom-list-conatiner">
      {datas.constructor === Object &&
        Object.keys(datas).length > 0 &&
        Object.keys(datas).map((itemKey, dataIndex) => {
          const { title, listData, imgGray, displayDate } = datas[itemKey];
          const imgGrayStyle = {
            filter: "grayscale(100%)"
          };
          return (
            <React.Fragment key={`custom-list-${dataIndex}`}>
              <div className="custom-list-header">
                <span>{title}</span>
              </div>
              <ul>
                {Array.isArray(listData) &&
                  listData.map((item, itemIndex) => {
                    const { name, logo, status, date } = item;
                    const { type } = status;
                    return (
                      <li key={`custom-list-item-${itemIndex}`}>
                        <div className="logo-container">
                          <img src={logo} style={imgGray && imgGrayStyle} />
                        </div>
                        <div className="order-article">
                          <div className="order-header">
                            <span className="order-status">{type}</span>
                            {displayDate && (
                              <span>
                                預計出貨：
                                <span className="order-date">{date}</span>
                              </span>
                            )}
                          </div>
                          <p className="order-name">{name}</p>
                        </div>
                        <div className="arrow-container">
                          <i className="arrow right"></i>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default CustomList;
