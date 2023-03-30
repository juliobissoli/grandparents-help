import { useState } from "react";
import Button from "../common/button";
import Modal from "../common/modal";
import Select  from "../common/select";
import TextField from "../common/text_field";

interface Props {
  onClose: () => void;
  onSave: (value: number, type: string) => void;
  typesData: Array<any>
  isLoading: boolean;
}

const ExpensesCreateModal: React.FC<Props> = ({
  onClose,
  onSave,
  isLoading = false,
  typesData
}: any) => {


  const [typeSelected, setType] = useState("Energia");
  const [amount, setAmount] = useState(0);

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
            onClick={() => onSave(amount, typeSelected)}
          >
            Adicionar
          </Button>
        </div>
      }
    >
      <Select
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
    </Modal>
  );
};

export default ExpensesCreateModal;
