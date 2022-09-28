import { ChangeEvent, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Dialog } from "primereact/dialog";
import TemplateService from "../../services/template";
import { ITemplate } from "../../types/TemplateTypes";
import { useNavigate } from "react-router-dom";
import AddTemplate from "./addTemplate";

const Template: React.FC = () => {
  const [templates, setTemplates] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [filters, setFilters] = useState<any>();
  const [userDialog, setUserDialog] = useState<boolean>(false);

  let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    TemplateService.getAll()
      .then((response: any) => {
        setTemplates(response.data);
        setLoading(false);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    initFilters();
  }, []);

  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue("");
  };

  const addNewUser = () => {
    setUserDialog(true);
  };
  const hideDialog = () => {
    setUserDialog(false);
  };

  const renderFilter = () => {
    return (
      <div className="flex flex-row justify-between">
        <div>
          <span className="p-input-icon-left mx-3">
            <i className="pi pi-search" />
            <InputText
              placeholder="Keyword Search"
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
            />
          </span>
        </div>
        <Button
          onClick={addNewUser}
          label="Add New"
          icon="pi pi-plus"
          className="p-button-success  p-button-outlined mr-2"
        />
      </div>
    );
  };

  const renderActions = (rowData: ITemplate) => {
    return (
      <>
        <div className="d-flex align-items-center">
          <Button
            icon="pi pi-user-edit"
            className="p-button-rounded p-button-info p-button-outlined"
            onClick={() => {
              navigate(`/template/${rowData.id}`, { state: rowData.id });
            }}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col w-full p-4">
        <DataTable
          className="shadow-md"
          scrollable
          scrollHeight="500px"
          value={templates}
          loading={loading}
          stripedRows
          paginator
          filterDisplay="menu"
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          dataKey="id"
          rowsPerPageOptions={[10, 20, 50]}
          globalFilterFields={["name", "contactName", "address"]}
          emptyMessage="No Templates found."
          filters={filters}
          header={renderFilter}
        >
          <Column field="id" header="id"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="externalId" header="External Id"></Column>
          <Column field="description" header="Description"></Column>
          <Column body={renderActions} header="Actions"></Column>
        </DataTable>
      </div>
      <Dialog
        visible={userDialog}
        style={{ width: "450px" }}
        header="Add Question"
        modal
        onHide={hideDialog}
      >
        <AddTemplate hideDialog={hideDialog} />
      </Dialog>
    </>
  );
};

export default Template;
