import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Feedback from "./pages/PromotionManagement/Feedback";
import FeedbackSubmitForm from "./pages/PromotionManagement/FeedbackSubmitForm";
import FeedbackManagement from "./pages/PromotionManagement/FeedbackManagement";
import AdminDashboard from "./pages/AdminDashboard";
import PromotionManagement from "./pages/PromotionManagement/PromotionManagement";
import PromotionCreateForm from "./pages/PromotionManagement/PromotionCreateForm";
import PromotionUpdateForm from "./pages/PromotionManagement/PromotionUpdateForm";
import PromotionPage from "./pages/PromotionManagement/PromotionPage";
import SupplyManagement from "./pages/SupplierManagement/SupplyManagement";
import SupplierCreateForm from "./pages/SupplierManagement/SupplierCreateForm";
import SupplierUpdateForm from "./pages/SupplierManagement/SupplierUpdateForm";
import Orders from "./pages/SupplierManagement/Orders";
import PrescriptionForm from "./pages/PrescriptionManagement/PrescriptionForm";
import PrescriptionManagement from "./pages/PrescriptionManagement/PrescriptionManagement";
import PrescriptionAssignForm from "./pages/PrescriptionManagement/PrescriptionAssignForm";
import PrescriptionCreateForm from "./pages/PrescriptionManagement/PrescriptionCreateForm";
import PrescriptionViewDetails from "./pages/PrescriptionManagement/PrescriptionViewDetails";
import PrescriptionUpdateForm from "./pages/PrescriptionManagement/PrescriptionUpdateForm";
import PrescriptionAssignTable from "./pages/PrescriptionManagement/PrescriptionAssignTable";
import PrescriptionAssignPage from "./pages/PrescriptionManagement/PrescriptionAssignPage";
import InventoryManagement from "./pages/InventtoryManagement/InventoryManagement";
import InventoryItemCreateForm from "./pages/InventtoryManagement/InventoryItemCreateForm";
import InventoryUpdateForm from "./pages/InventtoryManagement/InventoryUpdateForm";
import SupplyRequestForm from "./pages/InventtoryManagement/SupplyRequestForm";
import InventoryUserPageView from "./pages/InventtoryManagement/InventoryUserPageView";
import DeliveryManagement from "./pages/DeliveryManagement/DeliveryManagement";
import DeliveryTaskManagement from "./pages/DeliveryManagement/DeliveryTaskManagement";
import DriverCreateForm from "./pages/DeliveryManagement/DriverCreateForm";
import DeliveryTaskcreateForm from "./pages/DeliveryManagement/DeliveryTaskcreateForm";
import DeliveryTaskUpdateForm from "./pages/DeliveryManagement/DeliveryTaskUpdateForm";
import DriverManagement from "./pages/DeliveryManagement/DriverManagement";
import DriverUpdateForm from "./pages/DeliveryManagement/DriverUpdateForm";
import DriverTable from "./pages/DeliveryManagement/DriverTable";
import DriverSignIn from "./pages/DeliveryManagement/DriverSignIn";
import DriverProfile from "./pages/DeliveryManagement/DriverProfile";
import DriverTask from "./pages/DeliveryManagement/DriverTask";
import Usertable from "./pages/UserManagement/Usertable";
import UserManagement from "./pages/UserManagement/UserManagement";
import SignIn from "./pages/UserManagement/SignIn";
import SignUp from "./pages/UserManagement/SignUp";
import UserPaymentDetails from "./pages/UserManagement/UserPaymentDetails";
import OrderHistory from "./pages/UserManagement/OrderHistory";
import Profile from "./pages/UserManagement/Profile";
import PrivateRoute from "./components/PrivateRoute";
import EmployeeManagement from "./pages/EmpManagement/EmployeeManagement";
import EmployeeCreateForm from "./pages/EmpManagement/EmployeeCreateForm";
import EmployeeUpdateForm from "./pages/EmpManagement/EmployeeUpdateForm";
import EmplyeeLoginForm from "./pages/EmpManagement/EmplyeeLoginForm";
import EmployeeLeaveManagement from "./pages/EmpManagement/EmployeeLeaveManagement";
import EmployeeLeaveCreateForm from "./pages/EmpManagement/EmployeeLeaveCreateForm";
import EmployeeLeaveUpdateForm from "./pages/EmpManagement/EmployeeLeaveUpdateForm";
import EmployeeSalaryManagement from "./pages/EmpManagement/EmployeeSalaryManagement";
import EmployeeSalaryCreateForm from "./pages/EmpManagement/EmployeeSalaryCreateForm";
import EmployeeSalaryUpdateForm from "./pages/EmpManagement/EmployeeSalaryUpdateForm";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedback-submit" element={<FeedbackSubmitForm />} />
        <Route path="/feedback-management" element={<FeedbackManagement />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/promotion-management" element={<PromotionManagement />} />
        <Route path="/create-promotion" element={<PromotionCreateForm />} />
        <Route path="/update-promotion/:id" element={<PromotionUpdateForm />} />
        <Route path="/promotions" element={<PromotionPage />} />

        <Route path="/supplier-management" element={<SupplyManagement />} />
        <Route path="/create-supplier" element={<SupplierCreateForm />} />
        <Route path="/update-supplier/:id" element={<SupplierUpdateForm />} />
        <Route path="/orders" element={<Orders />} />

        <Route
          path="/create-prescription"
          element={<PrescriptionCreateForm />}
        />
        <Route
          path="/prescription-management"
          element={<PrescriptionManagement />}
        />
        <Route
          path="/prescription-assign"
          element={<PrescriptionAssignPage />}
        />
        <Route
          path="/prescription-assigntable/:id"
          element={<PrescriptionAssignTable />}
        />
        <Route
          path="/update-prescription/:id"
          element={<PrescriptionUpdateForm />}
        />
        <Route
          path="/prescription-assignform/:id"
          element={<PrescriptionAssignForm />}
        />
        <Route
          path="/prescription-view-details/:id"
          element={<PrescriptionViewDetails />}
        />
        <Route path="/prescriptionform" element={<PrescriptionForm />} />

        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path="/create-inventory" element={<InventoryItemCreateForm />} />
        <Route path="/update-inventory/:id" element={<InventoryUpdateForm />} />
        <Route path="/supply-request" element={<SupplyRequestForm />} />
        <Route path="/inventory-user" element={<InventoryUserPageView />} />

        <Route path="/delivery-management" element={<DeliveryManagement />} />
        <Route path="/taskpage" element={<DeliveryTaskManagement />} />
        <Route path="/create-task" element={<DeliveryTaskcreateForm />} />
        <Route path="/update-task/:id" element={<DeliveryTaskUpdateForm />} />
        <Route path="/driver-management" element={<DriverManagement />} />
        <Route path="/driver-create" element={<DriverCreateForm />} />
        <Route path="/driver-update/:id" element={<DriverUpdateForm />} />
        <Route path="/drivers" element={<DriverTable />} />
        <Route path="/driver-signin" element={<DriverSignIn />} />
        <Route path="/driver-profile" element={<DriverProfile />} />
        <Route path="/driver-task" element={<DriverTask />} />

        <Route path="/user-table" element={<Usertable />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user-payment" element={<UserPaymentDetails />} />
        <Route path="/order-history" element={<OrderHistory />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile/:id" element={<Profile />} />
        </Route>

        <Route path="/employee-management" element={<EmployeeManagement />} />
        <Route path="/create-employee" element={<EmployeeCreateForm />} />
        <Route path="/update-employee/:id" element={<EmployeeUpdateForm />} />
        <Route path="/employee-sign-in" element={<EmplyeeLoginForm />} />
        <Route
          path="/employee-leave-management"
          element={<EmployeeLeaveManagement />}
        />
        <Route
          path="/create-leave-employee"
          element={<EmployeeLeaveCreateForm />}
        />
        <Route
          path="/update-leave-employee/:id"
          element={<EmployeeLeaveUpdateForm />}
        />
        <Route
          path="/employee-salary-management"
          element={<EmployeeSalaryManagement />}
        />employeeData
        <Route
          path="/create-salary-employee"
          element={<EmployeeSalaryCreateForm />}
        />
        <Route
          path="/update-salary-employee/:id"
          element={<EmployeeSalaryUpdateForm />}
        />
      </Routes>
    </>
  );
};

export default App;
