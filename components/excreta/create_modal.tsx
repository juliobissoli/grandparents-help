import moment from "moment";
import { useState } from "react";
import Button from "../common/button";
import Modal from "../common/modal";
import TextField from "../common/text_field";
import ToggleButton from "../common/toggle_button";

interface Props {
  onClose: () => void;
  onSave: (amount: number, type: string, date: string) => void;
  isLoading: boolean;
}

const ExcretaCreateModal: React.FC<Props> = ({ onClose, onSave, isLoading = false }: any) => {
  const typesData = [
    { label: "Urina", value: "urine" },
    { label: "Fezes", value: "feces" },
  ];

  const [typeSelected, setType] = useState("urine");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD HH:mm'));

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
            disabled = {isLoading}
            onClick={() => onSave(amount, typeSelected, date)}
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
      />
      

      <div className="mt-3">
        <TextField
          label="Quantidade em ml"
          type="number"
          value={amount.toString()}

          onChanged={(value: string) => {
            setAmount(parseInt(value));
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

export default ExcretaCreateModal;
