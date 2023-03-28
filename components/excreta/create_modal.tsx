import { useState } from "react";
import Button from "../common/button";
import Modal from "../common/modal";
import TextField from "../common/text_field";
import ToggleButton from "../common/toggle_button";

interface Props {
  onClose: () => void;
  onSave: (amount: number, type: string) => void;
}

const ExcretaCreateModal: React.FC<Props> = ({ onClose, onSave }: any) => {
  const typesData = [
    { label: "Urina", value: "urine" },
    { label: "Fezes", value: "feces" },
  ];

  const [typeSelected, setType] = useState("urine");
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
            onClick={() => onSave(amount, typeSelected)}
          >
            Adicionar
          </Button>
        </div>
      }
    >
      <ToggleButton
        title="Tipo"
        defaultValue="urine"
        onToggle={(value: string) => {
          console.log(value);
          setType(value);
        }}
        options={typesData}
      >
        {" "}
      </ToggleButton>

      <div className="mt-3">
        <TextField
          label="Quantidade"
          type="number"
          value={amount.toString()}
          onChanged={(value: string) => {
            console.log(value);
            setAmount(parseInt(value));
          }}
        ></TextField>
      </div>
    </Modal>
  );
};

export default ExcretaCreateModal;
