import { ChangeEvent, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Dialog } from "primereact/dialog";
import RoleService from "../../../services/externalRoles";

import RoleForm from "./Form";
import { IExternalRoles } from "../../../types/AdministrationTypes";

const Role: React.FC = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchData, setFetchData] = useState<boolean>(true);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [filters, setFilters] = useState<any>();
  const [userDialog, setUserDialog] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [editObj, setEditObj] = useState({});
  const [formType, setFormType] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    RoleService.getAll()
      .then((response: any) => {
        setLoading(false);
        setRoles(response.data);
      })
      .catch((e: Error) => {
        setLoading(false);
      });
    initFilters();
  }, [fetchData]);

  const triggerDataReFetch = () => setFetchData((t) => !t);

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

  const renderActions = (rowData: IExternalRoles) => {
    return (
      <>
        <div className="d-flex align-items-center">
          <Button
            icon="pi pi-user-edit"
            className="p-button-rounded p-button-info p-button-outlined"
            onClick={() => editRowData(rowData)}
          />
        </div>
      </>
    );
  };

  const editRowData = (row: IExternalRoles) => {
    setEditObj(row);
    setUserDialog(true);
    setDialogTitle("Edit Roles");
    setFormType(0);
    console.log(row);
  };

  const addNewUser = () => {
    setDialogTitle("Add Roles");
    setUserDialog(true);
    setEditObj({});
    setFormType(1);
  };

  const hideDialog = () => {
    setUserDialog(false);
  };

  return (
    <>
      <DataTable
        className="shadow-md"
        scrollable
        scrollHeight="400px"
        value={roles}
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
        emptyMessage="No Divisons found."
        filters={filters}
        header={renderFilter}
      >
        <Column field="name" header="Name"></Column>
        <Column field="code" header="Code"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="externalSystem.id" header="External System ID"></Column>
        <Column
          field="externalSystem.description"
          header="External System Desc"
        ></Column>
        <Column
          field="externalSystem.name"
          header="External System Name"
        ></Column>
        <Column body={renderActions} header="Actions"></Column>
      </DataTable>
      <Dialog
        visible={userDialog}
        style={{ width: "450px" }}
        header={dialogTitle}
        modal
        onHide={hideDialog}
      >
        <RoleForm
          triggerDataReFetch={triggerDataReFetch}
          hideDialog={hideDialog}
          editObj={editObj}
          formType={formType}
        />
      </Dialog>
    </>
  );
};

export default Role;
