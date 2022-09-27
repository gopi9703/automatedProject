import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { setToaster } from "../../../Utils/toastStore";
import Loader from "../../../Utils/Loader";
import { useState } from "react";
import RoleService from "../../../services/externalRoles";
import { IExternalSystemRoles } from "../../../types/AdministrationTypes";

const RoleForm = ({ ...props }) => {
  const { editObj, hideDialog, triggerDataReFetch, formType } = props;

  const [formLoader, setFormLoader] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    showPassword: Yup.boolean(),
    name: Yup.string()
      .max(50, "maximum allowed 50 characters")
      .required("Name is required"),
    code: Yup.string()
      .max(50, "maximum allowed 50 characters")
      .required("Code is required"),
    description: Yup.string()
      .max(200, "maximum allowed 50 characters")
      .required("Description is required"),
    externalSystemId: Yup.string().required("System ID is required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  };
  const { register, handleSubmit, formState } = useForm<IExternalSystemRoles>(
    formOptions as object
  );
  const { errors } = formState;

  const onSubmit = (data: any) => {
    setFormLoader(true);
    if (formType === 1) {
      RoleService.createRoles({
        code: data.code,
        name: data.name,
        description: data.description,
        externalSystemId: parseInt(data.externalSystemId),
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
    } else {
      RoleService.updateRoles(editObj.id, {
        code: data.code,
        name: data.name,
        description: data.description,
        externalSystemId: parseInt(data.externalSystemId),
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
          <label className="mb-2">Name</label>
          <input
            type="text"
            className="common-input"
            maxLength={50}
            placeholder="Enter User name"
            {...register("name")}
            defaultValue={editObj?.name}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>
        <div className="my-4 flex flex-col">
          <label className="mb-2">Code</label>
          <input
            type="text"
            className="common-input"
            maxLength={50}
            placeholder="Enter Code"
            {...register("code")}
            defaultValue={editObj?.code}
          />
          <div className="invalid-feedback">{errors.code?.message}</div>
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
          <label className="mb-2">External System ID</label>
          <input
            type="text"
            className="common-input"
            placeholder="Enter external System Id"
            {...register("externalSystemId")}
            defaultValue={editObj?.externalSystem?.id}
          />
          <div className="invalid-feedback">
            {errors.externalSystemId?.message}
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

export default RoleForm;
