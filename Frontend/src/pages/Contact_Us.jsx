import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DataTable from "./Data_Table";

export default function Contact() {
    const [result, setResult] = React.useState("");
  
    const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "87281f8e-d744-4f46-a5e2-13b5adcf1095");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    };
  
    return (
        <DefaultLayout>
        <Breadcrumb pageName="Contact Us" />
        <form onSubmit={onSubmit} className="space-y-8 mt-20">
            <div className="flex flex-row gap-6 ">
          <select name="title" required className="block w-full p-2 border border-gray-300 rounded">
            <option value="">Select Title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
          </select>
         
          <input type="text" name="first_name" required placeholder="First Name" className="block w-full p-2 border border-gray-300 rounded"/>
          <input type="text" name="last_name" required placeholder="Last Name" className="block w-full p-2 border border-gray-300 rounded"/>
          </div>
          <div className="flex flex-row gap-6  ">
          <input type="text" name="company_name" required placeholder="Company Name" className="block w-full p-2 border border-gray-300 rounded"/>
          <input type="text" name="role" required placeholder="Role in the Company" className="block w-full p-2 border border-gray-300 rounded"/>
          </div>
          <div className="flex flex-row gap-6 ">
          <input type="tel" name="contact_no1" required placeholder="Contact Number 01" className="block w-full p-2 border border-gray-300 rounded "/>
          <input type="tel" name="contact_no2" placeholder="Contact Number 02" className="block w-full p-2 border border-gray-300 rounded "/>
          </div>
          <input type="email" name="email" required placeholder="Email" className="block w-full p-2 border border-gray-300 rounded my-9"/>
          <textarea name="message" required placeholder="Message" className="block w-full p-2 border border-gray-300 rounded"></textarea>
  
          <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-900 text-white rounded text-lg">Submit Form</button>
  
        </form>
        <span className="block mt-4 text-center text-2xl text-slate-200">{result}</span>
     
        
  
        </DefaultLayout>
    );
}