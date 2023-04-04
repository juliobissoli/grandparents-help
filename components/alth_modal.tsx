import moment from "moment";
import { useState } from "react";
import Button from "./common/button";
import Modal from "./common/modal";
import TextField from "./common/text_field";

interface Props {
  onSave: (name: string) => void;

}

const AuthModal: React.FC<Props> = ({
  onSave,

}: any) => {
  const [name, setName] = useState('');

  return (
    <Modal
      title="Cadastrar"
      close={() => {}}
      footer={
        <div className="w-full flex justify-between border-t-zinc-50">
          {/* <Button onClick={onClose}>Cancelar</Button> */}
          <Button
            color="green"
            onClick={() => onSave(name)}
          >
            Adicionar
          </Button>
        </div>
      }
    >

      <div className="mt-3">
        <TextField
          label="Qual seu nome?"
          type="text"
          value={name}
          onChanged={(value: string) => {
            setName(value);
          }}
        ></TextField>
      </div>
  
    </Modal>
  );
};

export default AuthModal;
