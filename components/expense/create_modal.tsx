import moment from "moment";
import { useState } from "react";
import Button from "../common/button";
import Modal from "../common/modal";
import Select from "../common/select";
import TextField from "../common/text_field";

interface Props {
  onClose: () => void;
  onSave: (value: number, type: string, date: string) => void;
  typesData: Array<any>;
  isLoading: boolean;
}

const ExpensesCreateModal: React.FC<Props> = ({
  onClose,
  onSave,
  isLoading = false,
  typesData,
}: any) => {
  const [typeSelected, setType] = useState("Energia");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD HH:mm"));

  return (
    <Modal
      title="Cadastrar"
      close={onClose}
      footer={
        <div className="w-full flex justify-between border-t-zinc-50">
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            color="green"
            loading={isLoading}
            disabled={isLoading}
            onClick={() => onSave(amount, typeSelected, date)}
          >
            Adicionar
          </Button>
        </div>
      }
    >
      <Select
        title="Tipo"
        options={typesData}
        onSelect={(value: string) => setType(value)}
      ></Select>

      <div className="mt-3">
        <TextField
          label="Valor"
          type="number"
          value={amount.toString()}
          onChanged={(value: string) => {
            setAmount(Number.parseFloat(value));
          }}
        ></TextField>
      </div>
      <div className="mt-3">
        <TextField
          label="Data"
          type="datetime-local"
          value={date}
          onChanged={(value: string) => {
            setDate(value);
          }}
        ></TextField>
      </div>
    </Modal>
  );
};

export default ExpensesCreateModal;
