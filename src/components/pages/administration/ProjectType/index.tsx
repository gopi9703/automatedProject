import { ChangeEvent, useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import ProjectService from "../../../services/projectTypes";
import Loader from "../../../Utils/Loader";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

const ProjectType: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [filters, setFilters] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [projectList, setProjectList] = useState([]);
  const [projectTable, setProjectTable] = useState([]);

  useEffect(() => {
    setLoader(true);
    ProjectService.getAll()
      .then((response: any) => {
        let projectArray: any = [];
        response.data.forEach((element: { name: string; id: string }) => {
          projectArray.push({
            name: element.name,
            code: element.id,
          });
        });
        setProjectList(projectArray);
        setLoader(false);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    initFilters();
  }, []);

  const onhandleChange = (e: any) => {
    console.log(e.value);
    setSelectedValue(e.value);
    setLoading(true);
    ProjectService.projectTypes(e.value.code)
      .then((response: any) => {
        setLoading(false);
        //setShowTable(true);
        console.log(response.data.importFileColumns);
        setProjectTable(response.data.importFileColumns);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

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
      {loader ? <Loader /> : null}
      <div>
        <Dropdown
          value={selectedValue}
          options={projectList}
          onChange={onhandleChange}
          optionLabel="name"
          placeholder="Select Project"
          dataKey="id"
          className="w-48"
        />
      </div>

      <div className="my-5">
        <DataTable
          className="shadow-md"
          scrollable
          scrollHeight="500px"
          value={projectTable}
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
          emptyMessage="No Projects found."
          filters={filters}
          header={renderFilter}
        >
          <Column field="id" header="id"></Column>
          <Column field="importFileColumn.name" header="Name"></Column>
          <Column field="code" header="Code"></Column>
          <Column
            field="importFileColumn.description"
            header="Description"
          ></Column>
          <Column field="headerName" header="Header Name"></Column>
          <Column field="columnOrder" header="Column Order"></Column>
        </DataTable>
      </div>
    </>
  );
};

export default ProjectType;
