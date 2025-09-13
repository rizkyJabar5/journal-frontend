import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "@/component/PrivateRoute";
import { strings } from "@/res";
import Loading from "@/component/shared-components/Loading";

// Pages
import { DefaultDashboard as DASHBOARD } from "./dashboard/Dashboard";
import { AllProduct as PRODUCTS } from "./product/AllProduct";
import { Order as ORDERS } from "./order/AllOrders";
import { AllCustomer as CUSTOMERS } from "./customer/AllCustomers";
import { AllSupplier as SUPPLIERS } from "./supplier/AllSupplier";
import { AllPurchase as PURCHASE } from "./purchase/AllPurchase";
import { AllExpense as EXPENSES } from "./expense/AllExpense";
import { AllReport as REPORTS } from "./report/AllReport";
import { AllCategory as CATEGORIES } from "./category/AllCategory";
import { SettingView as SETTINGS } from "./settings/SettingView";
import { AllUser as USERS } from "./user/AllUser";

import DetailReport from "./report/DetailReport";
import DetailSupplier from "./supplier/DetailSupplier";
import DetailOrder from "./order/DetailOrder";
import DetailProduct from "./product/DetailProduct";
import DetailCustomer from "./customer/DetailCustomer";
import DetailUser from "./user/DetailUser";
import Invoice from "./order/Invoice";
import DetailCategory from "./category/DetailCategory";
import DetailPurchase from "./purchase/DetailPurchase";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Routes>
        {/* Private routes wrapper */}
        <Route element={<PrivateRoute />}>
          <Route path={strings.navigation.path.dashboard} element={<DASHBOARD />} />
          <Route path={strings.navigation.path.products} element={<PRODUCTS />} />
          <Route path={strings.navigation.path.orders} element={<ORDERS />} />
          <Route path={strings.navigation.path.categories} element={<CATEGORIES />} />
          <Route path={strings.navigation.path.expenses} element={<EXPENSES />} />
          <Route path={strings.navigation.path.reports} element={<REPORTS />} />
          <Route path={strings.navigation.path.customers} element={<CUSTOMERS />} />
          <Route path={strings.navigation.path.purchase} element={<PURCHASE />} />
          <Route path={strings.navigation.path.suppliers} element={<SUPPLIERS />} />
          <Route path={strings.navigation.path.users} element={<USERS />} />
          <Route path={strings.navigation.path.settings} element={<SETTINGS />} />

          {/* Detail routes */}
          <Route path={strings.navigation.path.detail_reports} element={<DetailReport />} />
          <Route path={strings.navigation.path.detail_suppliers} element={<DetailSupplier />} />
          <Route path={strings.navigation.path.detail_orders} element={<DetailOrder />} />
          <Route path={strings.navigation.path.detail_products} element={<DetailProduct />} />
          <Route path={strings.navigation.path.detail_customers} element={<DetailCustomer />} />
          <Route path={strings.navigation.path.detail_users} element={<DetailUser />} />
          <Route path={strings.navigation.path.detail_categories} element={<DetailCategory />} />
          <Route path={strings.navigation.path.detail_purchase} element={<DetailPurchase />} />

          {/* Invoice */}
          <Route path={strings.navigation.path.invoice} element={<Invoice />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to={strings.navigation.path.dashboard} replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppViews;
