const CLASSIFY = "CLASSIFY";
const SORT_DESC = "SORT_DESC";
const SORT_ASC = "SORT_ASC";

const initialState = {
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

//排序處理funcion
const sortHandle = (data, sortCondition) => {
  const newData = JSON.parse(JSON.stringify(data));
  const getTimestamp = (date) => {
    const dateSplit = date.split("/");
    dateSplit[0] = 1911 + parseInt(dateSplit[0]);
    return new Date(dateSplit.join("/")).getTime();
  };
  newData.sort((a, b) => {
    const timestampA = getTimestamp(a.date);
    const timestampB = getTimestamp(b.date);
    if (sortCondition === "desc") {
      return timestampB - timestampA;
    }
    return timestampA - timestampB;
  });

  return newData;
};
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLASSIFY:
      const { apiData } = action.payload;

      if (Array.isArray(apiData.orders)) {
        apiData.orders.forEach((item) => {
          const statusCode = item.status.code;
          if (statusCode === 1 || statusCode === 2) {
            state.pending.listData.push(item);
          } else if (statusCode === 3 || statusCode === 4) {
            state.complete.listData.push(item);
          }
        });
      }
      return state;
    case SORT_DESC:
      const descData = sortHandle(state.pending.listData, "desc");
      return {
        ...state,
        pending: {
          ...state.pending,
          listData: descData
        }
      };
      break;
    case SORT_ASC:
      const ascData = sortHandle(state.pending.listData);
      return {
        ...state,
        pending: {
          ...state.pending,
          listData: ascData
        }
      };
    default:
      return state;
  }
};
