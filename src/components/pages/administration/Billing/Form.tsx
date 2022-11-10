import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { setToaster } from "../../../Utils/toastStore";
import Loader from "../../../Utils/Loader";
import { useState } from "react";
import { IBilling } from "../../../types/AdministrationTypes";
import BillingCodeService from "../../../services/billing.service";

const BillingCodeForm = ({ ...props }) => {
  const { editObj, hideDialog, triggerDataReFetch, formType } = props;

  const [formLoader, setFormLoader] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, "maximum allowed 50 characters")
      .required("Name is required"),
    code: Yup.string()
      .max(50, "maximum allowed 50 characters")
      .required("Code is required"),
    description: Yup.string()
      .max(200, "maximum allowed 50 characters")
      .required("Description is required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  };
  const { register, handleSubmit, formState } = useForm<IBilling>(
    formOptions as object
  );
  const { errors } = formState;

  const onSubmit = (data: any) => {
    setFormLoader(true);
    if (formType === 1) {
      BillingCodeService.createBillingCode(data).then(
        (response: any) => {
          setFormLoader(false);
          setToaster({
            severity: "success",
            summary: "Success Message",
            detail: "Billing Code added successfully",
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
      BillingCodeService.updateBillingCode(editObj.id, data).then(
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

export default BillingCodeForm;
