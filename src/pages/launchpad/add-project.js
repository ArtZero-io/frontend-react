import React, { useEffect } from "react";
import Layout from "@components/Layout/Layout";
import AddNewProjectForm from "./component/Form/AddNewProject";

const AddProject = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <AddNewProjectForm />
    </Layout>
  );
};

export default AddProject;
