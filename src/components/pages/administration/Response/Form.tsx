import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { setToaster } from "../../../Utils/toastStore";
import Loader from "../../../Utils/Loader";
import { useState } from "react";
import { IPossibleResponse } from "../../../types/AdministrationTypes";
import ResponseService from "../../../services/response";

const ResponseForm = ({ ...props }) => {
  const { editObj, hideDialog, triggerDataReFetch, formType } = props;

  const [formLoader, setFormLoader] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    text: Yup.string()
      .max(50, "maximum allowed 50 characters")
      .required("Text is required"),
    description: Yup.string()
      .max(200, "maximum allowed 50 characters")
      .required("Description is required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  };
  const { register, handleSubmit, formState } = useForm<IPossibleResponse>(
    formOptions as object
  );
  const { errors } = formState;

  const onSubmit = (data: any) => {
    setFormLoader(true);
    if (formType === 1) {
      ResponseService.createResponse(data).then(
        (response: any) => {
          setFormLoader(false);
          setToaster({
            severity: "success",
            summary: "Success Message",
            detail: "Response added successfully",
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
      ResponseService.updateResponse(editObj.id, data).then(
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
            placeholder="Enter Text"
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

export default ResponseForm;
