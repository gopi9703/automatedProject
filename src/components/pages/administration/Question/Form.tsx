import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { setToaster } from "../../../Utils/toastStore";
import Loader from "../../../Utils/Loader";
import { useState } from "react";
import { IQuestion } from "../../../types/AdministrationTypes";
import QuestionServices from "../../../services/question";

const QuestionForm = ({ ...props }) => {
  const { editObj, hideDialog, triggerDataReFetch, formType } = props;

  const [formLoader, setFormLoader] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    text: Yup.string()
      .max(50, "maximum allowed 50 characters")
      .required("Text is required"),
    description: Yup.string()
      .max(50, "maximum allowed 200 characters")
      .required("Description is required"),
    externalId: Yup.string()
      .max(20, "maximum allowed 20 characters")
      .required("External ID is required"),
    questionTypeId: Yup.string()
      .max(5, "maximum allowed 5 characters")
      .required("Question Type ID is required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  };
  const { register, handleSubmit, formState } = useForm<IQuestion>(
    formOptions as object
  );
  const { errors } = formState;

  const onSubmit = (data: any) => {
    setFormLoader(true);
    if (formType === 1) {
      QuestionServices.createQuestion({
        text: data.text,
        description: data.description,
        externalId: data.externalId,
        questionTypeId: parseInt(data.questionTypeId),
      }).then(
        (response: any) => {
          setFormLoader(false);
          setToaster({
            severity: "success",
            summary: "Success Message",
            detail: "Question added successfully",
          });
          hideDialog();
          triggerDataReFetch();
        },
        (error) => {
          setFormLoader(false);

          setToaster({
            severity: "error",
            summary: "Error Message",
            detail: error.response.data.message,
          });
        }
      );
    } else {
      QuestionServices.updateQuestion(editObj.id, {
        text: data.text,
        description: data.description,
        externalId: data.externalId,
        questionTypeId: parseInt(data.questionTypeId),
      }).then(
        (response: any) => {
          setFormLoader(false);
          setToaster({
            severity: "success",
            summary: "Success Message",
            detail: response.data.message,
          });
          hideDialog();
          triggerDataReFetch();
        },
        (error) => {
          setFormLoader(false);

          setToaster({
            severity: "error",
            summary: "Error Message",
            detail: error.response.data.message,
          });
        }
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2 flex flex-col">
          <label className="mb-2">Text</label>
          <input
            type="text"
            className="common-input"
            maxLength={50}
            placeholder="Enter User name"
            {...register("text")}
            defaultValue={editObj?.text}
          />
          <div className="invalid-feedback">{errors.text?.message}</div>
        </div>
        <div className="my-4 flex flex-col">
          <label className="mb-2">Description</label>
          <input
            type="text"
            className="common-input"
            maxLength={50}
            placeholder="Enter Description"
            {...register("description")}
            defaultValue={editObj?.description}
          />
          <div className="invalid-feedback">{errors.description?.message}</div>
        </div>
        <div className="my-4 flex flex-col">
          <label className="mb-2">External ID</label>
          <input
            type="text"
            className="common-input"
            maxLength={50}
            placeholder="Enter external ID"
            {...register("externalId")}
            defaultValue={editObj?.externalId}
          />
          {/* <div className="invalid-feedback">{errors.externalId.message}</div> */}
        </div>
        <div className="my-4 flex flex-col">
          <label className="mb-2">question Type Id</label>
          <input
            type="text"
            className="common-input"
            maxLength={5}
            placeholder="Enter Question Type ID"
            {...register("questionTypeId")}
            defaultValue={editObj?.questionType?.id}
          />
          <div className="invalid-feedback">
            {errors.questionTypeId?.message}
          </div>
        </div>
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
            onClick={hideDialog}
            label="Cancel"
            type="button"
            className="p-button-sm p-button-outlined p-button-danger"
            icon="pi pi-times"
            iconPos="left"
          />
        </div>
      </form>
      {formLoader ? <Loader /> : null}
    </>
  );
};

export default QuestionForm;
