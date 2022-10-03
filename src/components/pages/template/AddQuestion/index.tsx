import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionServices from "../../../services/question";
import { Checkbox } from "primereact/checkbox";
import ResponseService from "../../../services/response";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import TemplateService from "../../../services/template";
import Loader from "../../../Utils/Loader";
import { setToaster } from "../../../Utils/toastStore";
import { useLocation } from "react-router-dom";
import { IDropDown } from "../../../types/commonTypes";
import PossibleResponseTable from "./ResponseTable";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { IAddQuestion } from "../../../types/TemplateTypes";

const AddQuestion: React.FC = () => {
  const [formLoader, setFormLoader] = useState<boolean>(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [possibleResponse, setPossibleResponse] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<IDropDown>();
  const [selectedResValue, setSelectedResValue] = useState<IDropDown>();
  const [displayOrder, setDisplayOrder] = useState<any>();
  const [responseOrder, setResponseOrder] = useState<any>();
  const [response, setResponse] = useState<boolean>(false);
  const [itemQuestion, setItemQuestion] = useState<boolean>(false);
  const [enableResponse, setEnableResponse] = useState<boolean>(false);
  const [responseData, setResonseData] = useState<any[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    questionId: Yup.string().required("Question is required"),
    displayOrder: Yup.string().required("Display Order is required"),
    isItemQuestion: Yup.boolean(),
    isResponseRequired: Yup.boolean(),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "all",
  };
  const { register, handleSubmit, formState } = useForm<IAddQuestion>(
    formOptions as object
  );
  const { errors } = formState;

  useEffect(() => {
    QuestionServices.getAll()
      .then((response: any) => {
        console.log(response.data);
        let QuestionArray: any = [];
        response.data.forEach(
          (element: { text: string; id: string; questionType: any }) => {
            QuestionArray.push({
              name: element.text,
              code: element.id,
              type: element.questionType.hasPossibleResponse,
            });
          }
        );
        console.log(QuestionArray);
        setQuestionsList(QuestionArray);
      })
      .catch((e: Error) => {
        console.log(e);
      });

    ResponseService.getAll()
      .then((response: any) => {
        console.log(response.data);
        let QuestionTypeArray: any = [];
        response.data.forEach((element: { text: string; id: string }) => {
          QuestionTypeArray.push({
            name: element.text,
            code: element.id,
          });
        });
        setPossibleResponse(QuestionTypeArray);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, []);

  const onhandleChange = (e: any) => {
    console.log(e);
    setSelectedValue(e.value);
    e.value.type === true ? setEnableResponse(true) : setEnableResponse(false);
  };

  const onhandleResponseChange = (e: any) => {
    setSelectedResValue(e.value);
  };

  const onSubmit = (data: any) => {
    setFormLoader(true);
    TemplateService.createQuestion(
      location.state.id,
      responseData.length > 0
        ? {
            questionId: selectedValue?.code,
            displayOrder: displayOrder,
            isResponseRequired: response,
            isItemQuestion: itemQuestion,
            possibleResponses: responseData,
          }
        : {
            questionId: selectedValue?.code,
            displayOrder: displayOrder,
            isResponseRequired: response,
            isItemQuestion: itemQuestion,
          }
    )
      .then((response: any) => {
        setFormLoader(false);
        navigate(-1);
        setToaster({
          severity: "success",
          summary: "Success Message",
          detail: "Question added successfully",
        });
      })
      .catch((e: Error) => {
        console.log(e);
        setFormLoader(false);
        setToaster({
          severity: "error",
          summary: "Error Message",
          detail: "Something went wrong, please try again",
        });
      });
  };

  const updateResponse = () => {
    const item = {
      possibleResponseId: selectedResValue?.code,
      displayOrder: responseOrder,
    };
    if (selectedResValue?.code === undefined) {
      setToaster({
        severity: "error",
        summary: "Error Message",
        detail: "Please select possible response",
      });
    } else if (responseOrder === undefined) {
      setToaster({
        severity: "error",
        summary: "Error Message",
        detail: "Please enter display order",
      });
    } else {
      setResonseData([...responseData, item]);
      setResponseOrder("");
      setSelectedResValue({});
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="flex flex-col w-full p-4">
        <div className="bg-white py-6 px-8 shadow-md rounded">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col ">
              <div className="flex flex-col">
                <label className="py-2">Select Question</label>
                <Dropdown
                  {...register("questionId")}
                  className="w-60"
                  placeholder="Select a Question"
                  options={questionsList}
                  value={selectedValue}
                  onChange={onhandleChange}
                  optionLabel="name"
                  dataKey="code"
                />
                <div className="invalid-feedback">
                  {JSON.stringify(errors.questionId?.message)}
                </div>
              </div>
              <div className="flex flex-col my-4">
                <label className="py-2">Display Order</label>
                <InputText
                  {...register("displayOrder")}
                  className="w-56"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(e.target.value)}
                />
                <div className="invalid-feedback">
                  {errors.displayOrder?.message}
                </div>
              </div>
              <div className="field-checkbox my-4">
                <Checkbox
                  inputId="isResponse"
                  {...register("isResponseRequired")}
                  checked={response}
                  onChange={(e) => setResponse(e.checked)}
                />
                <label htmlFor="isResponse" className="px-2">
                  Is Response required
                </label>
              </div>
              <div className="field-checkbox my-4">
                <Checkbox
                  inputId="isItem"
                  {...register("isItemQuestion")}
                  checked={itemQuestion}
                  onChange={(e) => setItemQuestion(e.checked)}
                />
                <label htmlFor="isItem" className="px-2">
                  Is Item Question
                </label>
              </div>
              {enableResponse ? (
                <div className="w-full">
                  <h3 className="border-b border-gray-200 text-xl font-bold py-3">
                    Add Possible Response
                  </h3>
                  <div className="flex flex-row items-center mt-6">
                    <div className="flex flex-col">
                      <label className="py-1">Add Response</label>
                      <Dropdown
                        value={selectedResValue}
                        options={possibleResponse}
                        onChange={onhandleResponseChange}
                        optionLabel="name"
                        dataKey="code"
                        placeholder="Select Response"
                        className="w-60"
                      />
                    </div>
                    <div className="flex flex-col px-5">
                      <label className="py-1">Display Order</label>
                      <InputNumber
                        className="w-56"
                        mode="decimal"
                        useGrouping={false}
                        value={responseOrder}
                        onChange={(e) => setResponseOrder(e.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="py-1">&nbsp;</label>
                      <Button
                        onClick={updateResponse}
                        type="button"
                        label="Add Response"
                        icon="pi pi-plus"
                        className="p-button-success  p-button-outlined mr-2"
                      />
                    </div>
                  </div>
                  {responseData && responseData.length > 0 ? (
                    <PossibleResponseTable responseData={responseData} />
                  ) : null}
                </div>
              ) : null}

              <div className="flex flex-row-reverse mt-6">
                <Button
                  type="submit"
                  label="Submit"
                  className="p-button-sm p-button-outlined p-button-info"
                  icon="pi pi-check"
                  iconPos="left"
                />
                <div className="mx-3"></div>
                <Button
                  label="Cancel"
                  onClick={goBack}
                  type="button"
                  className="p-button-sm p-button-outlined p-button-danger"
                  icon="pi pi-times"
                  iconPos="left"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {formLoader ? <Loader /> : null}
    </>
  );
};

export default AddQuestion;
