
import DefaultLayout from '../../layout/DefaultLayout';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SalesPieChart from '../../components/Charts/Sales_Charts/Sales_Pie_Chart';
import SalesTreeMapChart from '../../components/Charts/Sales_Charts/Sales_Treemap_Chart';
import SalesBarChart from '../../components/Charts/Sales_Charts/Sales_Bar_Chart';



const Sales = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Sales" />
      
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 '>
          {/* <div className = "bg-slate-200 dark:bg-slate-800 rounded-lg"><Pie_Bar_Dognut  url = 'http://127.0.0.1:8000/ValueCounts/valueCounts_segment_Frontend' xaxix = 'Segment Type' yaxix = 'count' title = 'Segment Wise' /></div> */}
          <div className = "bg-slate-200  dark:bg-slate-800 rounded-lg"><SalesPieChart  url = 'http://127.0.0.1:8000/ValueCounts/valueCounts_shipMode_Frontend' chart_type = "pie" title = 'Sales Shipmode Wise' /></div>
          <div className = "bg-slate-200  dark:bg-slate-800 rounded-lg"><SalesPieChart  url = 'http://127.0.0.1:8000/ValueCounts/valueCounts_segment_Frontend' chart_type = "donut" title = 'Sales Segment Wise' /></div>
        <div className = "bg-slate-200  dark:bg-slate-800 rounded-lg"><SalesTreeMapChart url = 'http://127.0.0.1:8000/ValueCounts/valueCounts_market_Frontend' title = 'Sales Market Wise'/></div> 
        <div className = "bg-slate-200  dark:bg-slate-800 rounded-lg"><SalesTreeMapChart url = 'http://127.0.0.1:8000/ValueCounts/valueCounts_region_Frontend' title = 'Sales Region Wise'/></div> 
        <div className = "bg-slate-200  dark:bg-slate-800 rounded-lg"><SalesBarChart url = 'http://127.0.0.1:8000/ValueCounts/valueCounts_subCategory_Frontend' title = 'Sales Sub Category wise'/></div> 
        <div className = "bg-slate-200  dark:bg-slate-800 rounded-lg"><SalesPieChart  url = 'http://127.0.0.1:8000/ValueCounts/valueCounts_orderPriority_Frontend' chart_type = "donut" title = 'Sales Order Priority Wise' /></div>
          {/* <div className = "bg-slate-200  dark:bg-slate-800 rounded-lg"><Pie_Bar_Dognut  url = 'http://127.0.0.1:8000/ValueCounts/valueCounts_market_Frontend' xaxix = 'Market' yaxix = 'count' title = 'Market Wise' /></div>
          <div className = "bg-slate-200  dark:bg-slate-800 rounded-lg"><Pie_Bar_Dognut  url = 'http://127.0.0.1:8000/ValueCounts/valueCounts_category_Frontend' xaxix = 'Product Category' yaxix = 'count' title = 'Product Category Wise' /></div>
          <div className = "bg-slate-200  dark:bg-slate-800 rounded-lg"><Pie_Bar_Dognut  url = 'http://127.0.0.1:8000/ValueCounts/valueCounts_orderPriority_Frontend' xaxix = 'Order Priority' yaxix = 'count' title = 'Order Priority' /></div> 
          <div className = "bg-slate-200  dark:bg-slate-800 rounded-lg"><PieChart/></div> */}
        </div>
        

      </DefaultLayout>
    </>
  );
}

export default Sales;