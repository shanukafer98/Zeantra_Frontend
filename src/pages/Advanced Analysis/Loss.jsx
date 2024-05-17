import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Loss_horizontal_bar from "../../components/Charts/Loss/Loss_horizontal_bar";
import LossTreeMap from "../../components/Charts/Loss/Loss_tree_map";
import LossPieOrDonutChart from "../../components/Charts/Loss/Loss_pie_donut_chart";

const Loss = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Top 10 (Loss)" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="bg-slate-300  dark:bg-slate-800 rounded-lg">
            <Loss_horizontal_bar
              api={`${process.env.ENDPOINT}/Negative/best selling products`}
              xaxix="sales"
              yaxix="product_name"
              title="Top 10 negative selling products"
              horizontal="true"
            />
          </div>
          <div className="bg-slate-300  dark:bg-slate-800 rounded-lg">
            <Loss_horizontal_bar
              api={`${process.env.ENDPOINT}/Negative/product_with_average_sales`}
              xaxix="sales"
              yaxix="product_name"
              title="Top 10 negative average selling products"
              horizontal="true"
            />
          </div>
          <div className="bg-slate-300  dark:bg-slate-800 rounded-lg">
            <LossPieOrDonutChart
              api={`${process.env.ENDPOINT}/Negative/Negative order priprity with profit`}
              xaxix="order_priority"
              yaxix="profit"
              title="Loss in order priority wise"
              chart_type="donut"
            />
          </div>
          <div className="bg-slate-300  dark:bg-slate-800 rounded-lg">
            <LossTreeMap
              api={`${process.env.ENDPOINT}/Negative/Negative market with profit`}
              xaxix="market"
              yaxix="profit"
              title="Loss in market wise"
            />
          </div>
          <div className="bg-slate-300  dark:bg-slate-800 rounded-lg">
            <LossTreeMap
              api={`${process.env.ENDPOINT}/Negative/Negative region with profit`}
              xaxix="region"
              yaxix="profit"
              title="Loss in region wise"
            />
          </div>
          <div className="bg-slate-300  dark:bg-slate-800 rounded-lg">
            <LossPieOrDonutChart
              api={`${process.env.ENDPOINT}/Negative/Negative category with profit`}
              xaxix="category"
              yaxix="profit"
              title="Loss in product category wise"
              chart_type="pie"
            />
          </div>
          <div className="bg-slate-300  dark:bg-slate-800 rounded-lg">
            <LossPieOrDonutChart
              api={`${process.env.ENDPOINT}/Negative/Negative ship_mode with profit`}
              xaxix="ship_mode"
              yaxix="profit"
              title="Loss in ship mode wise"
              chart_type="pie"
            />
          </div>
          <div className="bg-slate-300  dark:bg-slate-800 rounded-lg">
            <Loss_horizontal_bar
              api={`${process.env.ENDPOINT}/Negative/Negative sub_category with profit`}
              xaxix="profit"
              yaxix="sub_category"
              title="Loss in product sub category wise"
              horizontal="true"
            />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Loss;
