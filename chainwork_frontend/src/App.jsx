import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./Layouts/MainLayout";
import { Home } from "./Pages/Home";
import { Tasks } from "./Pages/Tasks";
import { SubmitTask } from "./Pages/SubmitTask";
import { ReviewSubmission } from "./Pages/ReviewSubmission";
import  {CreateTask}  from "./Pages/CreateTask";
import {Profile}  from "./Pages/Profile";
import Services  from "./Pages/Services";
import { PaymentProvider } from "./Context/PaymentContext";
// import { GigDetails } from "./Pages/GigDetails";
// import {GigCard} from "./components/GigCard";

function App() {
  return (
    <PaymentProvider>
      <Router>
        <MainLayout className="dark:bg-slate-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/submit-task" element={<SubmitTask />} />
            <Route
              path="/review-submission/:id"
              element={<ReviewSubmission />}
            />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/services" element={<Services />} />
            {/* <Route path="/gigcard" element={<GigCard />} /> */}
          </Routes>
        </MainLayout>
      </Router>
    </PaymentProvider>
  );
}

export default App;
