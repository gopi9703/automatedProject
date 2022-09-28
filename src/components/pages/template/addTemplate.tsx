import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { useState } from "react";
import { setToaster } from "../../Utils/toastStore";
import Loader from "../../Utils/Loader";
import { useNavigate } from "react-router-dom";
import { ITemplate } from "../../types/TemplateTypes";
import TemplateService from "../../services/template";

const AddTemplate = ({ ...props }) => {
  const { hideDialog } = props;
  let navigate = useNavigate();
  const [formLoader, setFormLoader] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, "maximum allowed 50 characters")
      .required("Template Name is required"),
    externalId: Yup.string()
      .max(50, "maximum allowed 50 characters")
      .required("External ID is required"),
    description: Yup.string()
      .max(200, "maximum allowed 50 characters")
      .required("Description is required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  };
  const { register, handleSubmit, formState } = useForm<ITemplate>(
    formOptions as object
  );
  const { errors } = formState;

  const onSubmit = (data: any) => {
    setFormLoader(true);

    TemplateService.createTemplate(data).then(
      (response: any) => {
        setFormLoader(false);
        navigate(`/template/${response.data.id}`);
        setToaster({
          severity: "success",
          summary: "Success Message",
          detail: "Template added successfully",
        });
        hideDialog();
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
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2 flex flex-col">
          <label className="mb-2">Name</label>
          <input
            type="text"
            className="common-input"
            maxLength={50}
            placeholder="Enter Template Name"
            {...register("name")}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>
        <div className="my-4 flex flex-col">
          <label className="mb-2">Description</label>
          <input
            type="text"
            className="common-input"
            maxLength={50}
            placeholder="Enter Description"
            {...register("description")}
          />
          <div className="invalid-feedback">{errors.description?.message}</div>
        </div>
        <div className="my-4 flex flex-col">
          <label className="mb-2">Extenal Id</label>
          <input
            type="text"
            className="common-input"
            maxLength={50}
            placeholder="Enter Code"
            {...register("externalId")}
          />
          <div className="invalid-feedback">{errors.externalId?.message}</div>
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

export default AddTemplate;
