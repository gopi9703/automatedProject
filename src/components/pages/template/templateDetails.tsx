import { ChangeEvent, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { useParams } from "react-router-dom";
import TemplateService from "../../services/template";
import { ITemplate } from "../../types/TemplateTypes";

const TemplateDetails: React.FC = () => {
  const [templateDetails, setTemplateDetails] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [filters, setFilters] = useState<any>();

  let params = useParams();

  useEffect(() => {
    setLoading(true);
    TemplateService.templeDetails(params.id)
      .then((response: any) => {
        setLoading(false);
        console.log(response.data);
        setTemplateDetails(response.data.questions);
      })
      .catch((e: Error) => {
        setLoading(false);
        console.log(e);
      });
    initFilters();
  }, [params.id]);

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
            icon="pi pi-ban"
            className="p-button-rounded p-button-danger p-button-outlined mx-3"
            onClick={() => {
              console.log(rowData);
            }}
          />
        </div>
      </>
    );
  };

  const renderId = (rowData: ITemplate) => {
    return <>{rowData.id}</>;
  };

  const renderQuestionText = (rowData: any) => {
    return <>{rowData.question.text}</>;
  };

  const renderQuestionDesc = (rowData: any) => {
    return <>{rowData.question.description}</>;
  };

  const renderQuestionType = (rowData: any) => {
    return <>{rowData.question.questionType.name}</>;
  };

  const renderDisplayOrder = (rowData: any) => {
    return <>{rowData.displayOrder}</>;
  };

  const renderResponse = (rowData: any) => {
    return (
      <>
        <div className="d-flex align-items-center">
          {rowData.isResponseRequired === true ? (
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

  const renderItemQuestion = (rowData: any) => {
    return (
      <>
        <div className="d-flex align-items-center">
          {rowData.isItemQuestion === true ? (
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

  const renderResponses = (rowData: any) => {
    return (
      <>
        <div className="flex flex-col items-center">
          {rowData.possibleResponses && rowData.possibleResponses.length > 0
            ? rowData.possibleResponses.map((item: any, i: any) => (
                <div key={i}>
                  <>
                    {item.possibleResponse.description === "Yes" ? (
                      <Button
                        label={`${item.displayOrder} - ${item.possibleResponse.description}`}
                        className="p-button-info p-button-outlined my-1"
                        style={{ padding: "5px 15px", margin: "2px 0" }}
                      />
                    ) : (
                      <Button
                        label={`${item.displayOrder} - ${item.possibleResponse.description}`}
                        className="p-button-danger p-button-outlined my-1 block"
                        style={{ padding: "5px 15px", margin: "2px 0" }}
                      />
                    )}
                  </>
                </div>
              ))
            : null}
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
          value={templateDetails}
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
          <Column body={renderId} header="id"></Column>
          <Column body={renderQuestionText} header="Question Text"></Column>
          <Column body={renderQuestionDesc} header="Description"></Column>
          <Column body={renderQuestionType} header="Question Type"></Column>
          <Column body={renderDisplayOrder} header="Display Order"></Column>
          <Column body={renderResponse} header="Required"></Column>
          <Column body={renderItemQuestion} header="Item Question"></Column>
          <Column body={renderResponses} header="Possible Responses"></Column>
          <Column body={renderActions} header="Actions"></Column>
        </DataTable>
      </div>
    </>
  );
};

export default TemplateDetails;
