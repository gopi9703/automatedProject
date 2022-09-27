import { ChangeEvent, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Dialog } from "primereact/dialog";
import IDivisionData from "../../../types/division";
import ResponseService from "../../../services/response";
import { IPossibleResponse } from "../../../types/AdministrationTypes";
import ResponseForm from "./Form";

const PossibleResponse: React.FC = () => {
  const [response, setResponse] = useState([]);
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
    ResponseService.getAll()
      .then((response: any) => {
        setLoading(false);
        setResponse(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
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
          label="Add"
          icon="pi pi-plus"
          className="p-button-success  p-button-outlined mr-2"
        />
      </div>
    );
  };

  const renderActions = (rowData: IDivisionData) => {
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

  const editRowData = (row: IDivisionData) => {
    setEditObj(row);
    setUserDialog(true);
    setDialogTitle("Edit Response");
    setFormType(0);
  };

  const addNewUser = () => {
    setDialogTitle("Add Response");
    setUserDialog(true);
    setEditObj({});
    setFormType(1);
  };

  const hideDialog = () => {
    setUserDialog(false);
  };

  const renderStatus = (rowData: IPossibleResponse) => {
    return (
      <>
        <div className="d-flex align-items-center">
          {rowData.isActive === true ? (
            <Button
              label="YES"
              className="p-button-success p-button-outlined"
              style={{ padding: "5px 15px" }}
            />
          ) : (
            <Button
              label="NO"
              className="p-button-warning p-button-outlined"
              style={{ padding: "5px 15px" }}
            />
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <DataTable
        className="shadow-md"
        scrollable
        scrollHeight="500px"
        value={response}
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
        <Column field="id" header="id"></Column>
        <Column field="text" header="Text"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="externalId" header="External Id"></Column>
        <Column header="Is Active" body={renderStatus}></Column>
        <Column body={renderActions} header="Actions"></Column>
      </DataTable>
      <Dialog
        visible={userDialog}
        style={{ width: "450px" }}
        header={dialogTitle}
        modal
        onHide={hideDialog}
      >
        <ResponseForm
          triggerDataReFetch={triggerDataReFetch}
          hideDialog={hideDialog}
          editObj={editObj}
          formType={formType}
        />
      </Dialog>
    </>
  );
};

export default PossibleResponse;
