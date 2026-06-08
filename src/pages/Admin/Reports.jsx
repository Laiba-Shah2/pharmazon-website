import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/report.css";

function Reports() {
  const [reportType, setReportType] = useState("stock");
  const [categories, setCategories] = useState([]);
  const [medicines, setMedicines] = useState([])
  const [reportCategory, setReportCategory] = useState("")
  const [reportStatus, setReportStatus] = useState("")
  const [stockFilters, setStockFilters] = useState({
    category: "",
    status: "",
  });
  const [salesFilters, setSalesFilters] = useState({
    start_date: "",
    end_date: "",
    medicine_name: "",
  });
  const [reportData, setReportData] = useState([]);



  
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost/online-pharmacy/backend/public/index.php?action=api/getCategory")
        if (response.data.status == true || response.data.status == "success") {
          setCategories(response.data.data);
          console.log("Fetched Categories:", response.data.data);

        } else {
          alert("Failed to fetch categories");
        }

      }
      catch (error) {
        alert("Error fetching categories", error);
        console.log(error)

      }

    }


    const fetchMedicines = async () => {
      try {
        const response = await axios.get("http://localhost/online-pharmacy/backend/public/index.php?action=api/getMedicines")

        if (response.data.status == true || response.data.status == "success") {
          setMedicines(response.data.data)
          console.log(response.data)

        }
        else {
          alert('Failed to fetch Medicines')
          console.log(response.data)
        }

      }
      catch (error) {
        alert(`Error fetching medicines ${error}`);
        console.error(error);
      }
    }



  // Handle report type change
  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
    setReportData([]); // clear previous results
  };

  // Handle filter changes
  const handleStockChange = (e) => {
    setStockFilters({ ...stockFilters, [e.target.name]: e.target.value });
  };

  const handleSalesChange = (e) => {
    setSalesFilters({ ...salesFilters, [e.target.name]: e.target.value });
  };

  // Mock generate report function
  const generateReport = async () => {
    try {

      if (reportType === "stock") {

        if (!stockFilters.category) {
          alert("Please select a category");
          setReportData([]);
          return;
        }

        const response = await axios.post(
          "http://localhost/online-pharmacy/backend/public/index.php?action=api/stockReport",
          { ...stockFilters }
        );

        if (response.data.status === true || response.data.status === "success") {
          setReportData(Array.isArray(response.data.report_data) ? response.data.report_data : []);
          console.log("Stock Report Data:", response.data);
        } else {
          setReportData([]);
          alert(response.data.message);
        }

      } else {

        const response = await axios.post(
          "http://localhost/online-pharmacy/backend/public/index.php?action=api/salesReport",
          { ...salesFilters }
        );

        if (response.data.status === true || response.data.status === "success") {
          setReportData(Array.isArray(response.data.report_data) ? response.data.report_data : []);
          console.log(response.data)

        } else {
          setReportData([]);
          alert(response.data);
          console.log(response.data)
        }
      }

    } catch (error) {
      console.error(error);
      setReportData([]);
      alert("Error generating report");
    }
  };


  useEffect(() => {

    fetchCategories();
    fetchMedicines();
  }, []);


  return (
    <div className="reports-container">
      <h2>Reports</h2>

      {/* Report Type Selector */}
      <div className="report-type-selector">
        <label>Select Report Type:</label>
        <select value={reportType} onChange={handleReportTypeChange}>
          <option value="stock">Stock Report</option>
          <option value="sales">Sales Report</option>
        </select>
      </div>

      {/* Filters Panel */}
      <div className="filters-panel">
        {reportType === "stock" ? (
          <>

            <select name="category" value={stockFilters.category} className="stock-report-category" onChange={handleStockChange}>
              <option value="">Select Category name</option>
              {
                categories.map((category) => (

                  <option id={category.id} value={category.name}>{category.name}</option>

                ))
              }
            </select>
            <select
              name="status"
              value={stockFilters.status}
              onChange={handleStockChange}
              className="stock-report-select"

            >
              <option value="">Select Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Expired">Expired</option>

            </select>
          </>
        ) : (
          <>
            <input
              type="date"
              name="start_date"
              value={salesFilters.start_date}
              onChange={handleSalesChange}
            />
            <input
              type="date"
              name="end_date"
              value={salesFilters.end_date}
              onChange={handleSalesChange}
            />


            <select name="medicine_name" value={salesFilters.medicine_name} className="sales-report-select" onChange={handleSalesChange}>

              <option value="">Select Medicine</option>
              {medicines.map((med)=>(

                <option key={med.id}  >{med.name}</option>
              ))

              }
            </select>
          </>
        )}
      </div>

      <button className="generate-btn" onClick={generateReport}>
        Generate Report
      </button>

      {/* Report Table */}
      <div className="table-wrapper">
        {reportData.length === 0 ? (
          <p className="no-data">No data to display</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                {reportType === "stock" ? (
                  <>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Stock Quantity</th>
                  </>
                ) : (
                  <>
                    <th>Sold Quantity</th>
                    <th>Total Sales</th>
                    <th>Sale Date</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {reportData.map((item) => (
                <tr key={item.id}>
                  <td>{item.order_id}</td>
                  <td>{item.medicine_name}</td>
                  {reportType === "stock" ? (
                    <>
                      <td>{item.category_name}</td>
                      <td>{item.status}</td>
                      <td>{item.stock_quantity}</td>
                    </>
                  ) : (
                    <>
                      <td>{item.quantity}</td>
                      <td>${item.total_amount}</td>
                      <td> {new Date(item.date).toLocaleDateString()}</td>
                    </>
                  )}
                </tr>
              ))}
              <tr><p><span style={{fontWeight : 700}}>Total sales: </span> Rs. {reportData.reduce(
    (sum, item) => sum + Number(item.total_amount),0)}</p> 
</tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Reports;
