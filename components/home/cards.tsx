
interface Props {
    title: string;
    emoji: string;
  }

export const CardSelect: React.FC<Props> = ({
    title,
    emoji,
  }) => {
    return <div className="p-4 border rounded-2xl h-[138px]">
        <span className="text-4xl">{emoji}</span>
        <h2 className="text-md-2xl text-lg">{title}</h2>
    </div>
  }
