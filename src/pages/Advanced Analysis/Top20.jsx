
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Top_20 from '../../components/Charts/Top20/top20';
import DataTable from './Database';





const Top20 = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Top 20" />
      
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 '>

     

         <div className = "bg-slate-300  dark:bg-slate-800 rounded-lg"><Top_20 api = "/Top20s/product with the most sales" title = "Top 10 Products with most sales"  xaxix = 'product_name'/></div>
         <div className = "bg-slate-300  dark:bg-slate-800 rounded-lg"><Top_20 api = "/Top20s/product with average sales" title = "Top 10 Products with average sales" xaxix = 'product_name' /></div>
         <div className = "bg-slate-300  dark:bg-slate-800 rounded-lg"><Top_20 api = "/Top20s/countries with the most sales" title = "Top 10 Countries with most sales" xaxix = 'country' /></div>
         <div className = "bg-slate-300  dark:bg-slate-800 rounded-lg"><Top_20 api = "/Top20s/countries with average sales" title = "Top 10 Countries with average sales" xaxix = 'country' /></div>
      
           </div>

      </DefaultLayout>
    </>
  );
}

export default Top20;