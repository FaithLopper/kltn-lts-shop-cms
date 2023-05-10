import React, { useLayoutEffect, useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Utils from "../../utils";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { actions } from "../../actions";
import { Card } from "antd";
import { dashBoardRevnueKinds } from "../../constants/masterData";

const { Meta } = Card;
const { formatCurrency, getCurrentDate } = Utils;
const moneyFormatter = formatCurrency("vi-VN", "currency", "VND");
const { currentDay, date, currentMonth } = getCurrentDate();
const defaultCurrentMonthStyle = {
  stroke: "#82ca9d",
  fill: "#82ca9d",
  strokeWidth: 1,
};
const defaultLastMonthStyle = {
  stroke: "#8884d8",
  fill: "#8884d8",
  strokeWidth: 1,
};

const DashBoardPage = (props) => {
  const {
    changeBreadcrumb,
    t,
    revValuesLoading,
    revTableloading,
    revTableData,
    revValuesData,
  } = props;
  const [currentMonthStyle, setCurrentMothStyle] = useState({
    ...defaultCurrentMonthStyle,
  });
  const [lastMonthStyle, setLastMothStyle] = useState({
    ...defaultLastMonthStyle,
  });
  useLayoutEffect(() => {
    const breadcrumbs = [{ name: t("breadcrumbs.currentPage") }];
    changeBreadcrumb(breadcrumbs);
  }, []);

  useEffect(() => {
    const { getRevenueTable, getRevenueValues } = props;
    getRevenueTable();
    getRevenueValues();
  }, []);
  return (
    <div className="dashBoard-page">
      <div className="dashBoard-chart">
        <Card
          headStyle={{
            backgroundColor: "black",
            color: "white",
          }}
          title="Kết quả kinh doanh"
        >
          <div className="rev-values-container">
            {Object.keys(revValuesData).map((value) => {
              return (
                <Card className="rev-value-card" loading={revValuesLoading}>
                  <Meta title={dashBoardRevnueKinds[value].title} />
                  <span className="rev-value">
                    {moneyFormatter.format(revValuesData[value])}
                  </span>
                  &nbsp;{dashBoardRevnueKinds[value].per}
                </Card>
              );
            })}
          </div>
          <div className="chart-table-container">
            <Card
              style={{ marginTop: 18 }}
              type="inner"
              title="Biểu đồ doanh thu các ngày trong tháng này và tháng trước"
              loading={revTableloading}
            >
              <div className="today-revenue">
                Doanh thu của hôm nay {`(${date})`}:&nbsp;
                <span className="money">
                  {moneyFormatter.format(
                    revTableData[currentDay - 1]?.currentMonthRevenue
                  )}
                </span>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={400}
                  height={400}
                  data={revTableData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    height={60}
                    dataKey="day"
                    label={{
                      value: `Các ngày trong tháng ${currentMonth}`,
                      position: "insideBottom",
                    }}
                  />

                  <YAxis
                    tickFormatter={(value) => moneyFormatter.format(value)}
                    width={120}
                  />
                  <Tooltip
                    formatter={(value) => moneyFormatter.format(value)}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Area
                    legendType="circle"
                    type="monotone"
                    dataKey="currentMonthRevenue"
                    {...currentMonthStyle}
                    name="Doanh thu tháng này"
                    onMouseOver={() =>
                      setCurrentMothStyle({
                        ...currentMonthStyle,
                        strokeWidth: 3,
                        fill: "rgb(16, 234, 96)",
                      })
                    }
                    onMouseOut={() =>
                      setCurrentMothStyle({
                        ...defaultCurrentMonthStyle,
                      })
                    }
                  />
                  <Area
                    legendType="square"
                    type="monotone"
                    dataKey="lastMonthRevenue"
                    {...lastMonthStyle}
                    onMouseOver={() =>
                      setLastMothStyle({
                        ...lastMonthStyle,
                        strokeWidth: 3,
                        fill: "rgb(57, 50, 252)",
                      })
                    }
                    onMouseOut={() =>
                      setLastMothStyle({
                        ...defaultLastMonthStyle,
                      })
                    }
                    name="Doanh thu tháng trước"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  revValuesLoading: state.dashBoard.revenueValuesLoading,
  revTableloading: state.dashBoard.revenueTableLoading,
  revTableData: state.dashBoard.revenueTableData,
  revValuesData: state.dashBoard.revenueValues,
});

const mapDispatchToProps = (dispatch) => ({
  getRevenueTable: (payload) => dispatch(actions.getRevenueTableData(payload)),
  getRevenueValues: (payload) =>
    dispatch(actions.getRevenueValuesData(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("DashBoardPage")(DashBoardPage));
