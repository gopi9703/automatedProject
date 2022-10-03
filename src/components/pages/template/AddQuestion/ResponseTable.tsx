import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const PossibleResponseTable = ({ ...props }) => {
  const { responseData } = props;

  return (
    <>
      <div className="pt-5">
        <DataTable
          className="shadow-md"
          scrollable
          scrollHeight="400px"
          value={responseData}
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
          emptyMessage="No Response found."
        >
          <Column
            field="possibleResponseId"
            header="Possible Resonse ID"
          ></Column>
          <Column field="displayOrder" header="Display Order"></Column>
        </DataTable>
      </div>
    </>
  );
};

export default PossibleResponseTable;
