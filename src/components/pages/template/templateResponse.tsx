import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import ResponseService from "../../services/response";
import Loader from "../../Utils/Loader";
import TemplateService from "../../services/template";
import { setToaster } from "../../Utils/toastStore";

const TemplateReponseModal = ({ ...props }) => {
  const { hideDialog, editObj, triggerDataReFetch } = props;

  const [formLoader, setFormLoader] = useState<boolean>(false);
  const [possibleResponse, setPossibleResponse] = useState<string[]>([]);

  useEffect(() => {
    ResponseService.getAll()
      .then((response: any) => {
        console.log(response.data);
        let QuestionTypeArray: any = [];
        response.data.forEach((element: { text: string; id: string }) => {
          QuestionTypeArray.push({
            label: element.text,
            value: element.id,
          });
        });
        setPossibleResponse(QuestionTypeArray);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, []);

  const validationSchema = Yup.object().shape({
    displayOrder: Yup.number().required("Display Order is required"),
    possibleResponseId: Yup.object()
      .required("Possible Response is required")
      .nullable(),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  };
  const { register, handleSubmit, formState, control } = useForm(
    formOptions as object
  );
  const { errors } = formState;

  const onSubmit = (data: any) => {
    setFormLoader(true);
    TemplateService.createPossibleResponse(editObj.id, {
      possibleResponseId: data.possibleResponseId.value,
      displayOrder: data.displayOrder,
    })
      .then((response: any) => {
        setToaster({
          severity: "success",
          summary: "Success Message",
          detail: `Possible Responses added for ${editObj.id}`,
        });
        hideDialog();
        setFormLoader(false);
        triggerDataReFetch();
      })
      .catch((e: Error) => {
        setToaster({
          severity: "error",
          summary: "Error Message",
          detail: `Something went wrong, please try again`,
        });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2 flex flex-col">
          <label className="mb-2">Display Order</label>
          <input
            {...register("displayOrder")}
            type="number"
            className="common-input"
            maxLength={50}
            placeholder="Enter Display Order"
            //defaultValue={editObj?.text}
          />
          <div className="invalid-feedback">
            {JSON.stringify(errors?.displayOrder?.message)}
          </div>
        </div>

        <div className="my-4 flex flex-col">
          <label className="mb-2">Possible Response</label>
          <Controller
            name="possibleResponseId"
            control={control}
            //defaultValue={defaultQuestion[0]}
            render={({ field }) => (
              <Select
                {...field}
                options={possibleResponse}
                placeholder="Select Question Type"
                menuPosition={"fixed"}
                styles={{
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                }}
              />
            )}
          />
          <div className="invalid-feedback">
            {JSON.stringify(errors.possibleResponseId?.message)}
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

export default TemplateReponseModal;
