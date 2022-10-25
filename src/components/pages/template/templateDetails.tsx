import { ChangeEvent, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Link, useParams } from "react-router-dom";
import TemplateService from "../../services/template";
import { IAddQuestion } from "../../types/TemplateTypes";
import { useNavigate } from "react-router-dom";
import { setToaster } from "../../Utils/toastStore";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import TemplateReponseModal from "./templateResponse";
import styles from "./template.module.css";
import { Dialog } from "primereact/dialog";

const TemplateDetails: React.FC = () => {
  const [templateDetails, setTemplateDetails] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [filters, setFilters] = useState<any>();
  const [templateName, setTemplateName] = useState<string>("");
  const [templateDesc, setTemplateDesc] = useState<string>("");
  const [fetchData, setFetchData] = useState<boolean>(true);
  const [userDialog, setUserDialog] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [responseType, setResponseType] = useState<number>(1);
  const [editObj, setEditObj] = useState({});
  const [editResObj, setEditResObj] = useState({});

  let params = useParams();
  let navigate = useNavigate();
  const triggerDataReFetch = () => setFetchData((t) => !t);

  useEffect(() => {
    setLoading(true);
    TemplateService.templeDetails(params.id)
      .then((response: any) => {
        setLoading(false);
        setTemplateName(response.data.name);
        setTemplateDesc(response.data.description);
        setTemplateDetails(response.data.questions);
      })
      .catch((e: Error) => {
        setLoading(false);
        console.log(e);
      });
    initFilters();
  }, [params.id, fetchData]);

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
          onClick={() => {
            navigate(`/template/add`, { state: params });
          }}
        />
      </div>
    );
  };

  const deleteQuestionDialog = (row: IAddQuestion) => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        deleteQuestion(row);
      },
    });
  };

  const deleteResponseDialog = (row: IAddQuestion, editRes: any) => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        console.log(row);
        deletePossibleResponse(row, editRes);
      },
    });
  };

  const deletePossibleResponse = (row: any, editRes: any) => {
    TemplateService.deletePossibleResponse(
      row?.id,
      editRes?.possibleResponse.id
    ).then(
      (response: any) => {
        setLoading(false);
        triggerDataReFetch();
        setToaster({
          severity: "info",
          summary: "Niruthi Staff",
          detail: `Response deleted successfully!`,
        });
      },
      (e: Error) => {
        setLoading(false);
        setToaster({
          severity: "error",
          summary: "Error Message",
          detail: "Some thing went wrong, please try again",
        });
      }
    );
  };

  const deleteQuestion = (row: IAddQuestion) => {
    setLoading(true);
    TemplateService.deleteTemplateQuestion(row?.id, params?.id).then(
      (response: any) => {
        setLoading(false);
        triggerDataReFetch();
        setToaster({
          severity: "info",
          summary: "Niruthi Staff",
          detail: `${row?.question?.questionType?.name} deleted successfully!`,
        });
      },
      (e: Error) => {
        setLoading(false);
        setToaster({
          severity: "error",
          summary: "Error Message",
          detail: "Some thing went wrong, please try again",
        });
      }
    );
  };

  const renderActions = (rowData: any) => {
    return (
      <>
        <Button
          icon="pi pi-plus"
          className="p-button-rounded p-button-success p-button-outlined w-full"
          onClick={() => {
            console.log(rowData);
            showResponseModal(rowData);
          }}
        />
        <div className="mx-2"></div>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-outlined w-full"
          onClick={() => {
            deleteQuestionDialog(rowData);
          }}
        />
      </>
    );
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
        <div className="flex flex-row items-center w-full justify-center">
          <div className="flex flex-col items-center">
            {rowData.possibleResponses && rowData.possibleResponses.length > 0
              ? rowData.possibleResponses.map((item: any, i: any) => (
                  <>
                    <div
                      key={i}
                      className={`${styles.response_btn_view} flex flex-row items-center`}
                    >
                      <label>{`${item.displayOrder} - ${item.possibleResponse.text}`}</label>
                      <i
                        className="pi pi-pencil mx-2"
                        onClick={() => {
                          console.log(item);
                          editResponseModal(rowData, item);
                        }}
                      ></i>
                      <i
                        className="pi pi-times"
                        onClick={() => deleteResponseDialog(rowData, item)}
                      ></i>
                    </div>
                  </>
                ))
              : null}
          </div>
        </div>
      </>
    );
  };

  const renderBreadCrum = () => {
    return (
      <>
        <div className="flex flex-row items-center">
          <Link to="/template">
            <i className="pi pi-home"></i>
          </Link>
          <i className="pi pi-angle-right mx-1"></i>
          <p>
            Template Name:
            <span className="font-bold px-1">{templateName}</span>
          </p>
          <p className="px-3">
            Template Description:
            <span className="font-bold px-1">{templateDesc}</span>
          </p>
        </div>
      </>
    );
  };

  const showResponseModal = (row: IAddQuestion) => {
    setUserDialog(true);
    setDialogTitle("Add Possible Response");
    setEditObj(row);
    setEditResObj({});
    setResponseType(1);
  };

  const editResponseModal = (row: IAddQuestion, resObj: any) => {
    setUserDialog(true);
    setDialogTitle("Edit Possible Response");
    setEditObj(row);
    setEditResObj(resObj);
    setResponseType(0);
  };

  const hideDialog = () => {
    setUserDialog(false);
  };

  return (
    <>
      <div className="flex flex-col w-full p-4">
        <div className="p-4 bg-white border-gray-200 border rounded my-4">
          {renderBreadCrum()}
        </div>
        <DataTable
          className="shadow-md"
          scrollable
          scrollHeight="400px"
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
      <ConfirmDialog />
      <Dialog
        visible={userDialog}
        style={{ width: "450px" }}
        header={dialogTitle}
        modal
        onHide={hideDialog}
      >
        <TemplateReponseModal
          hideDialog={hideDialog}
          editObj={editObj}
          editResObj={editResObj}
          responseType={responseType}
          triggerDataReFetch={triggerDataReFetch}
        />
      </Dialog>
    </>
  );
};

export default TemplateDetails;
