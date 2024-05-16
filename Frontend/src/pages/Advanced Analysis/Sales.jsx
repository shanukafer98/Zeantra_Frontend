import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import SalesPieChart from "../../components/Charts/Sales_Charts/Sales_Pie_Chart";
import SalesTreeMapChart from "../../components/Charts/Sales_Charts/Sales_Treemap_Chart";
import SalesBarChart from "../../components/Charts/Sales_Charts/Sales_Bar_Chart";

const Sales = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Sales" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          <div className="bg-slate-200  dark:bg-slate-800 rounded-lg">
            <SalesPieChart
              url="/valueCounts_shipMode_Frontend"
              chart_type="pie"
              title="Sales Shipmode Wise"
            />
          </div>
          <div className="bg-slate-200  dark:bg-slate-800 rounded-lg">
            <SalesPieChart
              url="/ValueCounts/valueCounts_segment_Frontend"
              chart_type="donut"
              title="Sales Segment Wise"
            />
          </div>
          <div className="bg-slate-200  dark:bg-slate-800 rounded-lg">
            <SalesTreeMapChart
              url="/ValueCounts/valueCounts_market_Frontend"
              title="Sales Market Wise"
            />
          </div>
          <div className="bg-slate-200  dark:bg-slate-800 rounded-lg">
            <SalesTreeMapChart
              url="/ValueCounts/valueCounts_region_Frontend"
              title="Sales Region Wise"
            />
          </div>
          <div className="bg-slate-200  dark:bg-slate-800 rounded-lg">
            <SalesBarChart
              url="/ValueCounts/valueCounts_subCategory_Frontend"
              title="Sales Sub Category wise"
            />
          </div>
          <div className="bg-slate-200  dark:bg-slate-800 rounded-lg">
            <SalesPieChart
              url="/ValueCounts/valueCounts_orderPriority_Frontend"
              chart_type="donut"
              title="Sales Order Priority Wise"
            />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Sales;
