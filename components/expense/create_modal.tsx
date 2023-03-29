import { useState } from "react";
import Button from "../common/button";
import Modal from "../common/modal";
import Select from "../common/select";
import TextField from "../common/text_field";

interface Props {
  onClose: () => void;
  onSave: (value: number, type: string) => void;
  isLoading: boolean;
}

const ExpensesCreateModal: React.FC<Props> = ({
  onClose,
  onSave,
  isLoading = false,
}: any) => {
  const typesData = [
    { label: "Energia", value: "Energia" },
    { label: "Celular", value: "Celular" },
    { label: "Água", value: "Água" },
    { label: "IPTU", value: "IPTU" },
    { label: "Gás", value: "Gás" },
    { label: "Transporte", value: "Transporte" },
    { label: "Outros", value: "Outros" },

    
  ];

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
            setAmount(parseInt(value));
          }}
        ></TextField>
      </div>
    </Modal>
  );
};

export default ExpensesCreateModal;
