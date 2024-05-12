
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Forecast from '../../components/Charts/Forecast/forecast';



const Forecast_sales_and_profit = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Forecast" />

        <div className='grid grid-cols-1 md:grid-cols-1 gap-6 '>
          <div className="bg-slate-300  dark:bg-slate-800 rounded-lg"><Forecast api="http://127.0.0.1:8000/Forecast/GetForecastSales" yaxix="sales" /></div>
          <div className="bg-slate-300  dark:bg-slate-800 rounded-lg"><Forecast api="http://127.0.0.1:8000/Forecast/GetForecastProfit" yaxix="profit" /></div>
        </div>
      </DefaultLayout>
    </>
  );
}

export default Forecast_sales_and_profit;