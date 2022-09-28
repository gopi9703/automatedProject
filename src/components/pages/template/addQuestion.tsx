import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";
import QuestionServices from "../../services/question";
import { Checkbox } from "primereact/checkbox";
import ResponseService from "../../services/response";

const AddQuestion: React.FC = () => {
  const [questionsList, setQuestionsList] = useState<string[]>([]);
  const [possibleResponse, setPossibleResponse] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedResValue, setSelectedResValue] = useState(null);
  const [displayOrder, setDisplayOrder] = useState<any>();
  const [response, setResponse] = useState<boolean>(false);
  const [itemQuestion, setItemQuestion] = useState<boolean>(false);

  useEffect(() => {
    QuestionServices.getAll()
      .then((response: any) => {
        console.log(response.data);
        let QuestionArray: any = [];
        response.data.forEach((element: { text: string; id: string }) => {
          QuestionArray.push({
            name: element.text,
            code: element.id,
          });
        });
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
    setSelectedValue(e.value);
  };

  const onhandleResponseChange = (e: any) => {
    setSelectedResValue(e.value);
  };

  return (
    <>
      <div className="flex flex-col w-full p-4">
        <Card>
          <div className="flex flex-col ">
            <div className="flex flex-col">
              <label className="py-2">Select Question</label>
              <Dropdown
                value={selectedValue}
                options={questionsList}
                onChange={onhandleChange}
                optionLabel="name"
                placeholder="Select Question"
                dataKey="code"
                className="w-56"
              />
            </div>
            <div className="flex flex-col my-4">
              <label className="py-2">Display Order</label>
              <InputNumber
                mode="decimal"
                className="w-56"
                useGrouping={false}
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.value)}
              />
            </div>
            <div className="field-checkbox my-4">
              <Checkbox
                inputId="isResponse"
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
                checked={itemQuestion}
                onChange={(e) => setItemQuestion(e.checked)}
              />
              <label htmlFor="isItem" className="px-2">
                Is Item Question
              </label>
            </div>
            <div className="flex flex-col">
              <label className="py-2">Possible Response</label>
              <Dropdown
                value={selectedResValue}
                options={possibleResponse}
                onChange={onhandleResponseChange}
                optionLabel="name"
                placeholder="Select Response"
                dataKey="code"
                className="w-56"
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddQuestion;
