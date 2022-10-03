import { ChangeEvent, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import FileTypeService from "../../../services/fileType";

const FileType: React.FC = () => {
  const [fileType, setFileType] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [filters, setFilters] = useState<any>();

  useEffect(() => {
    setLoading(true);
    FileTypeService.getAll()
      .then((response: any) => {
        setLoading(false);
        setFileType(response.data);
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
      </div>
    );
  };

  return (
    <>
      <DataTable
        className="shadow-md"
        scrollable
        scrollHeight="400px"
        value={fileType}
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
      </DataTable>
    </>
  );
};

export default FileType;
