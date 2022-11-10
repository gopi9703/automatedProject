import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import BillingCodeService from "../../../services/billing.service";
import { IBilling } from "../../../types/AdministrationTypes";
import BillingCodeForm from "./Form";

const BillingCode: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [billingData, setBillingData] = useState([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [userDialog, setUserDialog] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [fetchData, setFetchData] = useState<boolean>(true);
  const [editObj, setEditObj] = useState({});
  const [formType, setFormType] = useState<number>(0);
  const [lazyParams, setLazyParams] = useState({
    first: 1,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
  });

  useEffect(() => {
    loadLazyData();
  }, [lazyParams, fetchData]);

  const triggerDataReFetch = () => setFetchData((t) => !t);

  const handlingParams = (data: any) => {
    return Object.keys(data)
      .map(
        (key) =>
          `${key}=${encodeURIComponent(
            data[key] === undefined ? null : data[key]
          )}`
      )
      .join("&");
  };

  const loadLazyData = () => {
    setLoading(true);
    BillingCodeService.getAll(
      handlingParams({
        PageNumber: lazyParams.page,
        PageSize: lazyParams.rows,
      })
    )
      .then((response: any) => {
        setLoading(false);
        setBillingData(response.data);
        const getHeaders = response.headers["x-pagination"];
        const parsedHeaders = JSON.parse(getHeaders);
        setTotalRecords(parsedHeaders.TotalCount);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const onPage = (event: any) => {
    event["first"] = 0;
    event["page"] = event.page + 1;
    setLazyParams(event);
  };

  const onSort = (event: any) => {
    setLazyParams(event);
    console.log(event);
  };

  const renderFilter = () => {
    return (
      <div className="flex flex-row flex-row-reverse justify-between">
        <Button
          label="Add New"
          icon="pi pi-plus"
          className="p-button-success  p-button-outlined mr-2"
          onClick={addNewUser}
        />
      </div>
    );
  };

  const renderActions = (rowData: IBilling) => {
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

  const editRowData = (row: IBilling) => {
    setEditObj(row);
    setUserDialog(true);
    setDialogTitle("Edit Billing Code");
    setFormType(0);
  };

  const addNewUser = () => {
    setDialogTitle("Add Billing Code");
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
        value={billingData}
        loading={loading}
        stripedRows
        lazy={true}
        paginator={true}
        filterDisplay="menu"
        responsiveLayout="scroll"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        dataKey="id"
        rowsPerPageOptions={[10, 20, 50]}
        emptyMessage="No Billing Codes found."
        header={renderFilter}
        totalRecords={totalRecords}
        rows={lazyParams.rows}
        onPage={onPage}
        onSort={onSort}
        sortOrder={lazyParams.sortOrder}
      >
        <Column field="name" header="Name"></Column>
        <Column field="code" header="Code"></Column>
        <Column field="description" header="Description"></Column>
        <Column body={renderActions} header="Actions"></Column>
      </DataTable>
      <Dialog
        visible={userDialog}
        style={{ width: "450px" }}
        header={dialogTitle}
        modal
        onHide={hideDialog}
      >
        <BillingCodeForm
          triggerDataReFetch={triggerDataReFetch}
          hideDialog={hideDialog}
          editObj={editObj}
          formType={formType}
        />
      </Dialog>
    </>
  );
};

export default BillingCode;
